import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const isloggedin=JSON.parse(window.localStorage.getItem("loggedIn"));
const usertoken=window.localStorage.getItem("token");
const isadmin=window.localStorage.getItem("admin");


if (!window.localStorage.getItem("loggedIn")) {
    window.localStorage.setItem("loggedIn", JSON.stringify(false));
  }
  
  //console.log(usersrole);
  console.log(usertoken);
  console.log(isloggedin);
  
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  


const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Smart Shop</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        {!isadmin && (<>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                       
                        </>)}
                        {isadmin && (<>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/listadmins">List Admins </NavLink>
                        </li>
                      
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/listusers">List Users </NavLink>
                        </li>
                      
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/listproducts">List Products</NavLink>
                        </li>
                      
                    
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/listCategories">List Categories</NavLink>
                        </li>

                            </> )}
                    </ul>
                    <div className="buttons text-center">
                    {isloggedin === false && (<>
                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                        </>)}
                        {!isadmin && (<>
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                        </>)}
                        {isloggedin === true &&(<>
                        <NavLink to="/login" onClick={logOut} className="btn btn-outline-dark m-2"><i className="fa fa-sign-out mr-1" ></i> Log Out</NavLink>
                    </>)}
                   
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar