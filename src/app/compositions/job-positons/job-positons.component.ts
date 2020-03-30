import { Component, OnInit } from '@angular/core';
import { JobPositionsService } from '../../services'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-positons',
  templateUrl: './job-positons.component.html',
  styleUrls: ['./job-positons.component.css']
})
export class JobPositonsComponent implements OnInit {

  constructor(
    private service: JobPositionsService,
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
    this.service.getPositions().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
  }

  getById(id) {
    this.Selected = [];
    this.service.getPositionById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deletePositionById(id).subscribe(r => {
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
    this.service.postPosition(this.addValue).subscribe(r => {
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
      this.service.putPosition(this.Selected.id,this.editValue).subscribe(r => {
        console.log(r);
        this.getAll();
      })
    }
}

