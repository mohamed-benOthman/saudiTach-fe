import { Component, OnInit } from '@angular/core';
import { partners } from '../../constants/partners';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partnersList = partners;

  constructor() { }

  ngOnInit() {
  }
}
