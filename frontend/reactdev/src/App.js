//C:\react-js\myreactdev\src\App.js
import React, { } from 'react';
import './App.css';
   
import {BrowserRouter, Routes, Route} from 'react-router-dom';
   
import ListProductPage from "./pages/ListProductPage";
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
 
function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center">React-JS and Python Flask CRUD Create, Read, Update and Delete MySql-Database</h1>
    
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ListProductPage />} />
            <Route path="/addnewproduct" element={<CreateProduct />} />
            <Route path="product/:id/edit" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
    
export default App;