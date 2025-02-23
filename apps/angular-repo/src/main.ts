import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { LayoutComponent } from './pages/Layout.component';

bootstrapApplication(LayoutComponent, appConfig).catch((err) =>
  console.error(err),
);
