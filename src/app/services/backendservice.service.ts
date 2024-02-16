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
    const url = require('../../assets/env.json');
    console.log(url.baseurl);
    const endpoint = url.baseurl + "/upload";
    return this.http.post(endpoint, floormapBasic)
  }

  getFloorMapImg(imagename: string): Observable<any>{
    const url = require('../../assets/env.json');
    const endpoint = url.baseurl + "/getimage";
    return this.http.request('GET',endpoint + '?img=' + imagename, {responseType:'json'});
  }

  createMap(jsonData: any): Observable<any>{
    const url = require('../../assets/env.json');
    const endpoint = url.baseurl + "/createmap";
    return this.http.request('POST', endpoint, {body: jsonData, headers: {"Content-Type" : "application/json"}})
  }
}
