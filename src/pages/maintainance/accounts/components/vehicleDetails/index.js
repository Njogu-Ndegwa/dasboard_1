import VehicleDetails from './inComponents/providerVehicleDetails';
import NewVehicle from './inComponents/newVehicle';


export const accountRouted = [


{
    path: "/settings/vehicledetails",
    exact: true,
    component: VehicleDetails,
    name: "Vehicle Details"
},

{
    path: "/settings/vehicledetails/add",
    exact: true,
    component:NewVehicle,
    name: "Vehicle Details"
},
]