// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT : 'https://learn-it-be.herokuapp.com',
  //API_ENDPOINT : 'http://localhost:8080',
  //API_ENDPOINT_NODE : 'http://localhost:8000',
  API_ENDPOINT_NODE : 'https://learn-it-be-node.herokuapp.com',
  API_PM_MANAGER : 'https://prjtmanager.herokuapp.com',
  STRIPE_PUBLIC_TOKEN: 'pk_test_s8tEdMSkAYFFxo6AkOmhFyQc0050euNRAW',
  //STRIPE_PUBLIC_TOKEN: 'pk_live_rpWi9WRKeaD703jtVD9eKS0Q00Ai6Pbw6Y',
  CTRL_UTENTE_LOGGED : false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
