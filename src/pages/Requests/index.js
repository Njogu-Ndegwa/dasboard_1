import Requests from './requests';
import ServiceRequested from './services_requested';

export const routes = [
    {
        path: '/allrequests',
        component: Requests,
        exact: true,
        name: 'Requests'
    },

    {
        path: '/servicesrequested',
        component: ServiceRequested,
        exact: true,
        name: 'Services Requested'
    }
]