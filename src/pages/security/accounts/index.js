
import {routes as auditLogs} from './components/audit_logs';
import {routes as userGroups} from './components/user_group'
import {routes as systemUsers} from './components/system_users'
import {routes as rolePermissions} from './components/role_permissions'

export const accountRoutes = [
 
    ...auditLogs,
    ...userGroups,
    ...systemUsers,
    ...rolePermissions,
   
]



