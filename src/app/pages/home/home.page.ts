import { Component, OnInit } from '@angular/core';
import { PaysComponent } from './pays.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = PaysComponent;
  constructor() { }

  ngOnInit() {
  }

}
