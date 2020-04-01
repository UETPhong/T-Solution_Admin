import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  constructor(
    private service: BannersService,
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
    this.service.getBanners().subscribe(r => {
      this.all = r['data'];
      console.log(this.all);
    })
    this.url = null;
    this.Selected = null;
  }

  getById(id) {
    this.Selected = [];
    this.service.getBannerById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteBannerId(id).subscribe(r => {
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
      slogan: '',
    })
  }

  //obj
  addValue = {
    // id: '',
    title: '',
    slogan: '',
    img_name: '',
    path: '',
    ext: '',
    size: '',
    original: '',
    active: true,
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  //add
  addNew() {
    this.addValue.title = this.addFrom.value.title;
    this.addValue.slogan = this.addFrom.value.slogan;
    this.service.postBanner(this.addValue).subscribe(r => {
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
      title: '',
      slogan: '',
    })
  }
  //obj
  editValue = {
    id: '',
    title: '',
    slogan: '',
    img_name: '',
    path: '',
    ext: '',
    size: '',
    original: '',
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
    this.editValue.slogan = this.Selected.slogan;
    this.editValue.img_name = this.Selected.img_name;
    this.editValue.path = this.Selected.path;
    this.editValue.ext = this.Selected.ext;
    this.editValue.size = this.Selected.size;
    this.editValue.original = this.Selected.original;
    if (this.editFrom.value.title) { this.editValue.title = this.editFrom.value.title; }
    if (this.editFrom.value.slogan) { this.editValue.slogan = this.editFrom.value.slogan; }
    console.log('value', this.editValue);

    this.service.putBanner(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
          console.log('SUCCESS',r);
          
        })
      }
      this.getAll();
    })
  }
}

