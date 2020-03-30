import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  careers: any;

  constructor(
    private car: CareersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildFromAdd();
    this.buildFromEdit();
    this.getCareers();
  }
  // --------------------get-------------------

  getCareers() {
    this.careers = [];
    this.car.getCareers().subscribe(r => {
      this.careers = r['data']['apiResult'];
      console.log(this.careers);
    })
  }

  // --------------------delete-------------------
  deleteCareers(id) {
    // console.log(id);
    this.car.deleteCareerId(id).subscribe(r => {
      console.log(r);
      this.getCareers()
    });
  }
  // --------------------post-------------------
  //form
  addForm: FormGroup;
  addValue = {
    // id: null,
    name: '',
    active: '',
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }
  // addValue: any;

  buildFromAdd() {
    this.addForm = this.fb.group({
      name: '',
      active: '',
    })
  }
  addCareers() {
    this.addValue.name = this.addForm.value.name;
    this.addValue.active = this.addForm.value.active;
    this.car.postCareer(this.addValue).subscribe(r => {
      console.log(r);
      this.getCareers();
    });
  }



  // --------------------put-------------------
  careerSelected: any;
  getCareerS(id) {
    this.careerSelected = [];
    this.car.getCareerById(id).subscribe(r => {
      this.careerSelected = r['data'];
      console.log(this.careerSelected);
    })
  }
  editFrom: FormGroup;
  editValue = {
    id: '',
    name: '',
    active: '',
    created_by: '',
    created_date: '',
    updated_by: '',
    updated_date: '',
  }

  buildFromEdit() {
    this.editFrom = this.fb.group({
      name: '',
      active: true,
    })
  }

  editCareer() {
    this.editValue.id = this.careerSelected.id;
    this.editValue.name = this.editFrom.value.name;
    this.editValue.active = this.editFrom.value.active;
    console.log(this.editValue);
    this.car.putCareer(this.careerSelected.id, this.editValue).subscribe(r => {
      console.log(r);
      this.getCareers();
    })

  }


}
