import * as ActionTypes from '../constants/ActionTypes';



export const addInvoice = (invoice) => {
  console.log('Adding invoice:', invoice);
  return {
    type: ActionTypes.ADD_INVOICE,
    payload: invoice,
  };
};




export const updateInvoiceStatus = (invoiceId, status) => ({
  type: ActionTypes.UPDATE_INVOICE_STATUS,
  payload: { invoiceId, status },
});


export const addLineItem = (invoiceId, lineItem) => ({
  type: ActionTypes.ADD_LINE_ITEM,
  payload: { invoiceId, lineItem },
});
