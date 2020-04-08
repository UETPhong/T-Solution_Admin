import { Component, OnInit } from '@angular/core';
import { CandidatesService, RecruitmentsService } from '../../services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { strict } from 'assert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  constructor(
    private service: CandidatesService,
    private recruitment: RecruitmentsService,
    private fb: FormBuilder,
  ) { }

  recruitments: any;

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getAll();
    this.recruitment.getAll().subscribe(r => this.recruitments = r['data']['apiResult'])
  }
  //==========================

  ShowCV(path) {
    this.link = this.localLink.concat(path.slice(2).toString());
    window.open(this.link, "_blank");
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
  localLink = 'http://14.231.191.91:44351/';
  link: string;

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
      email: '',
      number: '',
      address: '',//vị trí ứng tuyển
    })
  }

  //obj
  addValue = {
    full_name: '',
    email: '',
    number: '',
    address: '',//vị trí ứng tuyển
    active: true,
  }

  //add
  addNew() {
    this.addValue.full_name = this.addFrom.value.full_name;
    this.addValue.email = this.addFrom.value.email;
    this.addValue.number = this.addFrom.value.number;
    this.addValue.address = this.addFrom.value.address;
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
      email: '',
      number: '',
      address: '',//vị trí ứng tuyển
    })
  }
  //obj
  editValue = {
    id: '',
    full_name: '',
    email: '',
    number: '',
    address: '',//vị trí ứng tuyển
    active: true,
    path:'',
    ext:'',
    size:'',
  }
  //edit
  editSelected() {
    this.editValue.id = this.Selected.id;
    this.editValue.full_name = this.Selected.full_name;
    this.editValue.email = this.Selected.email;
    this.editValue.number = this.Selected.number;
    this.editValue.address = this.Selected.address;
    this.editValue.path = this.Selected.path;
    this.editValue.ext = this.Selected.ext;
    this.editValue.size = this.Selected.size;
    if (this.editFrom.value.full_name) { this.editValue.full_name = this.editFrom.value.full_name; }
    if (this.editFrom.value.email) { this.editValue.email = this.editFrom.value.email; }
    if (this.editFrom.value.number) { this.editValue.number = this.editFrom.value.number; }
    if (this.editFrom.value.address) { this.editValue.address = this.editFrom.value.address; }
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

