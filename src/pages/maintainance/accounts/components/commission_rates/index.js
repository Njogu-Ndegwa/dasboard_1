
import Commision from './in_components/commission_rates';
import AddCommision from './in_components/add_commision';



export const accountRouted = [


{
    path: "/commission",
    exact: true,
    component: Commision ,
    name: "Commission"
},

{
    path: "/commission/add",
    exact: true,
    component:AddCommision,
    name: "Add Commission"
},
]