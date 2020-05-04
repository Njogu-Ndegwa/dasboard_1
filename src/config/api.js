import * as LocalStorage from '../utils/localstorage'
export default {
    BASE_URL: process.env.API_BASE_URL || 'http://localhost:8200/',
    ACCESS_TOKEN: 'accessToken',
    GET_ACCOUNT_LIST: '/api/accounts',
    GET_CHART_OF_ACCOUNTS: '/api/chartofaccounts',
    UPDATE_ACCOUNT: '/api/accounts/{code}',
    CREATE_ACCOUNT: '/api/accounts',
    GET_ACCOUNT: '/api/accounts/{code}',

    LOAD_ACCOUNT_TYPE: '/api/settings/accounts/type',
    LOAD_ACCOUNTS_LIST: '/api/accounts',

    CREATE_JOURNAL_ENTRY: '/api/journals',
    GET_JOURNAL_LIST: '/api/journals',

    APP_USERNAME: 'mrescue',
    APP_PASS: 'ccUyb6vS4S8nxfbKPCrN',
    AUTH: 'Basic ' + new Buffer('web_app:ccUyb6vS4S8nxfbKPCrN').toString('base64'),
    TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic21hcnRoZWFsdGgtc2VydmljZSJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1Njk4MzczOTAsImlhdCI6MTU2OTIzMjU5MCwiYXV0aG9yaXRpZXMiOlsicm9sZV9hZG1pbiIsImNhbl91cGRhdGVfdXNlciIsImNhbl9yZWFkX3VzZXIiLCJjYW5fY3JlYXRlX3VzZXIiLCJjYW5fZGVsZXRlX3VzZXIiXSwianRpIjoiZTNkZWQ3MWItOTdlNi00ZGE1LThhMjYtMGRjNzdjNDk4NjYyIiwiY2xpZW50X2lkIjoid2ViX2FwcCJ9.NQVOpg7hLAVnrQfNl50Q_nX_o1p_MlY1BfJkSkuPNcQf1ygLLjVR_p02TvgajB0VLjuywi4eYZGMeUWkv556VQOsxsS0z5RK3sPCesCiD5Zh8ZemXES3SzkR17prU6QCW28l0Ncni7aAE3B8Q7nxvUZB8tT4Ofelkrz1N1KH7vWmgXLAx0_QMn3Sc9Vfd8oTujH2oCx5LFqk2o4l60ukfoy7R7mO2QWK512WMqDv46bcVmd93WMevjDGI6d01SxidNlsDGw2LmKzsAjZ6KBN9-uqMgJDN8Wgqo2F6jS1TAri_QyAiio0tdtcHMfIAULzowrorUsodt3o5WliuDU4WQ"
    //TOKEN: LocalStorage.get('smarthealth_token')

}