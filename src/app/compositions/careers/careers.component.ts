import { Component, OnInit, ViewChild } from '@angular/core';
import { CareersService } from '../../services'
import { Local } from 'protractor/built/driverProviders';
import { ModalDirective } from 'ngx-bootstrap';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;



  constructor(
    private service: CareersService,
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
      this.getAll()
    });
  }
  // --------------------post-------------------
  addValue = {
    name: '',
    active: true,
  }

  addNew() {
    if (this.addValue.name === '') { alert('Hãy nhập tên ngành nghề!'); return }
    this.service.post(this.addValue).subscribe(r => {
      this.add.hide();
      this.getAll();
      // location.reload();
    });
  }
  // --------------------put-------------------
  Selected: any;
  getSelected(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.name = this.Selected.name;
    })
  }
  editValue = {
    id: '',
    name: '',
    active: true,
  }
  editSelected() {
    if (this.editValue.name === '') { alert('Hãy nhập tên ngành nghề!'); return }
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      this.edit.hide();
      this.getAll();
      // location.reload();
    })
  }
}
