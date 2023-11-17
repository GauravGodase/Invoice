
import React from "react";
import Barcode from "react-barcode";
import "./InvoiceDetails.css"; 

const InvoiceDetails = ({ invoice }) => {
  if (!invoice) {
    return <div>Loading...</div>;
  }

// alert function for payment
  const showAlertForPaymentStatus = () => {
    if (invoice && (invoice.status === "Half Paid" || invoice.status === "Pending")) {
      alert(`Payment Status: ${invoice.status}`);
    }
  };

  showAlertForPaymentStatus();

  const handlePrintClick = () => {
    window.print();
  };

  const handleShareClick = async () => {
    // Check if Web Share API is supported by the browser
    if (navigator.share) {
      try {
        // Use Web Share API to share text content
        await navigator.share({
          title: "Invoice Details",
          text: `Invoice ID: ${invoice.id}, Product Name: ${invoice.description}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      window.print();
    }
  };

  return (
    <div className="invoice-details-container">
      <div className="container">
        <div className="company-name">
          <p>Company Name: XYZ</p>
          <p>Address: Mumbai, Maharashtra</p>
          <p>Email: xyz@gmail.com</p>
        </div>
        <div className="barcode">
          <Barcode value={`Invoice ID: ${invoice.id}`} width={1} height={40} />
        </div>
      </div>

      <h2>Invoice Details</h2>

      {/* Invoice Details Table */}
      <table className="invoice-table">
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{invoice.id}</td>
          </tr>
          <tr>
            <td> Name:</td>
            <td>{invoice.description}</td>
          </tr>
          <tr>
            <td>Due Date:</td>
            <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</td>
            </tr>
          <tr>
            <td>Payment Status:</td>
            <td>{invoice.status}</td>
          </tr>
          <tr>
            <td>Payment Method:</td>
            <td>{invoice.paymentMethod}</td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td>{invoice.notes}</td>
          </tr>
        </tbody>
      </table>

      <h3>Line Items</h3>

      {/* Line Items Table */}
      <table className="line-items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Rate</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((lineItem, index) => (
            <tr key={index}>
              <td>{lineItem.description}</td>
              <td>{lineItem.rate}</td>
              <td>{lineItem.materials}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="print-button">
        <button onClick={handleShareClick}>Share</button>
        <button onClick={handlePrintClick}>Print</button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
