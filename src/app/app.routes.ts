import { Routes } from '@angular/router';
import { ListaCorsiComponent } from './lista-corsi/lista-corsi.component';
import { CorsoComponent } from './corso/corso.component'
 
export const AppRoutes: Routes = [
    { path: '', component: ListaCorsiComponent },
    { path: 'corso', component: CorsoComponent }
  ];
