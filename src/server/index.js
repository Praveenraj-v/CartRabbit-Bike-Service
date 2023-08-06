const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const app = express();

// Database configuration to connect server
mongoose.connect('mongodb://127.0.0.1:27017/Bike_Service');

app.use(cors());
app.use(bodyParser.json());


// Schema for customer collection
const userSchema = new mongoose.Schema({
    userName: {type:String, required: true},
    bikeModelName: {type:String, required: true},
    userEmail: {type:String, required: true},
    userPhone: {type:String, required: true},
    password1: {type:String, required: true},
    password2: {type:String, required: true},
    bookings: [{
        booking_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Booking_Details', // Reference the "Booking" collection
          required: true,
        },
        service: [String], // Array of service names
        booking_date: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'ready for delivery', 'completed'],
          default: 'pending',
        },
      },]
},
{
    collection: "Customer_Details"
});
// Model creation for Customer Sign Up
const UserModel = mongoose.model("Customer_Details", userSchema);

// API For creating a user profile
app.post("/addUser", async (req, res) => {
    const userData = req.body;
    
    try {
        const { userName,bikeModelName, userEmail,userPhone, password1, password2 } = req.body;

        if (!userName || !bikeModelName || !userEmail ||!userPhone || !password1 || !password2) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the email is from gmail.com
        const isGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userEmail);
        if (!isGmail) {
            return res.status(400).json({ error: 'Email must be from gmail.com' });
        }
        if(userData.password1 !== userData.password2){
            // console.log("Passwords Doesn't match");
            return res.status(401).json({ error: "Passwords Doesn't match" });
        }
        if(userData.password1 === userData.password2){
            const encryptPassword = await bcrypt.hash(userData.password1, 10);
            userData.password1 = encryptPassword;
            
            const encryptPassword2 = await bcrypt.hash(userData.password2, 10);
            userData.password2 = encryptPassword2;
            // Save the user data to MongoDB
            const user = await UserModel.create(userData);
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
});

// Schema for owner collection
const adminSchema = new mongoose.Schema({
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    password: { type: String, required: true },
    adminMobile: { type: String, required: true },
    services: [
        {
          service_name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
},{
    collection: "Owner_Data"
});
// Model creation for Customer Sign Up
const adminModel = mongoose.model("Owner_Data", adminSchema);

// For this you have to create admin collection in mongoDB by manually
// API for Admin/Owner login
app.post('/admin/login', async (req, res) => {
    try {
        const { adminEmail, password } = req.body;

        // Validate request data (you can add more validation if needed)
        if (!adminEmail || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find the user (user) by email
        const admin = await adminModel.findOne({ adminEmail });

        // If user not found, return error
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is correct, return success response
        res.status(200).json({ message: 'User logged in successfully', data: admin });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API for Log In aunthentication. 
app.post('/customer/login', async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        // Validate request data (you can add more validation if needed)
        if (!userEmail || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find the user (customer) by email
        const customer = await UserModel.findOne({ userEmail });

        // If user not found, return error
        if (!customer) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, customer.password1);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Password is correct, return success response
        const responseData = {
            customerId: customer._id,
            userEmail: customer.userEmail
        };
        res.status(200).json({ message: 'User logged in successfully', data: responseData });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
  
// Nodemailer configuration of Admin
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Email provider's name
      auth: {
        user: 'praveenraj5141@gmail.com', // Admin email address
        pass: 'aandtkuhppyahils', // Admin email password
      },
    });

// Function to send the email notification
const sendEmail = async (toEmail, subject, text) => {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'praveenraj5141@gmail.com', // Admin email
            to: toEmail,
            subject: subject,
            text: text,
        });
        console.log('Email sent successfully:', subject);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

  const bookingSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer_Details', required: true },
    service: [{ type: String, required: true }],
    booking_date: { type: Date, required: true },
    status: { type: String, required: true },
    
  });
  
  const BookingModel = mongoose.model('Booking', bookingSchema, 'Booking_Details')

// API to get details from Booking collection
app.get('/owner/bookings', async (req, res) => {
    try {
        // Fetch all bookings from the database
        const bookings = await BookingModel.find().populate('customer_id', 'userName userEmail userPhone').exec();

        // Prepare the data to send to the owner's homepage
        const bookingData = bookings.map((booking) => ({
            customer: {
                name: booking.customer_id.userName,
                email: booking.customer_id.userEmail,
                mobile: booking.customer_id.userPhone,
            },
            _id:booking._id,
            service: booking.service,
            booking_date: booking.booking_date,
            status: booking.status,
        }));

        res.status(200).json({ data: bookingData });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API for admin to update the status of the bike Service
app.put('/owner/bookings/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        // Validate the input
        if (!bookingId || !status) {
            return res.status(400).json({ error: 'Booking ID and status are required' });
        }

        // Check if the provided status is valid (optional)
        const validStatuses = ['ready for delivery', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Find the booking in the database by ID
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Get the customer details from the database
        const customer = await UserModel.findById(booking.customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        console.log('Existing Customer Bookings:', customer.bookings);

        // Update the booking status
        booking.status = status;

        // Save the updated booking in the database
        const updatedBooking = await booking.save();

        console.log('Updated Booking:', updatedBooking);

        // Update the corresponding booking in the customer's bookings array
        if (customer.bookings && Array.isArray(customer.bookings)) {
            const bookingIndex = customer.bookings.findIndex((b) => b.booking_id.toString() === bookingId.toString());
            if (bookingIndex !== -1) {
                customer.bookings[bookingIndex].status = status;
                await customer.save();
                console.log('Updated Customer Bookings:', customer.bookings);
            }
        }

        // Send the email notification if the status is updated to "ready for delivery"
        if (status === 'ready for delivery') {
            // Send the email to the customer's email address
            const emailSubject = "Your Bike is Ready for Delivery";
            const emailText = `Dear ${customer.userName}, \n\nYour bike service is completed and ready for delivery come and pick at our respective shop.If you need anyone to pick you from point Kindly contact us in 9360790855. Thank you for using our services.`;
            await sendEmail(customer.userEmail, emailSubject, emailText);
        }

        res.status(200).json({ message: 'Booking status updated and email has been sent successfully', data: updatedBooking });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/customer/bookingservice', async (req, res) => {
    try {
        const { customer_id, service } = req.body;

        // Get the current date
        const booking_date = new Date();

        // Validate the input
        if (!customer_id || !service) {
            return res.status(400).json({ error: 'Customer ID and service are required' });
        }

        // Check if the customer exists in the database
        const customer = await UserModel.findById(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Create a new booking document
        const newBooking = new BookingModel({
            customer_id,
            service,
            booking_date,
            status: 'pending',
        });

        // Save the new booking to the database
        await newBooking.save();

        // Send email notification to the owner about the new booking
        const ownerEmail = 'praveenraj5141@gmail.com'; // Replace this with the actual owner's email address
        const subject = 'New Booking';
        const message = `New booking details:\nCustomer Name: ${customer.name}\nService: ${service}\nBooking Date: ${booking_date}`;

        await sendEmail(ownerEmail, subject, message);

        // Update the Customer's bookings array with the new booking details
        customer.bookings.push({
            booking_id: newBooking._id,
            service,
            booking_date,
            status: 'pending',
        });

        await customer.save();

        res.status(201).json({ message: 'Booking placed successfully', data: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API to get Services details 
app.get('/services', async (req, res) => {
    try {
      // Find the owner document (assuming you have a single owner for now)
      const owner = await adminModel.findOne();
  
      // Extract the services and owner name from the owner document
      const services = owner ? owner.services : [];
      const ownerName = owner ? owner.adminName : '';
  
      res.json({ ownerName, services });
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// API endpoint to get booking history for a specific user
app.get('/customer/bookings/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        // Validate the input
        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        // Check if the customer exists in the database 
        const customer = await UserModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Get the booking history for the customer
        const bookingHistory = await BookingModel.find({ customer_id: customerId });

        res.status(200).json({ data: bookingHistory });
    } catch (error) {
        console.error('Error fetching booking history:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Assigning port for Server Connection.
const port = 3001;
app.listen(port, () => {
    console.log(`Server is connected is ${port}`);
});
