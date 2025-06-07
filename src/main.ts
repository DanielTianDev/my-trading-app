import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Configuration flag - set to true to use mock API, false to use real API
const USE_MOCK_API = false; // You can change this manually or use environment variables


if (USE_MOCK_API) {
  // Use mock API
  import('./mocks/browser').then(({ worker }) => {
    worker.start().then(() => {
      console.log('Using mock API');
      bootstrapApplication(App, appConfig)
        .catch((err) => console.error(err));
    });
  });
} else {
  // Use real API
  console.log('Using real API');
  bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err));
}
















//   if (import.meta.env?.DEV) {
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start().then(() => {
//       bootstrapApplication(App, appConfig)
//         .catch((err) => console.error(err));
//     });
//   });
// } else {
//   bootstrapApplication(App, appConfig)
//     .catch((err) => console.error(err));
// }