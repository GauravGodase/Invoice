import React, { useState, useEffect } from 'react';
import InvoiceStore from '../stores/InvoiceStore';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(() => InvoiceStore.getAll());
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleStoreChange = () => {
      try {
        const updatedInvoices = InvoiceStore.getAll();
        setInvoices(updatedInvoices);
        setError(null);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setError('Error fetching invoices');
      }
    };

    InvoiceStore.on('change', handleStoreChange);

    return () => {
      InvoiceStore.removeListener('change', handleStoreChange);
    };
  }, []);

  

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {invoices.length === 0 ? (
        <p>No invoices available</p>
      ) : (
        invoices.map((invoice) => (
          <div key={invoice.id}>
            <p>{invoice.description}</p>
            <ul>
              {invoice.lineItems.map((lineItem, index) => (
                <li key={index}>
                  {lineItem.description} - {lineItem.quantity} x {lineItem.rate}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default InvoiceList;







