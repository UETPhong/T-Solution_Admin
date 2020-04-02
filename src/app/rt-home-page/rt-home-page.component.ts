import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rt-home-page',
  templateUrl: './rt-home-page.component.html',
  styleUrls: ['./rt-home-page.component.css']
})
export class RtHomePageComponent implements OnInit {

  constructor() { 
    window.location.href = 'http://localhost:4201';
  }

  ngOnInit(): void {
  }

}
