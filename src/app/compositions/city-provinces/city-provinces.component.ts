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
    private city: CityProvincesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getAll();
  }
  // --------------------get-------------------
  citys: any;
  Selected: any;

  getAll() {
    this.citys = [];
    this.city.getCityProvinces().subscribe(r => {
      this.citys = r['data']['apiResult'];
      console.log(this.citys);
    })
  }

  getById(id) {
    this.Selected = [];
    this.city.getCityProvinceById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.city.deleteCityProvinceId(id).subscribe(r => {
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
    this.city.postCityProvince(this.addValue).subscribe(r => {
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
      this.city.putCityProvince(this.Selected.id,this.editValue).subscribe(r => {
        console.log(r);
        this.getAll();
      })
    }
}
