import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentsService } from '../../services'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;


  constructor(
    private service: DepartmentsService,
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
    parent_id: '',
    active: true,
  }

  //add
  addNew() {
    if (this.addValue.name === '') { alert('Hãy điền tên phòng ban!'); return }
    // if(this.addValue.parent_id === ''){alert('Hãy chọn phòng ban trực thuộc!'); return}
    console.log(this.addValue);
    this.service.post(this.addValue).subscribe(r => { this.add.hide(); this.getAll() })
  }

  // --------------------put-------------------
  //obj
  editValue = {
    id: '',
    name: '',
    parent_id: '',
    active: true,
  }
  //getSelected
  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.name = this.Selected.name;
      this.editValue.parent_id = this.Selected.parent_id;
      this.editValue.active = this.Selected.active;
    })
  }


  //edit
  editSelected() {
    if (this.editValue.name === '') { alert('Hãy điền tên phòng ban!'); return }
    // if(this.editValue.parent_id === ''){alert('Hãy chọn phòng ban trực thuộc!'); return}
    console.log(this.editValue);
    this.service.put(this.Selected.id, this.editValue).subscribe(r => { this.edit.hide(); this.getAll(); })
  }
}
