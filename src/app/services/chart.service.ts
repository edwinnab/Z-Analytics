import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../user.model';

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

  //fetch the students list 
  fetchStudentList() {
    const url = `${this.baseUrl}/students`
    return this.http.get(url, httpOptions)
  }

  //handle sign-up 
  handleSubmit(user:User) {
    const url = `${this.baseUrl}/users`
    const body = JSON.stringify(user)
    return this.http.post(url,body, httpOptions)
  }
}
