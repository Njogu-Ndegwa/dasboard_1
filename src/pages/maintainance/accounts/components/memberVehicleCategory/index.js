import VehicleCategory from './inComponents/categoryDetails';
import NewCategory from './inComponents/newCategory';


export const accountRouted = [


{
    path: "/vehiclecategory",
    exact: true,
    component: VehicleCategory,
    name: "Vehicle Details"
},

{
    path: "/vehiclecategory/add",
    exact: true,
    component:NewCategory,
    name: "Vehicle Details"
},
]