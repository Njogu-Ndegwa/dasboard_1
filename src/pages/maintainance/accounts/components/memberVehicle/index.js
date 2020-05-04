import VehicleDetails from './inComponents/vehicleDetails';
import NewVehicle from './inComponents/newVehicle';


export const accountRouted = [


{
    path: "/vehicledetails",
    exact: true,
    component: VehicleDetails,
    name: "Vehicle Details"
},

{
    path: "/vehicledetails/add",
    exact: true,
    component:NewVehicle,
    name: "Vehicle Details"
},
]