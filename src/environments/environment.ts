// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// export const URL = 'http://192.168.0.184:8000/';
export const URL = 'http://siga_backend.test:8080/';

export const environment = {
    production: false,
    STORAGE_URL: URL + 'storage/',
    API_URL_AUTHENTICATION: URL + 'v1/authentication/',
    API_URL_APP: URL + 'v1/app/',
    API_URL_ATTENDANCE: URL + 'v1/attendance/',
    API_URL_JOB_BOARD: URL + 'v1/job_board/',
    API_URL_WEB: URL + 'v1/web/',
    API_URL_TEACHER_EVAL: URL + 'v1/teacher_eval/',
    API_URL_COMMUNITY: URL + 'v1/community/',

    CLIENT_ID: '2',
    CLIENT_SECRET: 'H9DfzL2nczeIey4Vvsl3EgJxqHh9aWu40obdCpo3', 
    GRANT_TYPE: 'password',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
