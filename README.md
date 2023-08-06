# CartRabbit-Bike-Service

## Description

This is a web application for a bike service center that allows customers to view available services, book services, and check their booking history. It also provides an admin panel for managing services and bookings.

## Features

- View available services
- Book services
- View booking history
- Admin panel for managing services and bookings

## Technologies Used

- Frontend: React.js
- Backend: Node.js (Express.js)
- Database: MongoDB
- State Management: React Context API (or Redux)
- Styling: CSS (you can use CSS-in-JS libraries like styled-components or CSS frameworks like Bootstrap)
- Authentication: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
2. Install dependencies for both frontend and backend:
3. Create a `.env` file in the `backend` directory and set your environment variables (e.g., MongoDB connection string, JWT secret, etc.):
4. Start the development server for both frontend and backend:


## Usage

- Open your browser and go to `http://localhost:3000` to access the frontend.
- To access the admin panel, go to `http://localhost:3000/admin` and login with admin credentials.

## API Endpoints

- `GET /services`: Get a list of available services.
- `POST /customer/login`: Customer login endpoint.
- `POST /customer/bookingservice`: Customer booking endpoint.
- `GET /customer/bookings/:customerId`: Get booking history for a specific customer.
- `POST /admin/login`: Admin login endpoint.
- `POST /admin/addservice`: Add a new service (Admin only).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Pictures of My Task

# Home-page
![Bike_Service_Home_page](https://github.com/Praveenraj-v/CartRabbit-Bike-Service/assets/121415891/4266927a-55fa-4dda-ad77-cc6ebda9f738)
# User-login 
![Bike_service_User_login](https://github.com/Praveenraj-v/CartRabbit-Bike-Service/assets/121415891/361287fb-4f06-4e1b-b6e4-c154756f091d)
# User-Landing
![Bike_Service_User_Landing](https://github.com/Praveenraj-v/CartRabbit-Bike-Service/assets/121415891/6079a6fa-4085-41bd-acb7-2850ef37bf60)
# Admin-Landing
![Bike_Service_Admin_Landing](https://github.com/Praveenraj-v/CartRabbit-Bike-Service/assets/121415891/80868a68-7b06-4a0e-9fe2-c376b231b25b)
# Signup-Page
![Bike_Service_Signup](https://github.com/Praveenraj-v/CartRabbit-Bike-Service/assets/121415891/73ad64d8-b991-422f-8d91-14077e882101)
