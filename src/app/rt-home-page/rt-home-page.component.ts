import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rt-home-page',
  templateUrl: './rt-home-page.component.html',
  styleUrls: ['./rt-home-page.component.css']
})
export class RtHomePageComponent implements OnInit {

  constructor() { 
    // window.location.href = 'http://localhost:4201';
    window.location.href = 'http://14.231.191.91:8002/#/home';
  }

  ngOnInit(): void {
  }

}
