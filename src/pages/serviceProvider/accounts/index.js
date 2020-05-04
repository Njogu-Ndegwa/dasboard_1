
import Listing from './components/listing';
import DisputeManagement from './components/disputeManagement';
import {accountRouted as newProvider } from './components/newProvider';
import {accounroutes as SpShift} from './components/spShifts'

export const accountRoutes = [

    {
        path: "/listing",
        exact: true,
        component: Listing,
        name: "Listing"
    },

    {
        path: "/disputemanagement",
        exact: true,
        component: DisputeManagement,
        name: "Dispute Management"
    },

    ...newProvider,
    ...SpShift,
]