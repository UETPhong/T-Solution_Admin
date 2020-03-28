import { Component, OnInit } from '@angular/core';
import { CityProvincesService } from '../../services'

@Component({
  selector: 'app-city-provinces',
  templateUrl: './city-provinces.component.html',
  styleUrls: ['./city-provinces.component.css']
})
export class CityProvincesComponent implements OnInit {
  citys: any;

  constructor( private city: CityProvincesService) { }

  ngOnInit(): void {
    this.getCityProvinces();
  }
// --------------------get -------------------

  getCityProvinces(){
    this.citys = [];
    this.city.getCityProvinces().subscribe(r => {
      this.citys = r['data']['apiResult'];
      console.log(this.citys);
    })
  }

}
