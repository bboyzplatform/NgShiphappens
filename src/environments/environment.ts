// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAZvKI_Q8e1noadc1YZqQlAV6D_qSOzdQE',
    authDomain: 'ng-shiphappens.firebaseapp.com',
    databaseURL: 'https://ng-shiphappens.firebaseio.com',
    projectId: 'ng-shiphappens',
    storageBucket: 'ng-shiphappens.appspot.com',
    messagingSenderId: '357824235268'
  }
};
