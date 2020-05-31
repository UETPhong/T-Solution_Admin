import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PersonnelsRoutingModule } from './personnels-routing.module';
import { PersonnelsComponent } from './personnels/personnels.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [PersonnelsComponent],
  imports: [
    CommonModule,
    PersonnelsRoutingModule,
    CKEditorModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers:[DatePipe],
})
export class PersonnelsModule { }
