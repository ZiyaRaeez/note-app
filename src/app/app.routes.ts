import { Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: PageComponent },
  { path: 'notes/:id', component: PageComponent }
];