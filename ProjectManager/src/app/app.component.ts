import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { Http, Response } from '@angular/http';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';


declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

@NgModule({
  declarations: [],

  imports: [OrderPipe],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent implements OnInit {
  constructor(private appServices: CommonServiceService,
    private fb: FormBuilder, private orderPipe: OrderPipe) { }

  title = 'Project-Manager';
  parentTaskList: any;
  taskDetails: any = [];
  userDetails: any = [];
  projDetails: any = [];
  managerDetails: any = [];
  projectNameList: any = [];
  response: any;
  search: any = {
    projSearch: '',
    userSearch: ''

  }
  deleteUserValue: any = [];

  key: string = ''; //set default
  reverse: boolean = false;
  submitted: boolean = false;
  addUserSubmitted: boolean = false;
  projectSubmitted: boolean = false;
  projShow: boolean = true;
  userShow: boolean = false;
  taskShow: boolean = false;
  myForm: FormGroup;
  addUserForm: FormGroup;
  myProjectForm: FormGroup;
  viewTaskForm: FormGroup;
  orderBy: boolean = false;
  isUserUpdate: boolean = false;
  filter = false;
  parentCheck = false;
  Start_Date = new Date();
  selectedManager: string = '';
  selectedManagerId: string = '';
  selectedProject: string = '';
  selectedProjectId:string = '';
  selectedParentTask: string = '';
  selectedParentTaskId: string = '';
  selectedUser: string = '';
  selectedUserId: string = '';
  searchedProject: string = '';
  searchedProjectId: string = '';
  isTaskUpdate: boolean = false;

  public ngAfterContentInit() {

  }


  public ngOnInit() {


    // Common Code 

    this.callAllMethods();



    // Code for Project screen

    this.myProjectForm = this.fb.group({
      projectId: 0,
      project: ['', Validators.required],
      Priority_Project: [0, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      Project: [''],
      priority: 0,
	  taskCount:0,
	  taskCompleted:0,
	  isActive:0,
      managerId: [''],
	  managerName:[''],
      selectedManager: [{ disabled: true, value: '' }, Validators.required],
	  selectedManagerId:0
    });

    // Code for Task screen

    this.myForm = this.fb.group({
      taskId: 0,
      task: ['', Validators.required],
      priority: [0, Validators.required],
      parentId: [''],
      parentTask: [''],
      startDate: [''],
      endDate: [''],
      projectId: 0,
      status: 0,
	  parent:'',
	  userName:'',
      userId: [''],
      selectedProject: [{ disabled: true, value: '' }, Validators.required],
	  selectedProjectId:'',
      selectedParentTask: [{ disabled: true, value: '' }, Validators.required],
	  selectedParentTaskId:'',
      selectedUser: [{ disabled: true, value: '' }, Validators.required],
	  selectedUserId:'',
      projectName: [''],

    });


    // Code for User screen  

    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: 0,
      employeeId: ['', Validators.required],
      projectId: '',
      taskId: ''
    });

    this.viewTaskForm = this.fb.group({
      searchedProject: [{ disabled: true, value: '' }]
    });


    $('.modal').on('hidden.bs.modal', (e) => {
      if (e.target.id == 'managerModal') {
        this.myProjectForm.get('selectedManager').setValue(this.selectedManager);
		this.myProjectForm.get('selectedManagerId').setValue(this.selectedManagerId);
      };
      if (e.target.id == 'projNameModal') {
        this.myForm.get('selectedProject').setValue(this.selectedProject);
		 this.myForm.get('selectedProjectId').setValue(this.selectedProjectId);		
      };
      if (e.target.id == 'parentTaskModal') {
        this.myForm.get('selectedParentTask').setValue(this.selectedParentTask);
		this.myForm.get('selectedParentTaskId').setValue(this.selectedParentTaskId);
      };
      if (e.target.id == 'userModal') {
        this.myForm.get('selectedUser').setValue(this.selectedUser);
		this.myForm.get('selectedUserId').setValue(this.selectedUserId);
      };
      if (e.target.id == 'taskProjectModal') {
        this.viewTaskForm.get('searchedProject').setValue(this.searchedProject);		
      };
    })

  };

  // Common Code 

  callAllMethods() {
    this.getProjectName();
    this.getProjectDetails();   
    this.getUserDetails();
	this.getProjectTasks({projectId:this.searchedProjectId});
    this.getManagerDetails();
    this.getParentDetails();
  };

  // Code for Project screen

  getParentDetails() {
    this.appServices.getParentTask().subscribe(data => {
      this.parentTaskList = data;
    });
  };

  getProjectDetails() {
    this.appServices.getProjectDetails().subscribe(data => {
      this.projDetails = data;
    });
  };

  getManagerDetails() {
    this.appServices.getUserDetails().subscribe(data => {
      this.managerDetails = data;
    });

  };

  getProjectName() {
    this.appServices.getProjectDetails().subscribe(data => {
      this.projectNameList = data;
    });
  };


  onProjectSubmit() {
    this.projectSubmitted = true;
    var vMangerName = this.selectedManagerId;
    if (vMangerName == "") {
      vMangerName = this.myProjectForm.value.managerId;
    }

    if (this.myProjectForm.valid && vMangerName) {
      if (this.compareTwoDates(this.myProjectForm.value)) {
        var VID = this.myProjectForm.value.projectId;

        var vProjForm = {
          projectId: VID,
          project: this.myProjectForm.value.project,
          startDate: this.myProjectForm.value.startDate,
          endDate: this.myProjectForm.value.endDate,
          priority: this.myProjectForm.value.Priority_Project,
          managerId: vMangerName
        };

        this.appServices.submitProject(vProjForm).subscribe(data => {
          if (data) {
            Swal('Success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
            this.myProjectForm.reset();
            this.projectSubmitted = false;
			this.selectedManagerId='';
            this.callAllMethods();
          }
          else {
            Swal('Failed', 'Please try again..', 'error');
          }
        });

      }
      else {
        Swal('Failed', 'End Date should be greater than Start Date', 'error');

      }
    }
    else {
      Swal('Failed', 'All fields are mandatory.', 'error');

    }
  };

  EditProject(proj) {
    proj.Project = proj.project;
    proj.Priority_Project = proj.priority;
    proj.selectedManagerId = proj.managerId;
	proj.selectedManager = proj.managerName;
    if (proj.startDate != null)
      proj.startDate = proj.startDate;
    if (proj.endDate != null)
      proj.endDate = proj.endDate;
    
      this.myProjectForm.setValue(proj);
  };


  public ResetProject() {
    this.myProjectForm.reset();
    this.submitted = false;
  }

  public SuspendProject(proj) {
    this.appServices.SuspendProject(proj).subscribe(data => {
      if (data) {
        Swal('Success', `Data Suspended successfully...`, 'success');

        this.callAllMethods();
      }
      else {
        Swal('Failed', 'Please try again..', 'error');
      }
    });
  }


  // Code for Task screen  
  
  getProjectTasks(project){
	 
	 this.searchedProjectId = project.projectId; 
	 
	 this.appServices.getTaskManager(project).subscribe(data => {
		 
		  this.taskDetails = data;
		  
		});
  };	 

  onSubmit() {
    this.submitted = true;
    var VID = this.myForm.value.taskId;

    var vProjName = this.selectedProjectId;
    if (vProjName == "")
      vProjName = this.myForm.value.projectId;

    var vParentTask = this.selectedParentTaskId;
    if (vParentTask == "")
      vParentTask = this.myForm.value.parentId;

    var vUserName = this.selectedUserId;
    if (vUserName == "")
      vUserName = this.myForm.value.userId;
  
	if(this.parentCheck){
		var parentTask=this.myForm.value.task;
		if(parentTask != ""&&null !=parentTask){
			var vParentTaskForm = {
			  taskId: VID,
			  task: this.myForm.value.task,
			  parent:this.parentCheck			  
			};
			
			this.appServices.submitTask(vParentTaskForm).subscribe(data => {
			  if (data) {
				Swal('success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
				this.myForm.reset();
				this.submitted = false;
				this.callAllMethods();
				this.isTaskUpdate = false;
				this.filter = true;
			  }
			  else {
				Swal('Failed', 'Please try again..', 'error');
			  }
			});
		}else{
			Swal('Failed', 'Task is mandatory', 'error');
		}
		
	}else{	
		if (this.myForm.valid && vProjName != ""&&vProjName !=null 
			&& vParentTask != "" &&vParentTask != null && vUserName != ""&&vUserName !=null
			&&null!=this.myForm.value.endDate&&null!=this.myForm.value.endDate
			&&''!=this.myForm.value.endDate&&''!=this.myForm.value.endDate) {
		  if (this.compareTwoDates(this.myForm.value)) {

			var vTaskForm = {
			  taskId: VID,
			  parentId: vParentTask,
			  task: this.myForm.value.task,
			  startDate: this.myForm.value.startDate,
			  endDate: this.myForm.value.endDate,
			  priority: this.myForm.value.priority,
			  projectId: vProjName,
			  userId: vUserName,
			  status:0
			};


			this.appServices.submitTask(vTaskForm).subscribe(data => {
			  if (data) {
				Swal('success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
				this.myForm.reset();
				this.submitted = false;
				this.callAllMethods();
				this.isTaskUpdate = false;
				this.filter = true;
				this.selectedProjectId='';
				this.selectedParentTaskId='';
				this.selectedUserId='';
			  }
			  else {
				Swal('Failed', 'Please try again..', 'error');
			  }
			});
		  }
		  else {
			Swal('Failed', 'End Date should be greater than Start Date', 'error');

		  }
		}	
		else {
		  Swal('Failed', 'All fields are mandatory.', 'error');

		}
	}
  };


  public EditTask(task) {

    this.isTaskUpdate = true;
    this.filter = false;
    
    task.selectedProject = task.projectName;
    task.selectedParentTask = task.parentTask;
	task.selectedProjectId = task.projectId;
	task.selectedParentTaskId= task.parentId;
    task.selectedUser = task.userName;
    task.parentTask = task.parentTask;
	task.selectedUserId=task.userId;    
    if (task.startDate != null)
      task.startDate = task.startDate;
    if (task.endDate != null)
      task.endDate = task.endDate;
    this.myForm.setValue(task);
	$('.task-manager-page a[href="#addTask"]').tab('show');
  };

  public EndTask(task) {

    if (task.endDate != null && task.endDate != "") {
      this.appServices.updateEndTask(task).subscribe(data => {

        this.callAllMethods();
        Swal('success', `Data updated successfully...`, 'success');
      });
    }
    else {
      Swal('Failed', 'Please provide End date...', 'error');
    }

  }

  public ResetTask() {
    this.myForm.reset();
    this.submitted = false;
	this.selectedProjectId='';
	this.selectedParentTaskId='';
	this.selectedUserId='';
  }

  // Code for User screen  

  getUserDetails() {

    this.appServices.getUserDetails().subscribe(data => {

      this.userDetails = data;

    });
  };


  AddUserSubmit() {
    this.addUserSubmitted = true;
    if (this.addUserForm.valid) {
      var VID = this.addUserForm.value.userId;
      this.appServices.submitUser(this.addUserForm.value).subscribe(data => {
        if (data) {
          Swal('Success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
          this.AddUserResetTask();
          this.callAllMethods();
        }
        else {
          Swal('Failed', 'Please try again..', 'error');
        }
      });
    }
  };

  public EditUser(user) {
    this.addUserForm.setValue(user);
    this.isUserUpdate = true;
  };

  public DeleteUser(user) {    
    this.deleteUserValue = user;
	$("#deleteModal").modal();
  };

  public ConfirmDeleteUser() {
    var vDeleteUserValue = this.deleteUserValue;
    this.appServices.deleteUser(vDeleteUserValue).subscribe(data => {
      if (data) {
        Swal('Success', `Data Deleted successfully...`, 'success');
      }
      else {
        Swal('Failed', 'Please try again..', 'error');
      }
      $("#deleteModal").modal('hide');
      this.AddUserResetTask();
      this.callAllMethods();
    });
  };

  public AddUserResetTask() {
    this.addUserForm.reset();
    this.addUserSubmitted = false;
    this.isUserUpdate = false;
  }


  // Common function

  compareTwoDates(data) {
    if (data.endDate != null && data.endDate != '') {
      if (new Date(data.endDate) < new Date(data.startDate))
        return false;

      else
        return true;
    }
    else {
      return true;
    }
  };

  AddProject() {
    this.userShow = false;
    this.taskShow = false;
    this.projShow = true;
  };

  AddTask() {
    this.userShow = false;
    this.taskShow = false;
    this.projShow = false;
  };

  AddUser() {
    this.userShow = true;
    this.taskShow = false;
    this.projShow = false;
  };

  ViewTask() {
    this.userShow = false;
    this.taskShow = true;
    this.projShow = false;
  };

  ManagerSearch() {
    this.selectedManagerId = this.myProjectForm.get('selectedManagerId').value;
	this.selectedManager = this.myProjectForm.get('selectedManager').value;
    $("#managerModal").modal();

  };

  ProjectSearch() {
    this.selectedProject = this.myForm.get('selectedProject').value;
    $("#projNameModal").modal();

  };

  ParentSearch() {
    this.selectedParentTask = this.myForm.get('selectedParentTask').value;
    $("#parentTaskModal").modal();

  };

  UserSearch() {
    this.selectedUser = this.myForm.get('selectedUser').value;
    $("#userModal").modal();

  };

  SearchTaskProject() {
    this.searchedProject = this.viewTaskForm.get('searchedProject').value;	
    $("#taskProjectModal").modal();

  };

  onFilterChange() {
    this.filter = !this.filter;
  };

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  };

  onParentCheck() {
	this.parentCheck=!this.parentCheck;
  };


  sortProject(projectkey) {
    this.projDetails = this.orderPipe.transform(this.projDetails, projectkey);
  };

  sortUser(userkey) {
    this.userDetails = this.orderPipe.transform(this.userDetails, userkey);
  };

  sortTask(taskkey) {
    this.taskDetails = this.orderPipe.transform(this.taskDetails, taskkey);
  };
  
  selectedManagerClick(managerName){
	  this.selectedManager=managerName;
  }
  selectedPrijectClick(project){
	  this.selectedProject=project;
  }
  selectedParentTaskClick(task){
	  this.selectedParentTask=task;
  }
  selectedUserClick(user){
	 this.selectedUser=user;
  } 
}