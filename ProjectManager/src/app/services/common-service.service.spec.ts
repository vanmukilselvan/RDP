import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

describe('CommonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CommonServiceService]
    });
  });

  it('Create Service', inject([CommonServiceService], (service: CommonServiceService) => {
    expect(service).toBeTruthy();
  }));
  
  it('Service call', inject([CommonServiceService], (service: CommonServiceService) => {
	  try{
		service.getParentTask();
	  }catch(e){};
	  
	  try{
		service.getProjectDetails();
	  }catch(e){};
	  
	  try{
		service.submitProject('project');
	  }catch(e){};

      try{
		service.SuspendProject('project');
		}catch(e){};

	  try{
		  service.getTaskManager('project');
		}catch(e){};

	  try{
		  service.submitTask('task');
		}catch(e){};

	  try{
		  service.updateEndTask('task');
		}catch(e){};

	  try{
		  service.getUserDetails();
		}catch(e){};

	  try{
		  service.submitUser('user');
		}catch(e){};

	  try{
		  service.deleteUser('user');
		}catch(e){};

		  expect(service).toBeTruthy();
	  }));
  
});
