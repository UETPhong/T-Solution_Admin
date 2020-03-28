import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplaysRoutingModule } from './displays-routing.module';
import { BannersComponent } from './banners/banners.component';
import { ArticlecsComponent } from './articlecs/articlecs.component';
import { RecruitmentsComponent } from './recruitments/recruitments.component';


@NgModule({
  declarations: [BannersComponent, ArticlecsComponent, RecruitmentsComponent],
  imports: [
    CommonModule,
    DisplaysRoutingModule
  ]
})
export class DisplaysModule { }
