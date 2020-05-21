import { Component, OnInit, ViewChild } from '@angular/core';
import { BannersService } from '../../services';
import { ModalDirective } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  editor = ClassicEditor;


  constructor(
    private service: BannersService,
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
    }
  }
  // --------------------get-------------------
  all: any;
  getAll() {
    this.all = [];
    this.service.getBanners().subscribe(r => {
      this.all = r['data'];
      console.log(this.all);
    })
    this.url = null;
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteBannerId(id).subscribe(r => {
      this.getAll();
    })
  }
  // --------------------post-------------------

  //obj
  addValue = {
    title: '',
    slogan: '',
    img_name: '',
    path: '',
    ext: '',
    size: '',
    original: '',
    active: true,
  }

  //add
  addNew() {
    if (this.addValue.title === '') { alert('Hãy nhập tiêu đề'); return }
    if (this.addValue.slogan === '') { alert('Hãy nhập slogan'); return }
    if (this.fileToUpload === null) { alert('Vui lòng chọn file CV của bạn!'); return; }
    if (this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.service.postBanner(this.addValue).subscribe(r => {
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
  //GetSelected
  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getBannerById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.title = this.Selected.title;
      this.editValue.slogan = this.Selected.slogan;
      this.editValue.img_name = this.Selected.img_name;
      this.editValue.path = this.Selected.path;
      this.editValue.ext = this.Selected.ext;
      this.editValue.size = this.Selected.size;
      this.editValue.original = this.Selected.original;
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
  }
  //edit
  editSelected() {

    if (this.editValue.title === '') { alert('Hãy nhập tiêu đề'); return }
    if (this.editValue.slogan === '') { alert('Hãy nhập slogan'); return }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }
    this.service.putBanner(this.Selected.id, this.editValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
          console.log('SUCCESS', r);
        })
      }
      this.edit.hide();
      this.getAll();
    })
  }
}

