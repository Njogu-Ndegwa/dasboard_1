
import  AddDistance from './inComponents/setDistance';
import DistanceLimitDetails from './inComponents/distance';



export const accountRouted = [


{
    path: "/distance",
    exact: true,
    component: DistanceLimitDetails,
    name: "Service Point"
},

{
    path: "/distance/add",
    exact: true,
    component:AddDistance,
    name: "Add Service Point"
},
]

