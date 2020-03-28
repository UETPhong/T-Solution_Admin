import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelsComponent } from './personnels/personnels.component';


const routes: Routes = [
  {
    path: '', data: { title: 'Nhan su' },
    children: [
      { path: '', redirectTo: 'personnels' },
      { path: 'personnels', component: PersonnelsComponent, data: { title: 'Danh sach nhan su' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelsRoutingModule { }
