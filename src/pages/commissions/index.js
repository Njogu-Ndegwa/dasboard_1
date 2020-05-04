import Commission from './sp_commission';
import Cash from './sp_cash_hand'


export const routes = [
    {
        path: '/spcommission',
        component: Commission,
        exact: true,
        name: 'Allocation'
    },

    {
        path: '/cashathand',
        component: Cash,
        exact: true,
        name: 'Allocation'
    },
]