import { routes as dashboards } from './pages/dashboard';
import { routes as settings } from './pages/settings';
import { routes as accounting } from './pages/accounting';
import { routes as auth } from './pages/auth';
import { routes as members} from './pages/member';
import { routes as serviceProvider } from './pages/serviceProvider';
import { routes as maintainance } from './pages/maintainance';
import { routes as reports } from './pages/reports';
import { routes as security } from './pages/security';
// import { routes as servicePoint } from './pages/servicepoints';
import {routes as claimsManagement} from './pages/claims_management';
import {routes as Commission} from './pages/commissions';
import {routes as Requests} from './pages/Requests';
export const routes = [
    ...dashboards,
    ...settings,
    ...accounting,
    ...members,
    ...serviceProvider,
    ...maintainance,
    ...reports,
    ...security,
    ...claimsManagement,
    ...Commission,
    ...Requests,
   
    
  
];

export const authRoutes = [
    ...auth
];