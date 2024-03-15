import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../Model/employee.model';
import { EmployeePost } from '../../Model/employee-post.model';
import { api_main } from '../../app/environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }
  getAllEmployee(employeePost:EmployeePost):Observable<Employee[]>{
    return this.http.post<Employee[]>(`${api_main}Employee`,employeePost);
  }

}
