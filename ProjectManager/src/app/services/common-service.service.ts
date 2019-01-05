import { Component, NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";


var vURL = "http://"+environment.serverHost+":"+environment.serverPort+"/"+environment.appcontextpath;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {

  constructor(public http: HttpClient) { }

  // Common Code
  getParentTask() {
    return this.http.get(vURL + "/TaskManager/GetParentTaskList");
  }

  // Code for Project screen

  getProjectDetails() {
    return this.http.get(vURL + "/Project/GetProjectDetails");
  }

  submitProject(project) {
    return this.http.post(vURL + "/Project/SubmitProjectDetail", project, httpOptions);
  }

  SuspendProject(project) {
    return this.http.post(vURL + "/Project/SuspendProjectDetail", project, httpOptions);
  }
  // Code for Task screen

  getTaskManager(project) {
    return this.http.post(vURL + "/TaskManager/GetTaskDetailList",project, httpOptions);
  }

  submitTask(task) {
    return this.http.post(vURL + "/TaskManager/SubmitTaskDetail", task, httpOptions);
  }

  updateEndTask(task) {
    return this.http.post(vURL + "/TaskManager/UpdateEndTask", task);
  }

  // Code for User screen 


  getUserDetails() {
    return this.http.get(vURL + "/User/GetUserDetails");
  }

  submitUser(user) {
    return this.http.post(vURL + "/User/SubmitUserDetail", user, httpOptions);
  }

  deleteUser(user) {
    return this.http.post(vURL + "/User/DeleteUserDetail", user, httpOptions);
  }


};
