import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {


  StudentArray : any[] = [];


  studentname: string ="";
  studentaddress: string ="";
  mobile: Number =0;
 
  currentStudentID = "";

  private baseUrl = 'http://backend.default.svc.cluster.local:8081/api/v1/student';

  constructor(private http: HttpClient )
  {
    this.getAllStudent();
 
  }

  register()
  {
  
    let bodyData = {
      "studentname" : this.studentname,
      "studentaddress" : this.studentaddress,
      "mobile" : this.mobile
    };
 
    this.http.post(`${this.baseUrl}/save`,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();
 
        this.studentname = '';
        this.studentaddress = '';
        this.mobile  = 0;
    });
  }


  getAllStudent()
  {
    
    this.http.get(`${this.baseUrl}/getall`)
  
    .subscribe((resultData: any)=>
    {
    
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }


  setUpdate(data: any)
  {
   this.studentname = data.studentname;
   this.studentaddress = data.studentaddress;
   this.mobile = data.mobile;
   this.currentStudentID = data._id;
   
  }


 
  UpdateRecords()
  {
    let bodyData = {
     
      "studentname" : this.studentname,
      "studentaddress" : this.studentaddress,
      "mobile" : this.mobile
    };
    
    this.http.put(`${this.baseUrl}/edit/${this.currentStudentID}`, bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
 
        this.studentname = '';
        this.studentaddress = '';
        this.mobile  = 0;
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete(`${this.baseUrl}/delete/${data._id}`,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
 
        this.studentname = '';
        this.studentaddress = '';
        this.mobile  = 0;
  
    });
 
  }


}