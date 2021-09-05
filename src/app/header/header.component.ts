import { Component, OnInit , HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  expanded = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if (window.innerWidth) {
      this.expanded = true;
    }
  }
  constructor() { }
  collapse() {
    this.expanded = !this.expanded;
    console.log(this.expanded);
  }
  ngOnInit(): void {
  }

}
