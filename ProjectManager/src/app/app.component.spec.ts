import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { FilterPipe } from './pipes/filter.pipe';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';
import { Http, Request, RequestMethod, RequestOptions, Response,
         ResponseOptions, XHRBackend,HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

declare var $: any;

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let backend: MockBackend;

  const parentTaskDetail: any = [
    {
      "ParentTask": "Cognizant",
      "ParentId": 1

    }
  ];

  
  const taskDetail: any = [
    {
      "projectId": "1",
      "taskId": "1",
      "project": "Project Name1",
      "parentdD": 2,
      "parentTask": "Cognizant",
      "task": "Test 1",
      "startDate": "09/07/2018",
      "endDate": "09/08/2018",
      "priority": 4,
      "managerId": 123,
      "projStatus": "Completed",
      "status": 0,
      "userId": 4
    }
  ];

  const projectDetail: any = [
    {
      "projectId": "1",
      "taskId": "1",
      "project": "Project Name1",
      "parentId": 2,
      "task": "Test 1",
      "startDate": "09/07/2018",
      "endDate": "09/08/2018",
      "priority": 4,
      "managerId": 123,
      "taskCount": 4
    }
  ];

    const managerDetails: any = [
    {
      "managerId": "1"

    }
  ];

  const projectList: any = [
    {
      "projectId" : 1,
      "project" : "Project1",

    }
  ];
  

  const userDetails: any = [
    {
      "userId": "1",
      "firstName": "mahesh",
      "lastName": "Kumaar",
      "employeeId": "123"
    }
  ];


  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },

    getTaskManager(): Observable<any> {
      return of(taskDetail);
    },

    getProjectDetails(): Observable<any> {
      return of(projectDetail);
    },

    getProjectName():Observable<any> {
      return of(projectList);
    },

    getManagerDetails(): Observable<any> {
      return of(managerDetails);
    },

    getUserDetails(): Observable<any> {
      return of(userDetails);
    },

    submitTask(task): Observable<any> {
      taskDetail.unshift(task);
      return of(task);
    },

    onProjectSubmit(project): Observable<any> {
      projectDetail.unshift(project);
      return of(project);
    },

    updateEndTask(task): Observable<any> {
      let idx = taskDetail.findIndex(x => x.taskiD == task.taskId);
      if (idx !== -1) {
        taskDetail[idx] = task;
      }
      return of(task);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, FilterPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule, ReactiveFormsModule],
      providers: [{ provide: CommonServiceService, useValue: mockService },
					OrderPipe,
				  { provide: MockBackend, useClass: MockBackend },
				  { provide: XHRBackend, useExisting: MockBackend }
				]
    }).compileComponents();
	backend = TestBed.get(MockBackend);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Get All Parent tasks', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getParentTask().subscribe(data => { component.parentTaskList = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('Get All Project Tasks', inject([CommonServiceService], (service: CommonServiceService) => {
	  let poject={
      "projectId": "1",
      "taskId": "1",
      "project": "Project Name1",
      "parentId": 2,
      "task": "Test 1",
      "startDate": "09/07/2018",
      "endDate": "09/08/2018",
      "priority": 4,
      "managerId": 123,
      "taskCount": 4
    };
    service.getTaskManager(poject).subscribe(data => { component.taskDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('Get All Projects', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getProjectDetails().subscribe(data => { component.projDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
  it('Get All Users', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getUserDetails().subscribe(data => { component.userDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
  
  it('End task', inject([CommonServiceService], (service: CommonServiceService) => {
	  let task={
			  "projectId": "1",
			  "taskId": "1",
			  "project": "Project Name1",
			  "parentdD": 2,
			  "parentTask": "Cognizant",
			  "task": "Test 1",
			  "startDate": "09/07/2018",
			  "endDate": "09/08/2018",
			  "priority": 4,
			  "managerId": 123,
			  "projStatus": "Completed",
			  "status": 0,
			  "userId": 4   
			  };
		component.EndTask(task);
		component.ResetTask()
		expect(service).toBeTruthy();
  }));
  
  it('Edit User', inject([CommonServiceService], (service: CommonServiceService) => {
	  let user={
			    "firstName": "fname",
			    "lastName": "lname",
				"userId": 1,
				"employeeId": 2,
			    "projectId": 2,
			    "taskId": 3
			  };
		component.EditUser(user);
		expect(service).toBeTruthy();
  }));
  
  it('Save Project ', async(inject([MockBackend,CommonServiceService], (mockBackend: MockBackend,service: CommonServiceService)  => {
	  
	  try{
		component.onProjectSubmit();
	   }catch(e){};
	   let  project={
		  "projectId": 1,
		  "project": 'Test Project',
		  "Priority_Project": 1,
		  "startDate": "10/10/2012",
		  "endDate": "11/11/2011",
		  "Project": 'prject',
		  "priority": 10,
		  "taskCount":10,
		  "taskCompleted":5,
		  "managerId": 10,
		  "managerName":"User Name",
		  "selectedManager": "Manager",
		  "selectedManagerId":10,
		  "isActive":0
	  };
	    component.myProjectForm.setValue(project);
	  try{
		component.onProjectSubmit();
	   }catch(e){};
	   
	     project={
		  "projectId": 1,
		  "project": 'Test Project',
		  "Priority_Project": 1,
		  "startDate": "10/10/2010",
		  "endDate": "11/11/2011",
		  "Project": 'prject',
		  "priority": 10,
		  "taskCount":10,
		  "taskCompleted":5,
		  "managerId": 10,
		  "managerName":"User Name",
		  "selectedManager": "Manager",
		  "selectedManagerId":10,
		  "isActive":0
	  };
	   component.myProjectForm.setValue(project);
	  try{
		component.onProjectSubmit();
	   }catch(e){};
		expect(service).toBeTruthy();
  })));
  
  it('Edit Task', inject([CommonServiceService], (service: CommonServiceService) => {
	  let proj={
			    "Project":"test",
				"project":"test",
				"Priority_Project":"Test",
				"priority":2,
				"selectedManagerId":2,
				"managerId":10,
				"selectedManager":"manager",
				"managerName":"pname",
				"startDate":"10/10/2010",
				"endDate":"11/11/2011",
				"projectId":5,
				"taskCount":10,
				"taskCompleted":10,
				"isActive":10
			  };
		component.EditProject(proj);
		try{
			component.SuspendProject(proj);
		}catch(e){};
		expect(service).toBeTruthy();
  }));
  it('Reset Project', inject([CommonServiceService], (service: CommonServiceService) => {
	  	component.ResetProject();
		expect(service).toBeTruthy();
  }));
  
  it('Submit Task', inject([CommonServiceService], (service: CommonServiceService) => {
	  try{
	  	component.onSubmit();
	  }catch(e){};
	  component.parentCheck=true;
	  try{
	  	component.onSubmit();
	  }catch(e){};
	  component.myForm.value.task="test";
	  try{
	  	component.onSubmit();
	  }catch(e){};
	  let formData={
		   "taskId": 1,
			"task": "Test",
			"priority": 10,
			"parentId":10,
			"parentTask": "Parrent",
			"startDate": "10/10/2010",
			"endDate": "11/11/2009",
			"projectId": 0,
			"status": 0,
			"parent":'Test parrent",									t',
			"userName":'Name',
			"userId": 1,
			"selectedProject": 12,
			"selectedProjectId":12,
			"selectedParentTask": "Parrent",
			"selectedParentTaskId":10,
			"selectedUser": "user",
			"selectedUserId":1,
			"projectName": "Project Name"
	  };
	  component.myForm.setValue(formData);
	  try{
	  	component.onSubmit();
	  }catch(e){};
	  formData={
		   "taskId": 1,
			"task": "Test",
			"priority": 10,
			"parentId":10,
			"parentTask": "Parrent",
			"startDate": "10/10/2010",
			"endDate": "11/11/2019",
			"projectId": 0,
			"status": 0,
			"parent":'Test parrent",									t',
			"userName":'Name',
			"userId": 1,
			"selectedProject": 12,
			"selectedProjectId":12,
			"selectedParentTask": "Parrent",
			"selectedParentTaskId":10,
			"selectedUser": "user",
			"selectedUserId":1,
			"projectName": "Project Name"
		};
	  component.myForm.setValue(formData);
	  try{
	  	component.onSubmit();
	  }catch(e){};
	   expect(service).toBeTruthy();
  }));
  it('Edit task', inject([CommonServiceService], (service: CommonServiceService) => {
	  let task={
			  "projectId": "1",
			  "taskId": "1",
			  "project": "Project Name1",
			  "parentdD": 2,
			  "parentTask": "Cognizant",
			  "task": "Test 1",
			  "startDate": "09/07/2018",
			  "endDate": "09/08/2018",
			  "priority": 4,
			  "managerId": 123,
			  "projStatus": "Completed",
			  "status": 0,
			  "userId": 4   
			  };
		try{	  
			component.EditTask(task);	
		}catch(e){};		
		expect(service).toBeTruthy();
  }));
  it('should have Add User', inject([CommonServiceService], (service: CommonServiceService) => {
	  let user={
			"firstName": "Fname",
			"lastName": "Lname",
			"userId": 1,
			"employeeId": 1,
			"projectId": 1,
			"taskId": 1
			};
			component.addUserForm.setValue(user);
		try{	  
			component.AddUserSubmit();	
		}catch(e){};
		try{	  
			component.DeleteUser(user);	
		}catch(e){};
		try{	  
			component.ConfirmDeleteUser();	
		}catch(e){};	
		component.AddUserResetTask();		
		expect(service).toBeTruthy();
  }));
  it('Compare start and end Date', inject([CommonServiceService], (service: CommonServiceService) => {
	  let dates={
			"endDate":'' ,
			};
			component.compareTwoDates(dates);	
		expect(service).toBeTruthy();
  }));
  it('Application Menu ', inject([CommonServiceService], (service: CommonServiceService) => {
		component.AddProject();
		component.AddTask();
		component.AddUser();
		component.ViewTask();
		component.onFilterChange();
		component.sort('key');
		component.onParentCheck();
		component.sortProject('projectkey');
		component.sortUser('userkey');
		component.sortTask('taskkey');
		component.selectedManagerClick('managerName');
		component.selectedPrijectClick('project');
		component.selectedParentTaskClick('task');
		component.selectedUserClick('user');
		expect(service).toBeTruthy();
  }));
  it('Search values ', inject([CommonServiceService], (service: CommonServiceService) => {	
		try{
			component.ManagerSearch();
		}catch(e){};
		try{
			component.ProjectSearch();
		}catch(e){};
		try{
			component.ParentSearch();
		}catch(e){};
		try{
			component.UserSearch();
		}catch(e){};
		try{
			component.SearchTaskProject();
		}catch(e){};
		expect(service).toBeTruthy();
  }));
});
