import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  constructor(
    private service: DepartmentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getAll();
  }
  // --------------------get-------------------
  all: any;
  Selected: any;

  getAll() {
    this.all = [];
    this.service.getDepartments().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
  }

  getById(id) {
    this.Selected = [];
    this.service.getDepartmentById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteDepartmentId(id).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }
  // --------------------post-------------------
  //buildForm
  addFrom: FormGroup;
  buildFromAdd() {
    this.addFrom = this.fb.group({
      name: '',
      active: true,
    })
  }
  //obj
  addValue = {
    // id: '',
    name: '',
    active: '',
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  //add
  addNew() {
    this.addValue.name = this.addFrom.value.name;
    this.addValue.active = this.addFrom.value.active;
    this.service.postDepartment(this.addValue).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }

  // --------------------put-------------------
    //buildForm
    editFrom: FormGroup;
    buildFromEdit() {
      this.editFrom = this.fb.group({
        name: '',
        active: true,
      })
    }
    //obj
    editValue = {
      id: '',
      name: '',
      active: '',
      created_by: '',
      created_date: '',
      updated_by: '',
      updated_date: '',
    }
  
    //add
    editSelected() {
      this.editValue.id = this.Selected.id;
      this.editValue.name = this.editFrom.value.name;
      this.editValue.active = this.editFrom.value.active;
      console.log(this.editValue);
      this.service.putDepartment(this.Selected.id,this.editValue).subscribe(r => {
        console.log(r);
        this.getAll();
      })
    }
}
