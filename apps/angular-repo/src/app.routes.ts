import { Routes } from '@angular/router';
import { ListComponent } from './components/List.component';
import { ContentComponent } from './components/Content.component';
import { WriteComponent } from './components/Write.component';
import { NotAuthComponent } from './components/NotAuth.component';
import { NotFoundComponent } from './components/NotFound.component';

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
