import { Component } from '@angular/core';
import { Seat } from '../seat';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {
  public properties: Seat = {
    xsize: 50,
    width: '50px',
    heigth: '50px',
    ysize: 50
  }

  dragPosition = {x: 500, y: -500};

  constructor(){}

}
