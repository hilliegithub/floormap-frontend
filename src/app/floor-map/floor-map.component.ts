import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { JsonPipe, NgIf } from '@angular/common';
import { BackendserviceService } from '../services/backendservice.service';

@Component({
  selector: 'app-floor-map',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './floor-map.component.html',
  styleUrl: './floor-map.component.css'
})
export class FloorMapComponent implements OnInit {
  private backendService: BackendserviceService = inject(BackendserviceService);
  private FloorImageId: string = '';

  floormapForm = this.formBuilder.group({
    building: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    floor: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    email: ['', [Validators.email, Validators.required]],
    image: [null, Validators.required]
  });

  @ViewChild('alertbuilding')
  alertbuilding!: ElementRef;

  // Inject service into constructor3
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  onImgUpload(event: Event){
  }

  ngOnInit(): void {
      //this.imageObservable$ = this.route.paramMap.pipe("");
  }

  onSubmit(event: Event){
    const formdata = new FormData();

    formdata.append("building", this.floormapForm.controls.building.value!);
    formdata.append("floor", this.floormapForm.controls.floor.value!);
    formdata.append("email", this.floormapForm.controls.email.value!);

    const target = event.target as HTMLDivElement;
    let length = target.querySelectorAll('input').length;
    const obj = target.querySelectorAll('input').item(length - 1);
    //console.log(obj.files)

    if(obj.files){
      formdata.append("image",obj.files[0])
    }
    // this.FloorImageId = this.backendService.sendCreateFloorMap(formdata);
    var responseObservable = this.backendService.sendCreateFloorMap(formdata);
    responseObservable.subscribe(
      (val) => {
        console.log("POST call successfull value returned. ", val);
        this.FloorImageId = val.imagename;
        console.log(this.FloorImageId);
        this.router.navigate(['/floor-map-select', this.FloorImageId])
      },
      err => {
        console.log("POST call had a error", err);
      }
    );
  }
}
