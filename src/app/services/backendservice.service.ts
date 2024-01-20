import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  errorResponse = false;

  constructor(private http:HttpClient) { }

  sendCreateFloorMap(floormapBasic: FormData): Observable<any>{
    //console.log(floormapBasic);

    return this.http.post("http://localhost:8080/upload", floormapBasic)
  }
}
