import { Component, OnInit } from '@angular/core';
import { JobPositionsService } from '../../services'

@Component({
  selector: 'app-job-positons',
  templateUrl: './job-positons.component.html',
  styleUrls: ['./job-positons.component.css']
})
export class JobPositonsComponent implements OnInit {
  jobPositions: any;

  constructor( private position: JobPositionsService) { }

  ngOnInit(): void {
    this.getPositions();
  }
// --------------------get -------------------

  getPositions(){
    this.jobPositions = [];
    this.position.getPositions().subscribe(r => {
      this.jobPositions = r['data']['apiResult'];
      console.log(this.jobPositions);
    })
  }

}
