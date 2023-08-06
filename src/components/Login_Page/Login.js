import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

export const Login = () => {

    const navigate=useNavigate()


    const [formData, setFormData] = useState({
        userEmail: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send a POST request to the server with the login data
        axios.post('http://localhost:3001/customer/login', formData)
            .then(response => {
                alert("You have successfully logged in")
                console.log(response.data);
                navigate(`/Customer/${response.data.data.customerId}`);
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
                            <h3>Customer Log In</h3>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="email" className="form-control" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="name@example.com" />
                            <label for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                            <label for="userPassword">Password</label>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-success">Log In</button>
                        </div>
                        <hr />
                        <div>
                            <p>New Customer, You can <a href="/Signup">Sign up Here,</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}