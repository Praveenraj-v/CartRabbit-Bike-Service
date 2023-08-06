import React from "react";
import NamebarLogo from 'e:/bikeservice/src/assets/Logos/namebarlogo.png'

export const Namebar = () => {
    return (
        <>
            <nav class="navbar bg-dark position-fixed w-100">
                <div class="container-fluid d-flex justify-content-center">
                    <span class="navbar-brand text-white">
                        <img src={NamebarLogo} alt="Logo" width="30" height="40" class="d-inline-block align-text-center" />
                        VPR MOTOR WORKS
                    </span>
                </div>
                <div className=" d-flex justify-content-center container-fluid">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link bg-dark text-white active" aria-current="page" href="/admin">Admin</a>
                        </li>
                        <li class="nav-item">
                            <a class="bg-dark text-white nav-link active" aria-current="page" href="/Login">Customer</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}