import { EventEmitter } from "events";
import { Dispatcher } from "flux";
import * as ActionTypes from "../constants/ActionTypes"; 

const dispatcher = new Dispatcher();
let invoices = [];

class InvoiceStore extends EventEmitter {
  getAll() {
    return invoices;
  }
}

class Invoice {
  constructor(id, description, lineItems) {
    this.id = id;
    this.description = description;
    this.lineItems = lineItems || []; 
  }
}

const store = new InvoiceStore();

dispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.ADD_LINE_ITEM:
      const { invoiceId, lineItem } = action.payload;
      const invoiceToUpdate = invoices.find(
        (invoice) => invoice.id === invoiceId
      );
      if (invoiceToUpdate) {
        invoiceToUpdate.lineItems.push(lineItem);
        store.emit("change");
      }
      break;
    case ActionTypes.ADD_INVOICE:
      invoices.push(action.payload);
      store.emit("change");
      break;
    default:
  }
});

export default store;
