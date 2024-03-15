import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmployeeServiceService } from '../../service/employeeService/employee-service.service';
import { EmployeePost } from '../../Model/employee-post.model';
import { error } from 'console';
import { Employee } from '../../Model/employee.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  constructor(private service:EmployeeServiceService){}
  employeePost:EmployeePost={
    pageNumber:0,
    sortingColumn:"",
     sortOrder:""
  }
  employees:Employee[]=[]
  ngOnInit(): void {
    this.reset()
  }
  reset():void
  {
    this.employeePost={
      pageNumber:1,
      sortingColumn:"Employee_Id",
       sortOrder:"ASC"
    }
    this.getValues()
  }
  getValues():void
  {
    this.service.getAllEmployee(this.employeePost).subscribe((result)=>
    {
      this.employees=result;
    },error=>
    {
      console.log(error);
    });
  }
  toggleSort(sortColumn:string):void
  {
    if(this.employeePost.sortingColumn===sortColumn)
    {
      if(this.employeePost.sortOrder==='DESC')
      {
        this.employeePost.sortingColumn='Employee_Id';
        this.employeePost.sortOrder='ASC'
        this.getValues();
      }
      else
      {
      this.employeePost.sortOrder=this.employeePost.sortOrder === '' ? 'ASC' : 'DESC';
      this.getValues()
      }
    }
    else
    {
      this.employeePost.sortingColumn=sortColumn;
      this.employeePost.sortOrder='ASC';
      this.getValues()
    }
  }
  getSortIcon(columnName: string): string {
    if (this.employeePost.sortOrder === 'ASC' && this.employeePost.sortingColumn===columnName) {
      return '↑'; 
    } else if (this.employeePost.sortOrder === 'DESC' && this.employeePost.sortingColumn===columnName) {
      return '↓'; 
    } else {
      return '';
    }
  }
  setPageNo(pageNumber:number):void
  {
    this.employeePost.pageNumber=pageNumber;
    this.getValues();
  }
  getActive(pageNumber:number):string
  {
    if(this.employeePost.pageNumber===pageNumber)
    {
      return "active"
    }
    else
    {
      return ""
    }
  }
  setDisable(page:string):string
  {
    if(this.employeePost.pageNumber===1 && page==="first")
    {
    return "disabled"
    }
    else if(this.employeePost.pageNumber===4 && page==="last")
    {
    return "disabled"
    }
    {
      return ""
    }
  }

}
