import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from '../../services';
import { ModalDirective } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-articlecs',
  templateUrl: './articlecs.component.html',
  styleUrls: ['./articlecs.component.css']
})
export class ArticlecsComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  editor = ClassicEditor;


  constructor(
    private service: ArticlesService,
  ) { }

  ngOnInit(): void {
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
  getAll() {
    this.all = [];
    this.service.getArticles().subscribe(r => {
      this.all = r['data'];
      console.log(this.all);
    })
    this.url = null;
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
  }

  //add
  addNew() {
    if (this.addValue.title === '') { alert('Hãy nhập tiêu đề'); return }
    if (this.addValue.description === '') { alert('Hãy nhập mô tả'); return }
    if (this.addValue.content === '') { alert('Hãy nhập nội dung'); return }
    if (this.fileToUpload === null) { alert('Vui lòng chọn file CV của bạn!'); return; }
    if (this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }
    this.service.postArticle(this.addValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
      this.getAll();
      this.add.hide();
    })
  }

  // --------------------put-------------------
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

  }

  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getArticleById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.title = this.Selected.title;
      this.editValue.description = this.Selected.description;
      this.editValue.content = this.Selected.content;
      this.editValue.thumbnail = this.Selected.thumbnail;
      this.editValue.size = this.Selected.size;
      this.editValue.path = this.Selected.path;
      this.editValue.ext = this.Selected.ext;
      this.editValue.id = this.Selected.id;
    })
  }

  //edit
  editSelected() {
    if (this.editValue.title === '') { alert('Hãy nhập tiêu đề'); return }
    if (this.editValue.description === '') { alert('Hãy nhập mô tả'); return }
    if (this.editValue.content === '') { alert('Hãy nhập nội dung'); return }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }
    this.service.putArticle(this.Selected.id, this.editValue).subscribe(r => {
      console.log(r);
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

