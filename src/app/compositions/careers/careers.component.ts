import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  all: any;

  constructor(
    private service: CareersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getAll();
  }
  // --------------------get-------------------

  getAll() {
    this.all = [];
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    // console.log(id);
    this.service.delete(id).subscribe(r => {
      console.log(r);
      this.getAll()
    });
  }
  // --------------------post-------------------
  //form
  addForm: FormGroup;
  buildFromAdd() {
    this.addForm = this.fb.group({
      name: '',
    })
  }
  addValue = {
    name: '',
    active: true,
  }

  addNew() {
    this.addValue.name = this.addForm.value.name;
    this.service.post(this.addValue).subscribe(r => {
      console.log(r);
      this.getAll();
    });
  }
  // --------------------put-------------------
  Selected: any;
  getSelected(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
    })
  }
  editFrom: FormGroup;
  buildFromEdit() {
    this.editFrom = this.fb.group({
      name: '',
    })
  }
  editValue = {
    id: '',
    name: '',
    active: true,
  }
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.name = this.Selected.name;
    this.editValue.active = this.Selected.active;
    if (this.editFrom.value.name) { this.editValue.name = this.editFrom.value.name }
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      this.getAll();
      this.Selected=[];
    })
  }
}
