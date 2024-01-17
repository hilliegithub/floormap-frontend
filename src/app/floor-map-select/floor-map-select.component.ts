import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SeatConfig } from '../seatconfig';
import { Seat } from '../seat';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-floor-map-select',
  standalone: true,
  imports: [SeatComponent],
  templateUrl: './floor-map-select.component.html',
  styleUrl: './floor-map-select.component.css'
})
export class FloorMapSelectComponent implements OnInit, OnChanges {
  @ViewChild('dragitem')
  dragitem!: ElementRef;

  @ViewChild(SeatComponent) currentSeat!: SeatComponent;


    private floormappingname: string = '';
    private data: SeatConfig = {
     widthConfigured: 0,
     heigthConfigured: 0,
     seats: new Array<Seat>()
    }

    private currentX = 0;
    private currentY = 0;
    private initialX = 0;
    private initialY = 0;
    private xOffset = 0;
    private yOffset = 0;
    private active = false;

    constructor(private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = params['id'];
          console.log(id);
          this.floormappingname = id;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
    }

    dragStart(event: any): void{
      console.log(event.type);
      if(event.type === 'mousedown'){
      var l = event.target as HTMLElement;
      var r = (this.dragitem.nativeElement as HTMLElement).querySelector('div');

      this.initialX = event.clientX;
            this.initialY = event.clientY;
            if(l === r){
              this.active = true;
              console.log(this.active);
            }
          }
    }

    dragEnd(event: any): void{
      console.log(event.type);
      if(event.type === 'mouseup'){
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
        console.log(this.active);
      }
    }

    drag(event: any):void{
      console.log(event.type);

        if(event.type === 'mousemove'){

          if(this.active){
            // event.prenventDefault();

            this.currentX = event.clientX - this.initialX;
            this.currentY = event.clientY - this.initialY;

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            console.log("x:" + this.currentX + " y:" + this.currentY);
            this.currentSeat.setX(this.currentX);
            this.currentSeat.setY(this.currentY);
            this.currentSeat.setTranslate();
          }

        }
      }

}
