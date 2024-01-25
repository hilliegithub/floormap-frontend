import { HttpClient } from '@angular/common/http';
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

  getFloorMapImg(imagename: string): Observable<any>{
    // const params = new HttpParams({fromString: imagename})
    return this.http.request('GET',"http://localhost:8080/getimage" + '?img=' + imagename, {responseType:'json'});
  }

  createMap(jsonData: any): Observable<any>{
    return this.http.request('POST',"http://localhost:8080/createmap", {body: jsonData, headers: {"Content-Type" : "application/json"}})
  }
}
