import { Component, OnInit } from '@angular/core';
import { PageOneComponent } from './page-one.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = PageOneComponent;
  constructor() { }

  ngOnInit() {
  }

}
