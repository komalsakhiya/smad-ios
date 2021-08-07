import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myad-image',
  templateUrl: './myad-image.component.html',
  styleUrls: ['./myad-image.component.scss'],
})
export class MyadImageComponent implements OnInit {
  image;
  constructor() {
    this.image = history.state.image;
  }

  ngOnInit() { }

}
