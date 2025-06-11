import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

// Configuration flag - use environment setting for mock API
const USE_MOCK_API = environment.features.enableMockData;


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