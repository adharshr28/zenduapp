import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionsPageComponent } from './submissions-page.component';

const routes: Routes = [{
  path: '',
  component: SubmissionsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionsPageRoutingModule { }
