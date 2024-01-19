import { Component } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {

  @Output() seatname = new EventEmitter<string>();

  dragPosition = {x: 500, y: -500};

  constructor(){}

}
