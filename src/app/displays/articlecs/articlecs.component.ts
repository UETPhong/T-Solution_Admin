import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-articlecs',
  templateUrl: './articlecs.component.html',
  styleUrls: ['./articlecs.component.css']
})
export class ArticlecsComponent implements OnInit {

  constructor(
    private service: ArticlesService,
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
    this.service.getArticles().subscribe(r => {
      this.all = r['data'];
      console.log(this.all);
    })
    this.url = null;
  }

  getById(id) {
    this.Selected = [];
    this.service.getArticleById(id).subscribe(r => {
      this.Selected = r['data'];
      console.log(this.Selected);
    })
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteArticleId(id).subscribe(r => {
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
      content: '',
    })
  }

  //obj
  addValue = {
    // id: '',
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    size: '',
    path: '',
    ext: '',
    active: true,
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  //add
  addNew() {
    this.addValue.title = this.addFrom.value.title;
    this.addValue.description = this.addFrom.value.description;
    this.addValue.content = this.addFrom.value.content;
    // this.addValue.active = true;

    this.service.postArticle(this.addValue).subscribe(r => {
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
      description: '',
      content: '',
    })
  }
  //obj
  editValue = {
    id: '',
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    size: '',
    path: '',
    ext: '',
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
    this.editValue.content = this.Selected.content;
    this.editValue.thumbnail = this.Selected.thumbnail;
    this.editValue.size = this.Selected.size;
    this.editValue.path = this.Selected.path;
    this.editValue.ext = this.Selected.ext;
    this.editValue.id = this.Selected.id;
    if (this.editFrom.value.title) { this.editValue.title = this.editFrom.value.title; }
    if (this.editFrom.value.description) { this.editValue.description = this.editFrom.value.description; }
    if (this.editFrom.value.content) { this.editValue.content = this.editFrom.value.content; }
    console.log('value', this.editValue);

    this.service.putArticle(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
        })
      }
      this.getAll();
    })
  }
}

