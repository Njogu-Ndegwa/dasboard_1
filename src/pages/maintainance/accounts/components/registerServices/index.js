
import ServicePointDetails from './inComponents/test';
import AddService from './inComponents/addService';



export const accountRouted = [


{
    path: "/settings/servicepoint",
    exact: true,
    component: ServicePointDetails,
    name: "Service Point"
},

{
    path: "/settings/servicepoint/add",
    exact: true,
    component:AddService,
    name: "Add Service Point"
},
]