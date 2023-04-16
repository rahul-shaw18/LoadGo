import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environment/environment.prod';
import { AppModule } from './app/app.module';



// const src =`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
