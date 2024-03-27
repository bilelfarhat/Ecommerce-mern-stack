import { Footer, Navbar } from "../components";
import { Link} from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

const AddAdmin = () => {
    const api = "http://localhost:3001";
  

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
    };

    const validatePassword = (value) => {
        if (value.length < 5) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 5 characters long' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !password) {
                setErrors({ general: 'Please fill in all fields' });
                return;
            }

            validateEmail(email);
            validatePassword(password);

            if (Object.values(errors).some((error) => error !== '')) {
                return;
            }

            const response = await axios.post(`${api}/users/adduser`, { name, email, password,role });
          
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            
            setErrors({});
            console.log(response.data.user);
            window.location.href="/listusers";
        } catch (error) {
            console.error(error);
            setErrors({ general: 'Email already exists. Please try again.' });
        }
    };

    const enableButton = () => {
        // Vérifiez tous les champs requis ici
        const isNameValid = name.length >= 5;
        const isEmailValid = validateEmailOnEnableButton(email);
        const isPasswordValid = errors.password === '';
        const isRoleValid = true; // Ajoutez la vérification du champ de rôle si nécessaire
    
        if (isNameValid && isEmailValid && isPasswordValid && isRoleValid) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };
    
    const validateEmailOnEnableButton = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); enableButton(); }}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    onChange={(e) => { setEmail(e.target.value); enableButton(); }}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e) => { setPassword(e.target.value); enableButton(); }}
                                    onBlur={(e) => validatePassword(e.target.value)}
                                />
                            </div>
                          
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit"
                                    onClick={createUser}
                                    disabled={isButtonDisabled || Object.values(errors).some((error) => error !== '')}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddAdmin;
