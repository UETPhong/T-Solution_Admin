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
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
  }

  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.delete(id).subscribe(r => {
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
      parent_id: '',
    })
  }
  //obj
  addValue = {
    name: '',
    parent_id: '',
    active: true,
  }

  //add
  addNew() {
    this.addValue.name = this.addFrom.value.name;
    this.addValue.parent_id = this.addFrom.value.parent_id;
    console.log(this.addValue);
    this.service.post(this.addValue).subscribe(r => {
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
      parent_id: '',
    })
  }
  //obj
  editValue = {
    id: '',
    name: '',
    parent_id: '',
    active: true,
  }

  //add
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.name = this.Selected.name;
    this.editValue.parent_id = this.Selected.parent_id;
    this.editValue.active = this.Selected.active;
    if (this.editFrom.value.name) { this.editValue.name = this.editFrom.value.name; }
    if (this.editFrom.value.parent_id) { this.editValue.parent_id = this.editFrom.value.parent_id; } else { this.editValue.parent_id = '' }
    if (this.editFrom.value.active) { this.editValue.active = this.editFrom.value.active; }
    console.log(this.editValue);
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      this.getAll();
      this.Selected = [];
    })
  }
}
