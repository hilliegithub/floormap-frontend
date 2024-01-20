import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  constructor(private http:HttpClient) { }

  sendCreateFloorMap(floormapBasic: FormData): string{
    console.log(floormapBasic);

    // for (const pair of floormapBasic.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    // SEND HTTP REQUEST WITH

    const headers = new HttpHeaders().set("Content-Type", "multipart/form-data")

    this.http.post("http://localhost:8080/upload", floormapBasic, {headers})
    .subscribe(
      (val) => {
        console.log("POST call successfull value returned. ", val);
      },
      response => {
        console.log("POST call had a error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );

    return 'headquarters_ninth_floor_20240115';
  }
}
