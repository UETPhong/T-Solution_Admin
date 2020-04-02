import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor(
    private service: CandidatesService,
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
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
    this.url = null;
    this.Selected = null;
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
    this.service.deleteSelected(id).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }


  // --------------------post-------------------
  //buildForm
  addFrom: FormGroup;
  buildFromAdd() {
    this.addFrom = this.fb.group({
      full_name: '',
      gender: '',
      email: '',
      number: '',
      address: '',
      education: '',
      job_level: '',
      time_of_work: '',
      age: '',
    })
  }

  //obj
  addValue = {
    // id: '',
    full_name: '',
    gender: '',
    email: '',
    number: '',
    address: '',
    education: '',
    job_level: '',
    time_of_work: '',
    path: '',
    ext: '',
    size: '',
    age: '',
    active: true,
    // created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  //add
  addNew() {
    this.addValue.full_name = this.addFrom.value.full_name;
    this.addValue.gender = this.addFrom.value.gender;
    this.addValue.email = this.addFrom.value.email;
    this.addValue.number = this.addFrom.value.number;
    this.addValue.address = this.addFrom.value.address;
    this.addValue.education = this.addFrom.value.education;
    this.addValue.job_level = this.addFrom.value.job_level;
    this.addValue.time_of_work = this.addFrom.value.time_of_work;
    this.addValue.age = this.addFrom.value.age;
    this.service.post(this.addValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
      this.getAll();
    })
  }

  // --------------------put-------------------
  //buildForm
  editFrom: FormGroup;
  buildFromEdit() {
    this.editFrom = this.fb.group({
      full_name: '',
      gender: '',
      email: '',
      number: '',
      address: '',
      education: '',
      job_level: '',
      time_of_work: '',
      age: '',
    })
  }
  //obj
  editValue = {
    id: '',
    full_name: '',
    gender: '',
    email: '',
    number: '',
    address: '',
    education: '',
    job_level: '',
    time_of_work: '',
    path: '',
    ext: '',
    size: '',
    age: '',
    active: true,
    // created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }
  //edit
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.full_name = this.Selected.full_name;
    this.editValue.gender = this.Selected.gender;
    this.editValue.email = this.Selected.email;
    this.editValue.number = this.Selected.number;
    this.editValue.address = this.Selected.address;
    this.editValue.education = this.Selected.education;
    this.editValue.job_level = this.Selected.job_level;
    this.editValue.time_of_work = this.Selected.time_of_work;
    this.editValue.path = this.Selected.path;
    this.editValue.ext = this.Selected.ext;
    this.editValue.size = this.Selected.size;
    this.editValue.age = this.Selected.age;
    if (this.editFrom.value.full_name) { this.editValue.full_name = this.editFrom.value.full_name; }
    if (this.editFrom.value.gender) { this.editValue.gender = this.editFrom.value.gender; }
    if (this.editFrom.value.email) { this.editValue.email = this.editFrom.value.email; }
    if (this.editFrom.value.number) { this.editValue.number = this.editFrom.value.number; }
    if (this.editFrom.value.address) { this.editValue.address = this.editFrom.value.address; }
    if (this.editFrom.value.education) { this.editValue.education = this.editFrom.value.education; }
    if (this.editFrom.value.job_level) { this.editValue.job_level = this.editFrom.value.job_level; }
    if (this.editFrom.value.time_of_work) { this.editValue.time_of_work = this.editFrom.value.time_of_work; }
    if (this.editFrom.value.age) { this.editValue.age = this.editFrom.value.age; }
    console.log('value', this.editValue);

    this.service.putSelected(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
          console.log('SUCCESS', r);

        })
      }
      this.getAll();
    })
  }
}

