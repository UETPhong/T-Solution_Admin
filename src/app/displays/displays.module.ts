import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


import { DisplaysRoutingModule } from './displays-routing.module';
import { BannersComponent } from './banners/banners.component';
import { ArticlecsComponent } from './articlecs/articlecs.component';
import { RecruitmentsComponent } from './recruitments/recruitments.component';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  declarations: [BannersComponent, ArticlecsComponent, RecruitmentsComponent],
  imports: [
    CommonModule,
    DisplaysRoutingModule,
    CKEditorModule,
    // ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers:[DatePipe],
})
export class DisplaysModule { }
