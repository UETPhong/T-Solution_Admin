import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services'

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  deps: any;

  constructor( private dep: DepartmentsService) { }

  ngOnInit(): void {
    this.getDepartments();
  }
// --------------------get -------------------

  getDepartments(){
    this.deps = [];
    this.dep.getDepartments().subscribe(r => {
      this.deps = r['data']['apiResult'];
      console.log(this.deps);
    })
  }

}
