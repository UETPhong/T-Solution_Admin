import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannersComponent } from './banners/banners.component';
import { ArticlecsComponent } from './articlecs/articlecs.component';
import { RecruitmentsComponent } from './recruitments/recruitments.component';


const routes: Routes = [{
  path: '', data: { title: 'Hien thi' },
  children: [
    { path: '', redirectTo: 'banners' },
    { path: 'banners', component: BannersComponent, data: { titls: 'Banner' } },
    { path: 'articlecs', component: ArticlecsComponent, data: { titls: 'Bai viet' } },
    { path: 'recruitments', component: RecruitmentsComponent, data: { titls: 'Tuyen dung' } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplaysRoutingModule { }
