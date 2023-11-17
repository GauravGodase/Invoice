import React, { useState } from "react";
import * as InvoiceActions from "../actions/InvoiceActions";
import "./InvoiceForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const generateUniqueNumber = () => {
  // Generate a random 4-digit number
  return Math.floor(1000 + Math.random() * 9000);
};

const calculateTotalHours = (startTime, endTime) => {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const timeDifference = end - start;
  const totalHours = timeDifference / (1000 * 60 * 60);
  return Math.round(totalHours * 100) / 100;
};

const InvoiceForm = () => {
  const initialInvoiceState = {
    id: generateUniqueNumber(),
    description: "",
    lineItems: [],
    dueDate: null,
    status: "Half-Paid",
    notes: "",
    paymentMethod: "Cash",
  };

  const [invoice, setInvoice] = useState(initialInvoiceState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleAddLineItem = () => {
    const newLineItem = {
      description: "",
      startTime: "",
      endTime: "",
      rate: "",
      expenses: "",
      materials: "",
      labor: "",
    };
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      lineItems: [...prevInvoice.lineItems, newLineItem],
    }));
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      lineItems: prevInvoice.lineItems.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleRemoveLineItem = (index) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      lineItems: prevInvoice.lineItems.filter((_, i) => i !== index),
    }));
  };

  const handleDueDateChange = (date) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      dueDate: date,
    }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      status: value,
    }));
  };

  const handlePaymentMethodChange = (value) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      paymentMethod: value,
    }));
  };

  const handleNotesChange = (e) => {
    const { value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      notes: value,
    }));
  };

  const handleReset = () => {
    setInvoice(initialInvoiceState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["description", "dueDate", "status", "paymentMethod"];
  const isEmptyField = requiredFields.some((field) => !invoice[field]);
  if (isEmptyField) {
    alert("Please fill in all required fields.");
    return;
  }

    const newInvoice = {
      ...invoice,
      id: generateUniqueNumber(),
    };

    console.log("Form Submitted", newInvoice);

    InvoiceActions.addInvoice(newInvoice);

    const existingInvoices =
      JSON.parse(localStorage.getItem("invoices")) || [];
    const updatedInvoices = [...existingInvoices, newInvoice];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    navigate(`/invoice/${newInvoice.id}`);
  };

  return (
    <div className="invoice-form-container">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="description"
          value={invoice.description}
          onChange={handleInputChange}
          placeholder="Name"
        />

        {/* Line Items Section */}
        <label>Description:</label>
        {invoice.lineItems.map((lineItem, index) => (
          <div key={index}>
            <input
              type="text"
              name="description"
              value={lineItem.description}
              onChange={(e) => handleLineItemChange(index, e)}
              placeholder="Description"
            />


            <label className="timeLable">
              Hours of Work:
              <input className="timeInput"
                type="time"
                name="startTime"
                value={lineItem.startTime}
                onChange={(e) => handleLineItemChange(index, e)}
              />
              to
              <input className="timeInput"
                type="time"
                name="endTime"
                value={lineItem.endTime}
                onChange={(e) => handleLineItemChange(index, e)}
              />
            </label>


            {lineItem.startTime && lineItem.endTime && (
              <p>Total Hours: {calculateTotalHours(lineItem.startTime, lineItem.endTime)}</p>
            )}

            <label>Total Rate:</label>
            <input
              type="number"
              name="rate"
              value={lineItem.rate}
              onChange={(e) => handleLineItemChange(index, e)}
              placeholder="Rate"
            />

            <label>Expenses:</label>
            <input
              type="number"
              name="expenses"
              value={lineItem.expenses}
              onChange={(e) => handleLineItemChange(index, e)}
              placeholder="Expenses"
            />

            <label>Materials:</label>
            <input
              type="text"
              name="materials"
              value={lineItem.materials}
              onChange={(e) => handleLineItemChange(index, e)}
              placeholder="Materials"
            />

            <label>Labor:</label>
            <input
              type="text"
              name="labor"
              value={lineItem.labor}
              onChange={(e) => handleLineItemChange(index, e)}
              placeholder="Labor"
            />

            <button
              type="button"
              className="remove-line-item"
              onClick={() => handleRemoveLineItem(index)}
            >
              Remove Fields
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-line-item"
          onClick={handleAddLineItem}
        >
          Add New Fields
        </button>

        <label>Date:</label>
        <DatePicker
          selected={invoice.dueDate}
          onChange={handleDueDateChange}
          placeholderText="Select date"
        />

        <label>Payment Method:</label>
        <select
          className="payment"
          name="paymentMethod"
          value={invoice.paymentMethod}
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer/Online</option>
          <option value="Upi">UPI</option>
          <option value="Cash">Cash</option>
        </select>

        <br /><br />
        <label>Payment Status:</label>
        <select
          className="status-dropdown"
          name="status"
          value={invoice.status}
          onChange={handleStatusChange}
        >
          <option value="Paid">Paid</option>
          <option value="Half-Paid">Advanced Payment</option>
          <option value="Pending">Pending</option>
        </select>

        <label>Remark:</label>
        <textarea
          name="notes"
          value={invoice.notes}
          onChange={handleNotesChange}
          placeholder="Notes"
        />

        <br /><br />
        <button className="resetButton" type="button" onClick={handleReset}>
          Reset
        </button>

        <button className="createButton" type="submit">
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
