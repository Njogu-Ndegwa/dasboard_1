import Member from './inComponents/newMember';
import MemberVehicle from './inComponents/member_vehicle_details'
import AddVehicle from './inComponents/add_vehicle'
import MemberDocuments from './inComponents/vehicle_doc';
import EditMember from './inComponents/edit_member';

export const accountRouted = [


    {
        path: "/member",
        exact: true,
        component: Member,
        name: "Member"
    },

    {
        path: "/member/vehicle",
        exact: true,
        component: MemberVehicle,
        name: "Member Vehicle"
    },

    {
        path: "/member/vehicle/add",
        exact: true,
        component: AddVehicle,
        name: "Add Vehicle"
    },
    {
        path: "/member/vehicle/documents",
        exact: true,
        component: MemberDocuments,
        name: "Add Vehicle"
    },

    {
        path: "/member/edit",
        exact: true,
        component: EditMember,
        name: "Edit Member"
    },
    
    ]