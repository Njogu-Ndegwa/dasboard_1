
import { accountRouted as registerService } from './components/registerServices';
import { accountRouted as registerProviderVehicle } from './components/vehicleDetails';
import { accountRouted as serviceRates } from './components/serviceRates';
import { accountRouted as registerMemberVehicle } from './components/memberVehicle';
import { accountRouted as distanceLimit } from './components/distanceLimit'
import { accountRouted as memberVehicleCategory } from './components/memberVehicleCategory';
import {accountRouted as MemberType} from './components/member_type';
import { accountRouted as BankBranch } from './components/bank_branches';
import {accountRouted as Bank} from './components/banks';
import { accountRouted as Mapping } from './components/mapping';
import { accountRouted as Insurance } from './components/insurance';
import {accountRouted as commissionRates} from './components/commission_rates';
export const accountRoutes = [

    ...registerService,
    ...registerProviderVehicle,
    ...registerMemberVehicle,
    ...memberVehicleCategory,
    ...serviceRates,
    ...distanceLimit,
    ...MemberType,
    ...BankBranch,
    ...Bank,
    ...Mapping,
    ...Insurance,
    ...commissionRates,
    
]