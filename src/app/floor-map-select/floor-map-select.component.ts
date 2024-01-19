import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

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
export class FloorMapSelectComponent implements OnInit, AfterViewInit {

    @ViewChild('floormapboundary') floormapboundary!: ElementRef;
    seatArray: Array<SeatComponent> = [];

    private floormappingname: string = '';
    private seatConfiguration: SeatConfig = {
     widthConfigured: 0,
     heigthConfigured: 0
    }

    constructor(private route: ActivatedRoute){
    }

  ngAfterViewInit(): void {

  }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = params['id'];
          console.log(id);
          this.floormappingname = id;
        });
        this.seatArray.push(new SeatComponent);
    }

    addSeat(){
      this.seatArray.push(new SeatComponent());
    }

    createMap(){
      // console.log(this.floormapboundary.nativeElement.getBoundingClientRect());
      // console.log(this.floormapboundary.nativeElement.getBoundingClientRect().width);
      // console.log(this.floormapboundary.nativeElement.getBoundingClientRect().height);
      var list = [];
      var l = document.getElementsByTagName('app-seat');
      for(var ind = 0; ind < l.length; ind++){
        list.push(l[ind].querySelector('div'));
      }

      const seats: Seat[] = [];
      // Store the image dimesions so that it can be used relative to the seats on page.
      this.seatConfiguration.widthConfigured = this.floormapboundary.nativeElement.getBoundingClientRect().width;
      this.seatConfiguration.heigthConfigured = this.floormapboundary.nativeElement.getBoundingClientRect().height;
      // Calculate the relative position
      for(var ind = 0; ind < list.length; ind++){
        const newSeat: Seat = {
          name: list[ind]?.querySelector('input')?.value,
          relativeBottom: (list[ind]!.getBoundingClientRect().bottom - this.floormapboundary.nativeElement.getBoundingClientRect().bottom),
          relativeLeft: (list[ind]!.getBoundingClientRect().left - this.floormapboundary.nativeElement.getBoundingClientRect().left),
          relativeRight: (list[ind]!.getBoundingClientRect().right - this.floormapboundary.nativeElement.getBoundingClientRect().right),
          relativeTop: (list[ind]!.getBoundingClientRect().top - this.floormapboundary.nativeElement.getBoundingClientRect().top),
        }
        seats.push(newSeat);
      }
      console.log(this.floormapboundary.nativeElement.getBoundingClientRect());

      console.log(seats);
    }
}
