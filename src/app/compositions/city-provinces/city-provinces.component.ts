import { Component, OnInit, ViewChild } from '@angular/core';
import { CityProvincesService } from '../../services'
import { ModalDirective } from 'ngx-bootstrap';
// import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-city-provinces',
  templateUrl: './city-provinces.component.html',
  styleUrls: ['./city-provinces.component.css']
})
export class CityProvincesComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;

  constructor(
    private service: CityProvincesService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  // --------------------get-------------------
  all: any;

  getAll() {
    this.all = [];
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
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
  //obj
  addValue = {
    name: '',
    active: true,
  }

  //add
  addNew() {
    if (this.addValue.name === '') { alert('Hãy điền tên Tỉnh/Thành phố'); return }
    this.service.post(this.addValue).subscribe(r => {
      this.add.hide();
      this.getAll();
    })
  }

  // --------------------put-------------------

  //obj
  editValue = {
    id: '',
    name: '',
    active: true,
  }
  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.name = this.Selected.name;
      this.editValue.active = this.Selected.active;
    })
  }

  //add
  editSelected() {
    if (this.editValue.name === '') { alert('Hãy điền tên Tỉnh/Thành phố'); return }
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      this.edit.hide();
      this.getAll();
    })
  }
}

