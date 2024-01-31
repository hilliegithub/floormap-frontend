import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  errorResponse = false;

  constructor(private http:HttpClient) { }

  sendCreateFloorMap(floormapBasic: FormData): Observable<any>{
    //console.log(floormapBasic);

    return this.http.post(environment.GATEWAY_API + "/upload", floormapBasic)
  }

  getFloorMapImg(imagename: string): Observable<any>{
    // const params = new HttpParams({fromString: imagename})
    return this.http.request('GET',environment.GATEWAY_API + "/getimage" + '?img=' + imagename, {responseType:'json'});
  }

  createMap(jsonData: any): Observable<any>{
    return this.http.request('POST', environment.GATEWAY_API + "/createmap", {body: jsonData, headers: {"Content-Type" : "application/json"}})
  }
}
