import React, { useState } from "react";
import axios from 'axios'; 
import { Footer, Navbar } from "../components";
import { Link} from "react-router-dom";


const Login = () => {
  if (!window.localStorage.getItem("loggedIn")) {
    window.localStorage.setItem("loggedIn", JSON.stringify(false));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   
  const api='http://localhost:3001';
  const handleLogin = async (e) => {
    e.preventDefault();

    let token; // Declare the variable
    let role; // Declare the variable
  
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
  
    try {
      console.log("Sending login request...");
  
      const response = await axios.post(`${api}/users/login`, {
        email,
        password,
      });
  
      console.log("Received response:", response);
  
      if (response.data) {
        console.log(response.data.token);
        console.log(response.data.user.role);
        token =response.data.token;
        role=response.data.user.role;
         //console.log(response.data.token);
        // console.log(response.data.user.role)
      
         window.localStorage.setItem("token", token);
         window.localStorage.setItem("role", role);
         window.localStorage.setItem("loggedIn", true);
         if (role==='admin'){
          window.localStorage.setItem('admin',true);
          window.location.href = "/dashboard";
         }else {
          window.localStorage.removeItem('isAdmin');
          window.location.href = "/";
        }

       
       // window.location.href='/';
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login request:", error);
      setError("An error occurred, please try again later");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form method="POST" onSubmit={handleLogin}>
              <div className="my-3">
                <label htmlFor="email" className="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="password" className="display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
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

export default Login;
