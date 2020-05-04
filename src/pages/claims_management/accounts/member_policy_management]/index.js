import PolicyDetails from './in_components/policy_management';
import AddPolicy from './in_components/add_policy';


export const accountRouted = [


{
    path: "/policy",
    exact: true,
    component: PolicyDetails,
    name: "Policy Details"
},

{
    path: "/policy/add",
    exact: true,
    component:AddPolicy,
    name: "Add Policy"
},
]