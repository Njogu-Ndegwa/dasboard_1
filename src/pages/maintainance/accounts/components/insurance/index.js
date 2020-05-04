import  AddInsurance from './inComponents/addInsurance';
import Insurance from './inComponents/insurance';



export const accountRouted = [


{
    path: "/insurance",
    exact: true,
    component: Insurance,
    name: "Insurance"
},

{
    path: "/insurance/add",
    exact: true,
    component:AddInsurance,
    name: "Add Insurance"
},
]

