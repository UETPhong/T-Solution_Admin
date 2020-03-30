import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService, RolesService, JobTitlesService, JobPositionsService, DepartmentsService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit {

  // x = 100000;
  // result = (this.x < 1000) ? "nhỏ hơn 1000" :  "lớn hơn hoặc bằng 1000";
  // test: boolean = true;


  users: any;
  userSelected: any;
  roles: any;
  jobtitles: any;
  jobpositions: any;
  departments: any;


  constructor(
    private http: HttpClient,
    private user: UsersService,
    private role: RolesService,
    private jobtitle: JobTitlesService,
    private jobposition: JobPositionsService,
    private dep: DepartmentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getJobTitles();
    this.getJobPositions();
    this.getDepartments();
    this.buildFormPut();
    this.buildFormPost();
  }

  // -------------------------get--------------------------

  getUsers() {
    this.users = [];
    this.user.getUsers().subscribe(r => {
      this.users = r['data']['apiResult'];
      console.log(this.users);
    })
  }

  getUserById(id) {
    this.userSelected = [];
    this.user.getUserById(id).subscribe(r => {
      this.userSelected = r['data']['0'];
      console.log(this.userSelected);
    })
  }

  getRoles() {
    this.roles = [];
    this.role.getRoles().subscribe(r => {
      this.roles = r['data'];
      console.log('role', this.roles);
    })
  }

  getJobTitles() {
    this.jobtitles = [];
    this.jobtitle.getJobTitles().subscribe(r => {
      this.jobtitles = r['data']['apiResult'];
      console.log('title', this.jobtitles);
    })
  }

  getJobPositions() {
    this.jobpositions = [];
    this.jobposition.getPositions().subscribe(r => {
      this.jobpositions = r['data']['apiResult'];
      console.log('position', this.jobpositions);
    })
  }

  getDepartments() {
    this.departments = [];
    this.dep.getDepartments().subscribe(r => {
      this.departments = r['data']['apiResult'];
      console.log('dep', this.departments);
    })
  }
  // -------------------------put--------------------------
  // form put
  putForm: FormGroup;
  putValue: any;
  get putVal() { return this.putForm.controls };

  buildFormPut() {
    this.putForm = this.fb.group({
      // username:'',
      put_code: '',
      put_role_id: '',
      put_active: '',
      put_full_name: '',
      put_email: '',
      put_birth_date: '',
      put_gender: '',
      put_address: '',
      put_current_address: '',
      // put_number:'',
      put_position_id: '',
      put_job_title_id: '',
      put_department_id: '',
      put_description: '',
    })
  }

  putUserById(id) {

    const options = {};
    this.putValue = this.putForm.value;

    if (this.putValue.put_code) {
      options['code'] = this.putValue.put_code;
    }

    if (this.putValue.put_role_id) {
      options['role_id'] = this.putValue.put_role_id;
    }

    if (this.putValue.put_active) {
      options['active'] = this.putValue.put_active;
    }

    if (this.putValue.put_full_name) {
      options['full_name'] = this.putValue.put_full_name;
    }

    if (this.putValue.put_email) {
      options['email'] = this.putValue.put_email;
    }

    if (this.putValue.put_birth_date) {
      options['birth_date'] = this.putValue.put_birth_date;
    }

    if (this.putValue.put_gender) {
      options['gender'] = this.putValue.put_gender;
    }

    if (this.putValue.put_address) {
      options['address'] = this.putValue.put_address;
    }

    if (this.putValue.put_current_address) {
      options['current_address'] = this.putValue.put_current_address;
    }

    if (this.putValue.put_position_id) {
      options['position_id'] = this.putValue.put_position_id;
    }

    if (this.putValue.put_jop_title_id) {
      options['jop_title_id'] = this.putValue.put_jop_title_id;
    }

    if (this.putValue.put_department_id) {
      options['department_id'] = this.putValue.put_department_id;
    }

    if (this.putValue.put_description) {
      options['description'] = this.putValue.put_description;
    }
    console.log(id);
    console.log(options);

    this.http.put(`http://localhost:1234/api/users/${id}`, options).subscribe(r => console.log('hello'))



    // if(this.putValue.put_number){
    //   options['']=this.putValue.put_number;
    // }

    // this.user.putUserById(id, options)
  }

  // -------------------------post--------------------------
  // form post
  postForm: FormGroup;
  postValue: any;
  // get postVal() { return this.postForm.controls };

  buildFormPost() {
    this.postForm = this.fb.group({
      post_username: '',
      post_code: '',
      post_role_id: '',
      post_active: '',
      post_full_name: '',
      post_email: '',
      post_birth_date: '',
      post_gender: '',
      post_address: '',
      post_current_address: '',
      // post_number:'',
      post_position_id: '',
      post_job_title_id: '',
      post_department_id: '',
      post_description: '',
    })
  }
  postUserById(id) {

    // const options = {};
    // this.postValue = this.postForm.value;

    // if (this.postValue.post_username) {
    //   options['username'] = this.postValue.post_username;
    // }

    // if (this.postValue.post_code) {
    //   options['code'] = this.postValue.post_code;
    // }

    // if (this.postValue.post_role_id) {
    //   options['role_id'] = this.postValue.post_role_id;
    // }

    // if (this.postValue.post_active) {
    //   options['active'] = this.postValue.post_active;
    // }

    // if (this.postValue.post_full_name) {
    //   options['full_name'] = this.postValue.post_full_name;
    // }

    // if (this.postValue.post_email) {
    //   options['email'] = this.postValue.post_email;
    // }

    // if (this.postValue.post_birth_date) {
    //   options['birth_date'] = this.postValue.post_birth_date;
    // }

    // if (this.postValue.post_gender) {
    //   options['gender'] = this.postValue.post_gender;
    // }

    // if (this.postValue.post_address) {
    //   options['address'] = this.postValue.post_address;
    // }

    // if (this.postValue.post_current_address) {
    //   options['current_address'] = this.postValue.post_current_address;
    // }

    // if (this.postValue.post_position_id) {
    //   options['position_id'] = this.postValue.post_position_id;
    // }

    // if (this.postValue.post_jop_title_id) {
    //   options['jop_title_id'] = this.postValue.post_jop_title_id;
    // }

    // if (this.postValue.post_department_id) {
    //   options['department_id'] = this.postValue.post_department_id;
    // }

    // if (this.postValue.post_description) {
    //   options['description'] = this.postValue.post_description;
    // }

    console.log(this.postForm.value);


    // if(this.putValue.put_number){
    //   options['']=this.putValue.put_number;
    // }

    // this.user.postUser(options).subscribe(r => console.log('post pending'))
  }
  // -------------------------delete--------------------------

  deleteUserById(id) {
    this.user.deleteUserById(id);
  }

}
