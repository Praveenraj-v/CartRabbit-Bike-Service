import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerLanding.css'

export const OwnerLandingPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:3001/owner/bookings');
            setBookings(response.data.data);
            console.log(response.data.data);
            console.log(bookings);
        } catch (error) {
            console.log('Error fetching bookings:', error);
        }
    };

    const handleStatusChange = async (bookingId, status) => {
        try {
            console.log(bookingId);
            await axios.put(`http://localhost:3001/owner/bookings/${bookingId}`, { status });
            // After updating the status, fetch the updated bookings
            fetchBookings();
        } catch (error) {
            console.log('Error updating booking status:', error);
        }
    };

    return (
        <>
        <div className='container-fluid ownerlanding d-flex justify-content-center align-items-center'>
            <div className="container text-center bg-white p-2 ">
                <h2>Time To Work</h2>
                {bookings.length === 0 ? (
                    <p>No Work Today.</p>
                ) : (
                    <table className="table table-dark text-start">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Service</th>
                                <th>Booking Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.customer.name}</td>
                                    <td>{booking.service}</td>
                                    <td>{new Date(booking.booking_date).toLocaleString()}</td>
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="ready for delivery">Ready for Delivery</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </>
    );
}