import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [{
  path: '', data: { title: 'Ung tuyen' },
  children: [
    { path: '', redirectTo: 'candidates' },
    { path: 'candidates', component: CandidatesComponent, data: { title: 'Danh sach ung vien' } },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
