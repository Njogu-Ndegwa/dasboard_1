import ServicePoint from './components/ServicePointDetails';
import AddServicePoint from  './components/AddPoint';


export const routes = [
    {
        path: "/settings/servicepoints",
        exact: true,
        component: ServicePoint,
        name: "Service Point"
    },
    {
        path: "/settings/servicepoint/adds",
        exact: true,
        component: AddServicePoint,
        name: "Add Service Point"
    },

]
