import { Component } from '@angular/core';
import { Seat } from '../seat';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {
  public properties: Seat = {
    xsize: 50,
    ysize: 50
  }

  style: string = '';

  constructor(){}

  public setX (x: number): void{
    this.properties.xplot = x;
    console.log(x);
    console.log(this.properties.xplot);
  }

  public setY (y: number): void{
    this.properties.yplot = y;
    console.log(y);
    console.log(this.properties.yplot);
  }

  public setTranslate(): void{
    this.style = "translate3d(" + this.properties.xplot + "px," + this.properties.yplot + "px, 0)";
    console.log(this.style);
  }

}
