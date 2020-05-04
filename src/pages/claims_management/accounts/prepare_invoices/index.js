import InvoiceDetails from './in_component/test';
import NewInvoice from './in_component/add_invoice';
import Request from './in_component/requests';
import Dispatch from './in_component/dispatch_invoices';


export const accountRouted = [


{
    path: "/invoice",
    exact: true,
    component: InvoiceDetails,
    name: "Invoice Details"
},

{
    path: "/newinvoice",
    exact: true,
    component:Request,
    name: "Requests"
},

{
    path: "/newinvoice/add",
    exact: true,
    component:NewInvoice,
    name: "Prepare Invoice"
},





{
    path: "/dispatch",
    exact: true,
    component:Dispatch,
    name: "Dispatch"
},

]