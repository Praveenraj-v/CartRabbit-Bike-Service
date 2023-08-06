import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';


export const AdminLogin = () => {

    const navigate=useNavigate()

    const [adminData, setAdminData] = useState({
        userEmail: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a POST request to the server with the login data
        axios.post('http://localhost:3001/admin/login', adminData)
            .then(response => {
                alert("You have successfully logged in")
                console.log(response.data);
                navigate("/Owner")

            })
            .catch(error => {
                alert("invalid user credential")
                console.error(error);
            });
    };

    return (
        <>
            <div className="Container Login-main">
                <div className="w-50 p-3 Login-form rounded-3">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3>Admin Log In</h3>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="email" className="form-control" name="adminEmail" value={adminData.adminEmail} onChange={handleChange} placeholder="name@example.com" />
                            <label for="adminEmail">Email address</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control" name="password" value={adminData.password} onChange={handleChange} placeholder="Password" />
                            <label for="adminPassword">Password</label>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-success">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}