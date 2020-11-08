import { Routes } from '@angular/router';
import { PageLezioneComponent } from './pages/page-lezione/page-lezione.component';
import { PageCorsoComponent } from './pages/page-corso/page-corso.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
 
export const AppRoutes: Routes = [
    { path: '', component: PageHomeComponent },
    { path: 'corso', component: PageCorsoComponent },
    { path: 'lezione', component: PageLezioneComponent }
  ];
