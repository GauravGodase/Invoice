import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InvoiceDetails from './InvoiceDetails';

const InvoiceDetailsWrapper = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = () => {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        const foundInvoice = storedInvoices.find((inv) => inv.id === parseInt(id, 10));

        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          console.error('Invoice not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice data', error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return <InvoiceDetails invoice={invoice} />;
};

export default InvoiceDetailsWrapper;
