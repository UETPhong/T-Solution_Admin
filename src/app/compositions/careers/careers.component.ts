import { Component, OnInit } from '@angular/core';
import { CareersService } from '../../services'

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  careers: any;

  constructor( private car: CareersService) { }

  ngOnInit(): void {
    this.getCareers();
  }
// --------------------get -------------------

  getCareers(){
    this.careers = [];
    this.car.getCareers().subscribe(r => {
      this.careers = r['data']['apiResult'];
      console.log(this.careers);
    })
  }

}
