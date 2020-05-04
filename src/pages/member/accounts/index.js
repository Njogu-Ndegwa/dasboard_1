import ActivateOrDeactivate from './components/activateOrDeactivate';
import Listing from './components/listing';
import UpdateMembers from './components/updateMember';
import {accountRouted as newMember } from './components/newMember';

export const memberRoutes = [
    {
        path: "/activateordeactivatem",
        exact: true,
        component: ActivateOrDeactivate,
        name: "Activate or Deactivate"
    },
    {
        path: "/listingm",
        exact: true,
        component: Listing,
        name: "Listing"
    },

    {
        path: "/updatemembers",
        exact: true,
        component: UpdateMembers,
        name: "Update Members"
    },

    ...newMember
]



