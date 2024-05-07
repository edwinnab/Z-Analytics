import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class ChartService {

  baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  //fetch the forms performance data
  fetchFormsData() {
    const url = `${this.baseUrl}/forms`
    return this.http.get(url, httpOptions)
  }
}
