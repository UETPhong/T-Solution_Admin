import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService, RolesService, JobTitlesService, JobPositionsService, DepartmentsService, CityProvincesService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  editor = ClassicEditor;

  roles: any;
  jobtitles: any;
  jobpositions: any;
  departments: any;
  city_province: any;
  now: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  constructor(
    private service: UsersService,
    private role: RolesService,
    private jobtitle: JobTitlesService,
    private jobposition: JobPositionsService,
    private dep: DepartmentsService,
    private city: CityProvincesService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.role.getAll().subscribe(r => { this.roles = r['data']; console.log('role', this.roles); });
    this.jobtitle.getAll().subscribe(r => { this.jobtitles = r['data']['apiResult']; console.log('title', this.jobtitles); })
    this.jobposition.getAll().subscribe(r => { this.jobpositions = r['data']['apiResult']; console.log('position', this.jobpositions); })
    this.dep.getAll().subscribe(r => { this.departments = r['data']['apiResult']; console.log('dep', this.departments); })
    this.city.getAll().subscribe(r => { this.city_province = r['data']['apiResult']; console.log('dep', this.city_province); })
  }
  //handleFile  
  url: any = null;
  fileToUpload: File = null;
  handleFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);
      console.log('file', this.fileToUpload);
    }
  }
  // -------------------------get--------------------------

  all: any;
  getAll() {
    this.all = [];
    this.service.getAll().subscribe(r => { this.all = r['data']['apiResult']; console.log(this.all); })
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
    code: '',
    username: '',
    password: '123456',
    email: '',
    active: true,
    full_name: '',
    gender: '',
    birth_date: '',
    address: '',
    current_address: '',
    description: '',
    position_id: '',
    role_id: '',
    job_title_id: '',
    department_id: '',
    phone: '',
  }

  //add
  addNew() {
    if (this.addValue.username === '') { alert('Hãy nhập tên đăng nhập'); return }
    if (this.addValue.code === '') { alert('Hãy nhập code'); return }
    if (this.addValue.email === '') { alert('Hãy nhập email'); return }
    if (this.addValue.phone === '') { alert('Hãy nhập số điện thoại'); return }
    if (this.addValue.full_name === '') { alert('Hãy nhập họ và tên'); return }
    if (this.addValue.birth_date === '') { alert('Hãy nhập ngày sinh'); return }
    if (this.addValue.gender === '') { alert('Hãy nhập giới tính'); return }
    if (this.addValue.current_address === '') { alert('Hãy nhập địa chỉ hiện tại'); return }
    if (this.addValue.role_id === '') { alert('Hãy nhập phân quyền'); return }
    if (this.addValue.job_title_id === '') { alert('Hãy nhập chức danh'); return }
    if (this.addValue.position_id === '') { alert('Hãy nhập chức vụ'); return }
    if (this.addValue.department_id === '') { alert('Hãy nhập phòng ban'); return }
    if (this.addValue.address === '') { alert('Hãy nhập quê quán'); return }
    // if(this.addValue.description === ''){alert('Hãy nhập mô tả');return}

    this.service.post(this.addValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
      this.add.hide();
      this.getAll();
    })
  }

  // --------------------put-------------------
  //obj
  editValue = {
    id: '',
    code: '',
    username: '',
    salt: '',
    email: '',
    full_name: '',
    gender: '',
    birth_date: '',
    address: '',
    current_address: '',
    description: '',
    position_id: '',
    role_id: '',
    job_title_id: '',
    department_id: '',
    manager: '',
    login_count: '',
    active: true,
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
    phone: '',
  }
  //edit
  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data']['0'];
      this.Selected.birth_date = this.datePipe.transform(this.Selected.birth_date, 'yyyy-MM-dd');
      this.editValue.id = this.Selected.id;
      this.editValue.code = this.Selected.code;
      this.editValue.username = this.Selected.username;
      this.editValue.email = this.Selected.email;
      this.editValue.phone = this.Selected.phone;
      this.editValue.full_name = this.Selected.full_name;
      this.editValue.gender = this.Selected.gender;
      this.editValue.birth_date = this.Selected.birth_date;
      this.editValue.address = this.Selected.address;
      this.editValue.current_address = this.Selected.current_address;
      this.editValue.description = this.Selected.description;
      this.editValue.position_id = this.Selected.position_id;
      this.editValue.role_id = this.Selected.role_id;
      this.editValue.job_title_id = this.Selected.job_title_id;
      this.editValue.department_id = this.Selected.department_id;
    })
  }
  editSelected() {

    if (this.editValue.username === '') { alert('Hãy nhập tên đăng nhập'); return }
    if (this.editValue.code === '') { alert('Hãy nhập code'); return }
    if (this.editValue.email === '') { alert('Hãy nhập email') }
    if (this.editValue.phone === '') { alert('Hãy nhập số điện thoại'); return }
    if (this.editValue.full_name === '') { alert('Hãy nhập họ và tên'); return }
    if (this.editValue.birth_date === '') { alert('Hãy nhập ngày sinh'); return }
    if (this.editValue.gender === '') { alert('Hãy nhập giới tính'); return }
    if (this.editValue.current_address === '') { alert('Hãy nhập địa chỉ hiện tại'); return }
    if (this.editValue.role_id === '') { alert('Hãy nhập phân quyền'); return }
    if (this.editValue.job_title_id === '') { alert('Hãy nhập chức danh'); return }
    if (this.editValue.position_id === '') { alert('Hãy nhập chức vụ'); return }
    if (this.editValue.department_id === '') { alert('Hãy nhập phòng ban'); return }
    if (this.editValue.address === '') { alert('Hãy nhập quê quán'); return }
    // if(this.editValue.description === ''){alert('Hãy nhập mô tả');return}

    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
        })
      }
      this.edit.hide();
      this.getAll();
    })
  }
}

