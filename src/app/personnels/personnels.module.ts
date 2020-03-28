import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PersonnelsRoutingModule } from './personnels-routing.module';
import { PersonnelsComponent } from './personnels/personnels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
// import { ErrorInterceptor } from '../_helpers/error.interceptor';



@NgModule({
  declarations: [PersonnelsComponent],
  imports: [
    CommonModule,
    PersonnelsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class PersonnelsModule { }
