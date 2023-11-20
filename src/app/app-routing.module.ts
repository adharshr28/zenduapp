import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Lazy loading syntax
const routes: Routes = [
  { 
    path: 'submissions', 
    loadChildren: () => import('./components/submissions-page/submissions-page.module').then(m => m.SubmissionsPageModule) 
  },
  { 
    path: '', 
    redirectTo: 'submissions', 
    pathMatch: 'full' 
  },
  // { path: '**', component: PageNotFoundComponent },  // Uncomment and use if you have a 404 component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
