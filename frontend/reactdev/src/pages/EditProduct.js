import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
export default function EditProduct(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const {id} = useParams();
  
    useEffect(() => {
        getProduct();
    }, []);
  
    function getProduct() {
        axios.get(`http://127.0.0.1:5000/productdetails/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.put(`http://127.0.0.1:5000/productupdate/${id}`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
          
    }
     
    return (
    <div>
        <div className="container h-100">
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1>Edit product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" value={inputs.name} className="form-control" name="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="text" value={inputs.description} className="form-control" name="description" onChange={handleChange} />
                </div>   
                <button type="submit" name="update" className="btn btn-primary">Save</button>
            </form>
            </div>
            <div className="col-2"></div>
        </div>
        </div>
    </div>
  );
}