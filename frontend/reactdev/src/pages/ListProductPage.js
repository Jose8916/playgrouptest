import React, { useEffect, useState } from "react";
import axios from "axios" //npm install axios --save 
import {Link} from 'react-router-dom';
  
export default function ListProductPage(){
  
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
  
    function getProducts() {
        axios.get('http://127.0.0.1:5000/listproducts').then(function(response) {
            console.log(response.data);
            setProducts(response.data);
        });
    }
     
    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:5000/productdelete/${id}`).then(function(response){
            console.log(response.data);
            getProducts();
        });
        alert("Successfully Deleted");
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">
                    <p><Link to="/addnewproduct" className="btn btn-success">Add New User</Link> </p>
                    <h1>List Products</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, key) =>
                                <tr key={key}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.date}</td>
                                    <td>
                                        <Link to={`product/${product.id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                        <button onClick={() => deleteUser(product.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}