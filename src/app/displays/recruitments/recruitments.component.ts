import { Component, OnInit, ViewChild } from '@angular/core';
import { RecruitmentsService, CityProvincesService, JobPositionsService, JobTitlesService, CareersService } from '../../services';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-recruitments',
  templateUrl: './recruitments.component.html',
  styleUrls: ['./recruitments.component.css']
})

export class RecruitmentsComponent implements OnInit {
  @ViewChild('add') public add: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  editor = ClassicEditor;

  constructor(
    private service: RecruitmentsService,
    private career: CareersService,
    private jobtitle: JobTitlesService,
    private jobposition: JobPositionsService,
    private city: CityProvincesService,
    private datePipe: DatePipe,
  ) { }

  jobtitles: any;
  jobpositions: any;
  city_province: any;
  careers: any;
  now: string = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

  ngOnInit(): void {
    this.jobtitle.getAll().subscribe(r => { this.jobtitles = r['data']['apiResult']; console.log('title', this.jobtitles); })
    this.career.getAll().subscribe(r => { this.careers = r['data']['apiResult']; console.log('title', this.careers); })
    this.jobposition.getAll().subscribe(r => { this.jobpositions = r['data']['apiResult']; console.log('position', this.jobpositions); })
    this.city.getAll().subscribe(r => { this.city_province = r['data']['apiResult']; console.log('dep', this.city_province); })
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
    this.service.getAll().subscribe(r => {
      this.all = r['data']['apiResult'];
      console.log(this.all);
    })
    this.url = null;
    this.Selected = null;
  }


  // --------------------delete-------------------
  delete(id) {
    this.service.delete(id).subscribe(r => {
      console.log(r);
      this.getAll();
    })
  }


  // --------------------post-------------------

  //obj
  addValue = {
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
  }

  //add
  addNew() {
    if (this.addValue.title === '') { alert('Hãy điền tiêu đề'); return }
    if (this.addValue.experience_required === '') { alert('Hãy điền yêu cầu kinh nghiệm'); return }
    if (this.addValue.education === '') { alert('Hãy điền trình độ học vấn'); return }
    if (this.addValue.job_level === '') { alert('Hãy điền chức danh làm việc'); return }
    if (this.addValue.form_of_work === '') { alert('Hãy điền chức vụ làm việc'); return }
    if (this.addValue.career_id === '') { alert('Hãy điền loại nghành nghề'); return }
    if (this.addValue.city_province_id === '') { alert('Hãy điền tỉnh thành phố'); return }
    if (this.addValue.salary === '') { alert('Hãy điền mức lương'); return }
    if (this.addValue.valid_date === '') { alert('Hãy điền ngày hết hạn'); return }
    if (this.addValue.quantity === '') { alert('Hãy điền số lượng'); return }
    if (this.addValue.description === '') { alert('Hãy điền nội dung'); return }
    if (this.addValue.work_required === '') { alert('Hãy điền yêu cầu công việc'); return }
    if (this.addValue.entitlements === '') { alert('Hãy điền quyền lợi'); return }
    if (this.addValue.contact === '') { alert('Hãy điền liên hệ'); return }
    this.service.post(this.addValue).subscribe(r => {
      this.add.hide();
      this.getAll();
    })
  }

  // --------------------put-------------------

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
    quantity: '',
    valid_date: '',
    career_id: '',
    city_province_id: '',
    active: true,
  }

  Selected: any;
  getById(id) {
    this.Selected = [];
    this.service.getById(id).subscribe(r => {
      this.Selected = r['data'];
      this.Selected.valid_date = this.datePipe.transform(this.Selected.valid_date, 'yyyy-MM-dd');
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
    })
  }
  //edit
  editSelected() {

    if (this.editValue.title === '') { alert('Hãy điền tiêu đề'); return }
    if (this.editValue.experience_required === '') { alert('Hãy điền yêu cầu kinh nghiệm'); return }
    if (this.editValue.education === '') { alert('Hãy điền trình độ học vấn'); return }
    if (this.editValue.job_level === '') { alert('Hãy điền chức danh làm việc'); return }
    if (this.editValue.form_of_work === '') { alert('Hãy điền chức vụ làm việc'); return }
    if (this.editValue.career_id === '') { alert('Hãy điền loại nghành nghề'); return }
    if (this.editValue.city_province_id === '') { alert('Hãy điền tỉnh thành phố'); return }
    if (this.editValue.salary === '') { alert('Hãy điền mức lương'); return }
    if (this.editValue.valid_date === '') { alert('Hãy điền ngày hết hạn'); return }
    if (this.editValue.quantity === '') { alert('Hãy điền số lượng'); return }
    if (this.editValue.description === '') { alert('Hãy điền nội dung'); return }
    if (this.editValue.work_required === '') { alert('Hãy điền yêu cầu công việc'); return }
    if (this.editValue.entitlements === '') { alert('Hãy điền quyền lợi'); return }
    if (this.editValue.contact === '') { alert('Hãy điền liên hệ'); return }
    this.service.put(this.Selected.id, this.editValue).subscribe(r => {
      this.edit.hide();
      this.getAll();
    })
  }

}

