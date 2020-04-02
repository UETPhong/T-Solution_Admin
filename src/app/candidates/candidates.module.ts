import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class CandidatesModule { }
