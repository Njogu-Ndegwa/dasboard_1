import Bank from './inComponents/bank';
import AddBank from './inComponents/addBank';


export const accountRouted = [


{
    path: "/bank/",
    exact: true,
    component: Bank,
    name: "Bank"
},

{
    path: "/bank/add",
    exact: true,
    component:AddBank,
    name: "Add Bank"
},
]