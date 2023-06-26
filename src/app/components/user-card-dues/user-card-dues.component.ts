import { Component, OnInit, Input } from '@angular/core';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-user-card-dues',
  templateUrl: './user-card-dues.component.html',
  styleUrls: ['./user-card-dues.component.scss']
})
export class UserCardDuesComponent implements OnInit {
  guests: { name: string, id: string, avatar: string }[];
  @Input() amount: number | undefined;
  @Input() guest: any;
  constructor(private homePage: HomePage) {
    this.guests = this.homePage.guests;
  }

  ngOnInit() {
  }
}
