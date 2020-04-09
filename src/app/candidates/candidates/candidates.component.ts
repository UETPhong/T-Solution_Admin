import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatesService, RecruitmentsService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

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
    this.getAll();
    this.recruitment.getAll().subscribe(r => this.recruitments = r['data']['apiResult'])
  }


  //CV
  localLink = 'http://14.231.191.91:44351/';
  link: string;
  ShowCV(path) {
    this.link = this.localLink.concat(path.slice(2).toString());
    window.open(this.link, "_blank");
  }

  //handleFileUpload
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

  submitted = false;
  getAll() {
    this.all = [];
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
    this.url = null;
  }

  // --------------------delete-------------------
  delete(id) {
    this.service.deleteSelected(id).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }


  // --------------------post-------------------
  //handleModal
  @ViewChild('add') public add: ModalDirective;

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
    // Kiểm tra đầy đủ thông tin, thông báo lỗi
    this.submitted = true;
    if (this.addValue.full_name === '') { alert('Hãy điền họ tên của bạn'); return }
    if (this.addValue.email === '') { alert('Hãy điền email của bạn'); return }
    if (this.addValue.number === '') { alert('Hãy điền số điện thoại của bạn'); return }
    if (this.addValue.address === '') { alert('Hãy chọn vị trí ứng tuyển của bạn'); return }
    if (this.fileToUpload === null) { alert('Vui lòng chọn file CV của bạn!'); return; }
    if (this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }
    //Gửi dữ liệu mảng lên server
    this.service.post(this.addValue).subscribe(r => {
      //UploadFile
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.postFile(r['data']['id'], formData).subscribe(r => {
        })
      }
    })
    this.add.hide();
    location.reload();
  }

  // --------------------put-------------------
  //handleModal
  @ViewChild('edit') public edit: ModalDirective;
  //obj
  editValue = {
    id: '',
    full_name: '',
    email: '',
    number: '',
    address: '',//vị trí ứng tuyển
    active: true,
    path: '',
    ext: '',
    size: '',
  }
  //Get Selected 
  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      this.editValue.id = this.Selected.id;
      this.editValue.full_name = this.Selected.full_name;
      this.editValue.email = this.Selected.email;
      this.editValue.number = this.Selected.number;
      this.editValue.address = this.Selected.address;
      this.editValue.path = this.Selected.path;
      this.editValue.ext = this.Selected.ext;
      this.editValue.size = this.Selected.size;
    });
  }
  //edit
  editSelected() {
    // Kiểm tra đầy đủ thông tin, thông báo lỗi
    this.submitted = true;
    if (this.editValue.full_name === '') { alert('Hãy điền họ tên của bạn'); return }
    if (this.editValue.email === '') { alert('Hãy điền email của bạn'); return }
    if (this.editValue.number === '') { alert('Hãy điền số điện thoại của bạn'); return }
    if (this.editValue.address === '') { alert('Hãy chọn vị trí ứng tuyển của bạn'); return }
    if (this.fileToUpload !== null && this.fileToUpload.size > 2100000) { alert('File quá lớn!'); return; }

    this.service.putSelected(this.Selected.id, this.editValue).subscribe(r => {
      if (this.fileToUpload !== null) {
        const formData: FormData = new FormData();
        formData.append('key', this.fileToUpload, this.fileToUpload.name)
        this.service.putFile(this.Selected.id, formData).subscribe(r => {
        })
      }
    })
    this.edit.hide();
    location.reload();

  }
}

