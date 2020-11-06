import { Routes } from '@angular/router';
import { PageCorsoComponent } from './pages/page-corso/page-corso.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
 
export const AppRoutes: Routes = [
    { path: '', component: PageHomeComponent },
    { path: 'corso', component: PageCorsoComponent }
  ];
