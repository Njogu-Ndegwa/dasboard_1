import RatesDetails from './inComponents/ratesDetails';
import SetRates from './inComponents/setRates';


export const accountRouted = [


{
    path: "/settings/ratesdetails",
    exact: true,
    component: RatesDetails,
    name: "Rate Details"
},

{
    path: "/settings/ratesdetails/add",
    exact: true,
    component:SetRates,
    name: "Set Rates"
},
]