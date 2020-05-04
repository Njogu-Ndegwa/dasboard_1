import MemberDetails from './inComponents/member';
import NewMember from './inComponents/addNew';


export const accountRouted = [


{
    path: "/membertype",
    exact: true,
    component: MemberDetails,
    name: "Member Details"
},

{
    path: "/membertype/add",
    exact: true,
    component:NewMember,
    name: "New Member"
},
]