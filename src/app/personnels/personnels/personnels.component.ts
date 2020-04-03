import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService, RolesService, JobTitlesService, JobPositionsService, DepartmentsService, CityProvincesService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit {
  all: any;
  Selected: any;
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
    this.buildFromAdd();
    this.buildFromEdit();
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

  getAll() {
    this.all = [];
    this.service.getAll().subscribe(r => { this.all = r['data']['apiResult']; console.log(this.all); })
  }

  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data']['0'];
      this.Selected.birth_date = this.datePipe.transform(this.Selected.birth_date, 'yyyy-MM-dd');
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
      code: '',
      username: '',
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
      phone: '',
    })
  }

  //obj
  addValue = {
    // id: '',
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
    this.addValue.code = this.addFrom.value.code;
    this.addValue.username = this.addFrom.value.username;
    this.addValue.email = this.addFrom.value.email;
    this.addValue.full_name = this.addFrom.value.full_name;
    this.addValue.gender = this.addFrom.value.gender;
    this.addValue.birth_date = this.addFrom.value.birth_date;
    this.addValue.address = this.addFrom.value.address;
    this.addValue.current_address = this.addFrom.value.current_address;
    this.addValue.description = this.addFrom.value.description;
    this.addValue.position_id = this.addFrom.value.position_id;
    this.addValue.role_id = this.addFrom.value.role_id;
    this.addValue.job_title_id = this.addFrom.value.job_title_id;
    this.addValue.department_id = this.addFrom.value.department_id;
    this.addValue.phone = this.addFrom.value.phone;
    console.log('value', this.addValue);
    console.log(this.addFrom.value);

    this.service.post(this.addValue).subscribe(r => {
      console.log('post', r);
      // if (this.fileToUpload !== null) {
      //   const formData: FormData = new FormData();
      //   formData.append('key', this.fileToUpload, this.fileToUpload.name)
      //   this.service.postFile(r['data']['id'], formData).subscribe(r => {
      //   })
      // }
      this.getAll();
    })
  }

  // --------------------put-------------------
  //buildForm
  editFrom: FormGroup;
  buildFromEdit() {
    this.editFrom = this.fb.group({
      code: '',
      username: '',
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
      phone: '',
    })
  }
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
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.code = this.Selected.code;
    this.editValue.username = this.Selected.username;
    this.editValue.email = this.Selected.email;
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
    this.editValue.phone = this.Selected.phone;
    if (this.editFrom.value.code) { this.editValue.code = this.editFrom.value.code; }
    if (this.editFrom.value.username) { this.editValue.username = this.editFrom.value.username; }
    if (this.editFrom.value.email) { this.editValue.email = this.editFrom.value.email; }
    if (this.editFrom.value.full_name) { this.editValue.full_name = this.editFrom.value.full_name; }
    if (this.editFrom.value.gender) { this.editValue.gender = this.editFrom.value.gender; }
    if (this.editFrom.value.birth_date) { this.editValue.birth_date = this.editFrom.value.birth_date; }
    if (this.editFrom.value.address) { this.editValue.address = this.editFrom.value.address; }
    if (this.editFrom.value.current_address) { this.editValue.current_address = this.editFrom.value.current_address; }
    if (this.editFrom.value.description) { this.editValue.description = this.editFrom.value.description; }
    if (this.editFrom.value.position_id) { this.editValue.position_id = this.editFrom.value.position_id; }
    if (this.editFrom.value.role_id) { this.editValue.role_id = this.editFrom.value.role_id; }
    if (this.editFrom.value.job_title_id) { this.editValue.job_title_id = this.editFrom.value.job_title_id; }
    if (this.editFrom.value.department_id) { this.editValue.department_id = this.editFrom.value.department_id; }
    if (this.editFrom.value.phone) { this.editValue.phone = this.editFrom.value.phone; }
    console.log('value', this.editValue);

    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      // if (this.fileToUpload !== null) {
      //   const formData: FormData = new FormData();
      //   formData.append('key', this.fileToUpload, this.fileToUpload.name)
      //   this.service.putFile(this.Selected.id, formData).subscribe(r => {
      //     console.log('SUCCESS', r);
      //   })
      // }
      this.getAll();
      this.Selected = [];
    })
  }
}

