import { Component, OnInit } from '@angular/core';
import { RecruitmentsService } from '../../services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recruitments',
  templateUrl: './recruitments.component.html',
  styleUrls: ['./recruitments.component.css']
})
export class RecruitmentsComponent implements OnInit {

  constructor(
    private service: RecruitmentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getAll();
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
  // --------------------get-------------------
  all: any;
  Selected: any;

  getAll() {
    this.all = [];
    this.service.getRecruitments().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
    this.url = null;
    this.Selected = null;
  }

  getById(id) {
    this.Selected = [];
    this.service.getRecruitmentById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log('selected',this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteRecruitmentId(id).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }


  // --------------------post-------------------
  //buildForm
  addFrom: FormGroup;
  buildFromAdd() {
    this.addFrom = this.fb.group({
      title: '',
      description: '',
      work_required: '',
      entitlements: '',
      experience_required: '',
      education: '',
      job_level: '',
      form_of_work: '',
      contact: '',
      salary: '',
      quantity: '',
      valid_date: '',
      career_id: '',
      city_province_id: '',
    })
  }

  //obj
  addValue = {
    // id: '',
    title: '',
    description: '',
    work_required: '',
    entitlements: '',
    experience_required: '',
    education: '',
    job_level: '',
    form_of_work: '',
    contact: '',
    salary: '',
    quantity: '',
    valid_date: '',
    career_id: '',
    city_province_id: '',
    active: true,
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  //add
  addNew() {
    this.addValue.title = this.addFrom.value.title;                             //Tiêu đề
    this.addValue.description = this.addFrom.value.description;                 //Nội dung
    this.addValue.work_required = this.addFrom.value.work_required;             //Yêu cầu công việc
    this.addValue.entitlements = this.addFrom.value.entitlements;               //Quyền lợi
    this.addValue.experience_required = this.addFrom.value.experience_required; //Yêu cầu kinh nghiệm
    this.addValue.education = this.addFrom.value.education;                     //Học vấn
    this.addValue.job_level = this.addFrom.value.job_level;                     //Vị trí làm việc
    this.addValue.form_of_work = this.addFrom.value.form_of_work;               //Hình thức làm việc
    this.addValue.contact = this.addFrom.value.contact;                         //Liên hệ
    this.addValue.salary = this.addFrom.value.salary;                           //Lương
    this.addValue.quantity = this.addFrom.value.quantity;                       //Số lượng
    this.addValue.valid_date = this.addFrom.value.valid_date;                   // Ngày hết hạn
    this.addValue.career_id = this.addFrom.value.career_id;                     // Ngày hết hạn
    this.addValue.city_province_id = this.addFrom.value.city_province_id;       //Thành phố
    console.log(this.addValue);

    this.service.postRecruitment(this.addValue).subscribe(r => {
      this.getAll();
    })
  }

  // --------------------put-------------------
  //buildForm
  editFrom: FormGroup;
  buildFromEdit() {
    this.editFrom = this.fb.group({
      title: null,
      description: null,
      work_required: null,
      entitlements: null,
      experience_required: null,
      education: null,
      job_level: null,
      form_of_work: null,
      contact: null,
      salary: null,
      quantity: null,
      valid_date: null,
      career_id: null,
      city_province_id: null,
    })
  }
  //obj
  editValue = {
    id: '',
    title: '',
    description: '',
    work_required: '',
    entitlements: '',
    experience_required: '',
    education: '',
    job_level: '',
    form_of_work: '',
    contact: '',
    salary: '',
    quantity: null,
    valid_date: '',
    career_id: '',
    city_province_id: '',
    active: true,
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }
  //edit
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.title = this.Selected.title;
    this.editValue.description = this.Selected.description;
    this.editValue.work_required = this.Selected.work_required;
    this.editValue.entitlements = this.Selected.entitlements;
    this.editValue.experience_required = this.Selected.experience_required;
    this.editValue.education = this.Selected.education;
    this.editValue.job_level = this.Selected.job_level;
    this.editValue.form_of_work = this.Selected.form_of_work;
    this.editValue.contact = this.Selected.contact;
    this.editValue.salary = this.Selected.salary;
    this.editValue.quantity = this.Selected.quantity;
    this.editValue.valid_date = this.Selected.valid_date;
    this.editValue.career_id = this.Selected.career_id;
    this.editValue.city_province_id = this.Selected.city_province_id;
    if (this.editFrom.value.title) { this.editValue.title = this.editFrom.value.title; }
    if (this.editFrom.value.description) { this.editValue.description = this.editFrom.value.description; }
    if (this.editFrom.value.work_required) { this.editValue.work_required = this.editFrom.value.work_required; }
    if (this.editFrom.value.entitlements) { this.editValue.entitlements = this.editFrom.value.entitlements; }
    if (this.editFrom.value.experience_required) { this.editValue.experience_required = this.editFrom.value.experience_required; }
    if (this.editFrom.value.education) { this.editValue.education = this.editFrom.value.education; }
    if (this.editFrom.value.job_level) { this.editValue.job_level = this.editFrom.value.job_level; }
    if (this.editFrom.value.form_of_work) { this.editValue.form_of_work = this.editFrom.value.form_of_work; }
    if (this.editFrom.value.contact) { this.editValue.contact = this.editFrom.value.contact; }
    if (this.editFrom.value.salary) { this.editValue.salary = this.editFrom.value.salary; }
    if (this.editFrom.value.quantity) { this.editValue.quantity = this.editFrom.value.quantity; }
    if (this.editFrom.value.valid_date) { this.editValue.valid_date = this.editFrom.value.valid_date; }
    if (this.editFrom.value.career_id) { this.editValue.career_id = this.editFrom.value.career_id; }
    if (this.editFrom.value.city_province_id) { this.editValue.city_province_id = this.editFrom.value.city_province_id; }
    console.log('value', this.editValue);
    console.log('form', this.editFrom);


    this.service.putRecruitment(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);      
      this.getAll();
    })
  }
}

