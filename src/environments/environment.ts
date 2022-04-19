// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pusher: {
    key: '93dc96c144df20eeaece',
    cluster: 'eu',
  },

  // LOCAL SERVICE
  // Url: 'https://dev.smartestateapp.com/smartestateserver/public/api',
  // baseUrl: 'https://dev.smartestateapp.com/smartestateserver/public/api',
  // imageLink: 'https://dev.smartestateapp.com/smartestateserver/public/api',
  // documentLink: 'https://dev.smartestateapp.com/smartestateserver/public/api',

   // LOCAL SERVICE
  // Url: 'https://smartestateserver.lp46men.org/api',
  // baseUrl: 'https://smartestateserver.lp46men.org/api',
  // imageLink: 'https://smartestateserver.lp46men.org/api',
  // documentLink: 'https://smartestateserver.lp46men.org/api',

  Url: 'https://devserver.lp46men.org/api',
  baseUrl: 'https://baloshsmart-admin-portal.baloshsmart.com/api/v1',
  imageLink: 'https://devserver.lp46men.org/api',
  documentLink: 'https://devserver.lp46men.org/api',
  FLUTTERWAVE_KEY: 'FLWPUBK_TEST-92bbd9ca7c9157cb93841292a3ccff24-X',
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
