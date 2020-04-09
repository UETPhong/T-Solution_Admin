import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CompositionsRoutingModule } from './compositions-routing.module';
import { DepartmentsComponent } from './departments/departments.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { JobPositonsComponent } from './job-positons/job-positons.component';
import { CareersComponent } from './careers/careers.component';
import { CityProvincesComponent } from './city-provinces/city-provinces.component';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartmentsComponent, 
    JobTitlesComponent, 
    JobPositonsComponent, 
    CareersComponent, 
    CityProvincesComponent
  ],
  imports: [
    CommonModule,
    CompositionsRoutingModule,
    // ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class CompositionsModule { }
