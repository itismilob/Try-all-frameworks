import { Routes } from '@angular/router';
import { ListComponent } from './pages/List.component';
import { ContentComponent } from './pages/Content.component';
import { WriteComponent } from './pages/Write.component';
import { NotAuthComponent } from './pages/NotAuth.component';
import { NotFoundComponent } from './pages/NotFound.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListComponent },
      { path: 'content/:contentID', component: ContentComponent },
      { path: 'write', component: WriteComponent },
      { path: 'not-auth', component: NotAuthComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
