import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services';

@Component({
  selector: 'app-articlecs',
  templateUrl: './articlecs.component.html',
  styleUrls: ['./articlecs.component.css']
})
export class ArticlecsComponent implements OnInit {

  arts: any;

  constructor(private art: ArticlesService) { }

  ngOnInit(): void {
    this.getArticlecs();
  }

  // -------------------------get--------------------------

  getArticlecs() {
    this.arts = [];
    this.art.getArticles().subscribe(r => {
      this.arts = r['data'];
      console.log(this.arts);
    })
  }

}
