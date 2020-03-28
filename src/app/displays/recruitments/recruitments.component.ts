import { Component, OnInit } from '@angular/core';
import { RecruitmentsService } from '../../services';

@Component({
  selector: 'app-recruitments',
  templateUrl: './recruitments.component.html',
  styleUrls: ['./recruitments.component.css']
})
export class RecruitmentsComponent implements OnInit {

  recs: any;

  constructor(private rec: RecruitmentsService) { }

  ngOnInit(): void {
    this.getRecruitments();
  }

  // -------------------------get--------------------------

  getRecruitments() {
    this.recs = [];
    this.rec.getRecruitments().subscribe(r => {
      this.recs = r['data']['apiResult'];
      console.log(this.recs);
    })
  }
}
