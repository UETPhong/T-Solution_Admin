import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../services';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  bans: any;

  constructor(private ban: BannersService) { }

  ngOnInit(): void {
    this.getBanners();
  }

  // -------------------------get--------------------------

  getBanners() {
    this.bans = [];
    this.ban.getBanners().subscribe(r => {
      this.bans = r['data'];
      console.log(this.bans);
    })
  }
}

