import { Component, OnInit } from '@angular/core';
import { JobTitlesService } from '../../services'


@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.css']
})
export class JobTitlesComponent implements OnInit {
  jobtitles: any;

  constructor( private title: JobTitlesService) { }

  ngOnInit(): void {
    this.getJobTitles();
  }
// --------------------get -------------------

  getJobTitles(){
    this.jobtitles = [];
    this.title.getJobTitles().subscribe(r => {
      this.jobtitles = r['data']['apiResult'];
      console.log(this.jobtitles);
    })
  }

}
