import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrl: './studentcrud.component.scss'
})
export class StudentcrudComponent implements OnInit{
  name:string = '';
  address:string = '';
  phone:string = '';
  StudentArray:any[] = [];
  currentStudentID = '';

  constructor(private http:HttpClient, private empService:EmployeeService){
    this.getStudents()
  }
  ngOnInit(): void {}

  getStudents(){   
     this.http.get("http://localhost:8000/user/getAll").subscribe((res:any) =>{
       this.StudentArray = res.data;
     })
  }

  save(){
    if(this.currentStudentID  == ''){
      this.register()
    }else{
      this.update()
    }
    
  }

  register(){
    let bodyData = {
      "name":this.name, 
      "address":this.address, 
      "phone":this.phone
    }
    this.http.post("http://localhost:8000/user/create", bodyData)
    .subscribe((data:any) => {
      console.log(data);
      alert('data added successfully')
      this.name = '';
      this.address = '';
      this.phone = '';
      this.getStudents()
    })
  }

  setUpdate(data:any){
    this.name = data.name;
      this.address = data.address;
      this.phone = data.phone;
      this.currentStudentID = data._id
  }

  update(){
  let bodyData = {
      "name":this.name, 
      "address":this.address, 
      "phone":this.phone
    }
    this.http.patch("http://localhost:8000/user/update"+"/"+this.currentStudentID, bodyData)
    .subscribe((data:any) => {
      console.log(data);
      alert('data updated successfully')
      
      this.getStudents()
    })
  }

  setDelete(item:any){
     this.http.delete("http://localhost:8000/user/delete"+"/"+item._id)
    .subscribe((data:any) => {
      console.log(data);
      alert('data deleted successfully');      
      this.getStudents()
    })
  }
}
  