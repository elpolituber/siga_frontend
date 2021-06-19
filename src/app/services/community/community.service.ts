import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {URL} from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommunityService {

    constructor(private http: HttpClient) {}

    get(url: string) {
        return this.http.get(environment.API_URL_COMMUNITY + url);
    }
    pdf(url:string){
        return environment.API_URL_COMMUNITY+url;
    }
    getUpload(url:string){
             return URL+url;     
    }
    delete(url:string,params = new HttpParams()){
        return this.http.delete(environment.API_URL_COMMUNITY+ url,{params});
    }
    post(url:string,data:any ,params=new HttpParams()):Observable<any>{
        return this.http.post<any>(environment.API_URL_COMMUNITY+url,data,{params});
    }
    put(url:string,data:any ,params=new HttpParams()):Observable<any>{
        return this.http.put<any>(environment.API_URL_COMMUNITY+url,data,{params});
    }
}
