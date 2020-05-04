import {accountRouted as PolicyManagement} from './member_policy_management]';
import {accountRouted as PrepareInvoice} from './prepare_invoices';
import {accountRouted as Allocation} from './allocation';
import {accountRouted as Reciepts } from './recieve_payment'


export const accountRoutes = [
    ...PolicyManagement,
    ...PrepareInvoice,
    ...Allocation,
    ...Reciepts,
]