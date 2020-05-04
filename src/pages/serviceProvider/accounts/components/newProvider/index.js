import ServiceProvider from './inComponents/newProviders';
import AddVehicle from './inComponents/add_vehicles';
import VehicleDetails from './inComponents/vehicle_details';
import Driver from './inComponents/driver';
import AddDriver from './inComponents/add_new_driver';
import EditSp from './inComponents/edit_sp';
import Reviews from './inComponents/reviews_and_ratings';


export const accountRouted = [


    {
        path: "/serviceprovider",
        exact: true,
        component: ServiceProvider,
        name: "Service Provider"
    },

    {
        path: "/serviceprovider/vehicle/add",
        exact: true,
        component: AddVehicle,
        name: "Service Provider"
    },

    {
        path: "/serviceprovider/vehicle",
        exact: true,
        component: VehicleDetails,
        name: "Vehicle Details"
    },

    {
        path: "/serviceprovider/vehicle/driver",
        exact: true,
        component: Driver,
        name: "Driver"
    },

    {
        path: "/serviceprovider/vehicle/driver/add",
        exact: true,
        component: AddDriver,
        name: "Add Driver"
    },

    {
        path: "/serviceprovider/edit",
        exact: true,
        component: EditSp,
        name: "Edit Sp"
    },

    
    {
        path: "/reviews",
        exact: true,
        component: Reviews,
        name: "Reviews"
    },


    
    ]