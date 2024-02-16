import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatConfig } from '../seatconfig';
import { Seat } from '../seat';
import { SeatComponent } from '../seat/seat.component';
import { CommonModule } from '@angular/common';
import { BackendserviceService } from '../services/backendservice.service';
// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from '../../environments/environment.development';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NodeJsClient } from '@smithy/types';

@Component({
  selector: 'app-floor-map-select',
  standalone: true,
  imports: [SeatComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './floor-map-select.component.html',
  styleUrl: './floor-map-select.component.css'
})
export class FloorMapSelectComponent implements OnInit {

    @ViewChild('floormapboundary') floormapboundary!: ElementRef;
    seatArray: Array<SeatComponent> = [];
    private backendService: BackendserviceService = inject(BackendserviceService);

    private floormappingname: string = '';
    private seatConfiguration: SeatConfig = {
     widthConfigured: 0,
     heigthConfigured: 0
    }

    errorOccurred: any = {
      status: false,
      message: ''
    }

    loading = false;

    validUrlParam = true;
    imageAWSKey = '';
    imgURL = '';
    // s3Client = new S3Client({region: environment.AWS_REGION, credentials: {accessKeyId:environment.ACCESS_KEY_ID,secretAccessKey:environment.SECRET_ACCESS_KEY}}) as NodeJsClient<S3Client>;

    constructor(private route: ActivatedRoute, private router: Router){
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          const id = params['id'];
          console.log(id);
          this.floormappingname = id;
        });
        if(this.containsAlphanumeric(this.floormappingname)){

          var responseObservable = this.backendService.getFloorMapImg(this.floormappingname)
          responseObservable.subscribe(
            async (res) => {
              console.log(res);
              if(res.error.status == 'true'){
                this.validUrlParam = false;
              }
              else{
                var key = 'floor-images/' + res.imageKey;
                // console.log(key);
                // var params = {Bucket: 'floor-mapping', Key: key};
                // var command = new GetObjectCommand(params);
                //var urlPresigned = await (getSignedUrl(this.s3Client, command, {expiresIn: 3600}));
                //console.log(await urlPresigned)
                this.imageAWSKey = key;
                this.imgURL = res.image_url;
                //  this.imgURL = "../../assets/floorplan.png"
              }
            },
            (err) => {
              console.error(err)
              this.errorOccurred.status = true;
              this.errorOccurred.message = 'Could not successfully load image from storage. Try again later.'
            }
          );

          this.seatArray.push(new SeatComponent);
        }
        else{
          // Throw error up on page
        }
    }

    containsAlphanumeric(str: string){
      var alphanumericRegex = /^[a-zA-Z0-9_]+$/;
      return alphanumericRegex.test(str);
    }

    addSeat(){
      this.seatArray.push(new SeatComponent());
    }

    toggleLoading(){
      this.loading = !this.loading;
    }

    createMap(){
      this.loading = true;
      this.errorOccurred.status = false;
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
      //console.log(this.floormapboundary.nativeElement.getBoundingClientRect());
      // console.log(seats);

      var finalConfig = {
        boundary: {
          floormapname: this.floormappingname,
          bottom: this.floormapboundary.nativeElement.getBoundingClientRect().bottom,
          height: this.floormapboundary.nativeElement.getBoundingClientRect().height,
          left: this.floormapboundary.nativeElement.getBoundingClientRect().left,
          right: this.floormapboundary.nativeElement.getBoundingClientRect().right,
          top: this.floormapboundary.nativeElement.getBoundingClientRect().top,
          width: this.floormapboundary.nativeElement.getBoundingClientRect().width,
        },
        seats: seats,
        imageKey: this.imageAWSKey
      };

      var json = JSON.stringify(finalConfig);

      var responseObservable = this.backendService.createMap(json);
      responseObservable.subscribe(
        (res) => {
          console.log(res);
          if (res.error.status == 'false'){
            console.log('Navigate to success page')
            this.router.navigate(['/success'])
          }
          else{
            console.log("Show error!")
            this.errorOccurred.status = true;
            this.errorOccurred.message = 'Error occured on the server. Please try again later or contact the administrator';
          }
        },
        (err) => {
          console.error(err);
          this.errorOccurred.status = true;
          this.errorOccurred.message = 'Could not successfully create mappings. Please try again later or contact the administrator';
        }
        )
        this.loading = false;
    }
}
