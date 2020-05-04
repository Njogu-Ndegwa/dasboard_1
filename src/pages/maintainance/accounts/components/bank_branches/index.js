import Branch from './inComponents/branch';
import AddBranch from './inComponents/addBranch';


export const accountRouted = [


{
    path: "/bank/branch",
    exact: true,
    component: Branch,
    name: "Branch"
},

{
    path: "/bank/branch/add",
    exact: true,
    component:AddBranch,
    name: "Add Branch"
},
]