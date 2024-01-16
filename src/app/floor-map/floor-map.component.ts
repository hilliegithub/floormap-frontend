import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FloorMap } from '../floormap';
import { JsonPipe, NgIf } from '@angular/common';
import { BackendserviceService } from '../services/backendservice.service';

@Component({
  selector: 'app-floor-map',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './floor-map.component.html',
  styleUrl: './floor-map.component.css'
})
export class FloorMapComponent {
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
  constructor(private formBuilder: FormBuilder) {
  }

  onImgUpload(event: Event){
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
    this.FloorImageId = this.backendService.sendCreateFloorMap(formdata);
    console.log(this.FloorImageId);
  }
}
