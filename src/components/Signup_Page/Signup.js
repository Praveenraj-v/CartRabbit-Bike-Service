import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {

    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        userName: '',
        bikeModelName: '',
        userEmail: '',
        userPhone: '',
        password1: '',
        password2:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Send a POST request to the server with the signup data
        axios.post('http://localhost:3001/addUser', formData)
            .then(response => {
                // Handle successful signup response if needed
                alert("User Created successfully");
                console.log(response.data);
                navigate("/");
            })
            .catch(error => {
                alert("Password Doesn't Match");
                console.error(error);
            });
    };

    return (
        <>
            <div className="Signup-main container-fluid">
                <div className="Signup-form p-3 rounded-4">
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3>Create an Account</h3>
                        </div>
                        <hr/>
                        <div class="row g-3 mt-1">
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="text" class="form-control" name="userName" value={formData.userName} onChange={handleChange} placeholder="User name" aria-label="User name" />
                            </div>
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="text" class="form-control" name="bikeModelName" value={formData.bikeModelName} onChange={handleChange} placeholder="Bike Model name" aria-label="Bike Model name" />
                            </div>
                        </div>
                        <div class="row g-3 mt-1">
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="email" class="form-control" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Email Address" aria-label="Email Address"/>
                            </div>
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="text" class="form-control" name="userPhone" value={formData.userPhone} onChange={handleChange} placeholder="Phone Number" aria-label="Phone Number"/>
                            </div>
                        </div>
                        <div class="row g-3 mt-1">
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="password" class="form-control" name="password1" value={formData.password1} onChange={handleChange} placeholder="New Password" aria-label="New Password" />
                            </div>
                            <div class="col-sm-10 col-md-6 col-xl-6">
                                <input type="password" class="form-control" name="password2" value={formData.password2} onChange={handleChange} placeholder="Re-Type Password" aria-label="Re-Type Password" />
                            </div>
                        </div>
                        <div className="p-2 d-flex justify-content-center mt-2">
                            <button className="btn btn-primary" type="submit">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}