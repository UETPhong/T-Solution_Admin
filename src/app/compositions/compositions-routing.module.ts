import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsComponent } from './departments/departments.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { JobPositonsComponent } from './job-positons/job-positons.component';
import { CareersComponent } from './careers/careers.component';
import { CityProvincesComponent } from './city-provinces/city-provinces.component';

const routes: Routes = [
  {
    path: '', data: { title: 'Thanh phan cong ty' },
    children: [
      { path: '', redirectTo: 'departments' },
      { path: 'departments', component: DepartmentsComponent, data: { title: 'Phong ban' } },
      { path: 'jobtitles', component: JobTitlesComponent, data: { title: 'Chuc danh' } },
      { path: 'jobpositions', component: JobPositonsComponent, data: { title: 'Chuc vu' } },
      { path: 'careers', component: CareersComponent, data: { title: 'Nganh nghe' } },
      { path: 'cityprovinces', component: CityProvincesComponent, data: { title: 'Tinh/Thanh pho' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompositionsRoutingModule { }
