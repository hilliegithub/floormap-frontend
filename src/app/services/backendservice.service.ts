import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  constructor() { }

  sendCreateFloorMap(floormapBasic: FormData): string{
    console.log(floormapBasic);

    // for (const pair of floormapBasic.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    // SEND HTTP REQUEST WITH

    return 'headquarters_ninth_floor_20240115';
  }
}
