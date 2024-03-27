import axios from 'axios';
import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import './TableComponent.css';

const AddCategorie = () => {
    const api = "http://localhost:3001";
  

    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const createCategorie = async (e) => {
        e.preventDefault();
        try {
            if (!name) {
                setErrors({ general: 'Please fill in all field' });
                return;
            }

            if (Object.values(errors).some((error) => error !== '')) {
                return;
            }

            const response = await axios.post(`${api}/categories/addcategorie`, { name});
           // console.log(response.data);
            setName("");
            
            
            setErrors({});
            console.log(response.data.categorie);
            window.location.href="/listCategories";
        } catch (error) {
            console.error(error);
            setErrors({ general: 'Email already exists. Please try again.' });
        }
    };

    const enableButton = () => {
        // Vérifiez tous les champs requis ici
        if (name && Object.values(errors).every((error) => error === '')) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Add Categorie</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div className="form my-3">
                                <label htmlFor="Name">Name</label>
                                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Categorie"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); enableButton(); }}
                                />
                            </div>
                          
                           
                            <div className="text-center">
                            <button
                            className="my-2 mx-auto btn btn-dark"
                            type="submit"
                            onClick={createCategorie} 
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

  
  export default AddCategorie;
  
  