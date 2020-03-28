import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  cans: any;

  constructor(private can: CandidatesService) { }

  ngOnInit(): void {
  }

}
