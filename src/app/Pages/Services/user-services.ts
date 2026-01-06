import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {

    return this.http.get<any[]>(
      
      'https://api.agify.io?name[]=johnson&name[]=bakshi'
    );
  }

}

