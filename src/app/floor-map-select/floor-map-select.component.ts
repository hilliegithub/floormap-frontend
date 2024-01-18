import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
export class FloorMapSelectComponent implements OnInit {
  @ViewChild('dragspace')
  dragspace!: ElementRef;

  draggableEl!: HTMLElement | null;

  @ViewChild(SeatComponent) currentSeat!: SeatComponent;


    private floormappingname: string = '';
    private data: SeatConfig = {
     widthConfigured: 0,
     heigthConfigured: 0,
     seats: new Array<Seat>()
    }

    constructor(private route: ActivatedRoute){
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = params['id'];
          console.log(id);
          this.floormappingname = id;
        });
    }
}
