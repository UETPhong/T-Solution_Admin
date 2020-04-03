import { Component, OnInit } from '@angular/core';
import { CityProvincesService } from '../../services'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-city-provinces',
  templateUrl: './city-provinces.component.html',
  styleUrls: ['./city-provinces.component.css']
})
export class CityProvincesComponent implements OnInit {

  constructor(
    private service: CityProvincesService,
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
    })
  }
  //obj
  addValue = {
    // id: '',
    name: '',
    active: true,
  }

  //add
  addNew() {
    this.addValue.name = this.addFrom.value.name;
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
      })
    }
    //obj
    editValue = {
      id: '',
      name: '',
      active: true,
    }
  
    //add
    editSelected() {
      this.editValue.id = this.Selected.id;
      this.editValue.name = this.Selected.name;
      this.editValue.active = this.Selected.active;
      if(this.editFrom.value.name){this.editValue.name = this.editFrom.value.name}
      this.service.put(this.Selected.id,this.editValue).subscribe(r => {
        console.log(r);
        this.getAll();
        this.Selected = [];
      })
    }
}
