// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
// import InvoiceDetails from './components/InvoiceDetails'; 
import './App.css';
import InvoiceDetailsWrapper from './components/InvoiceDetailsWrapper'; 

const App = () => {
  return (
    <Router>
      <div>
        <h1 className='title'> Invoice</h1>
        <Routes>
          <Route path="/" element={<InvoiceForm />} />
          <Route path="/invoice-list" element={<InvoiceList />} />
          <Route path="/invoice/:id" element={<InvoiceDetailsWrapper />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
