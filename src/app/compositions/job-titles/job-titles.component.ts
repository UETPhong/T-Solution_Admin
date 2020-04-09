import { Component, OnInit, ViewChild } from '@angular/core';
import { JobTitlesService } from '../../services'
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.css']
})
export class JobTitlesComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;

  constructor(
    private service: JobTitlesService,
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
    if (this.addValue.name === '') { alert('Hãy điền tên chức danh'); return }
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
    if (this.editValue.name === '') { alert('Hãy điền tên chức danh'); return }
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      this.edit.hide();
      this.getAll();
    })
  }
}

