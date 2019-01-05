package com.pmapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pmapi.constants.PMConstants;
import com.pmapi.exception.PMException;
import com.pmapi.service.ProjectService;
import com.pmapi.to.ProjectTO;

@RestController
@RequestMapping("Project")
public class ProjectController implements PMConstants {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private ProjectService projectService;
		
	
	@GetMapping(value = "/GetProjectDetails")
	public List<ProjectTO> getProjectDetails() throws PMException {	
		List<ProjectTO> list=null;
		try {
			list= projectService.getAllProjects();
		} catch(PMException ex) {
			logger.error("Exception occured in GetProjectDetails : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return list;
	}
	
	@PostMapping(value = "/SubmitProjectDetail")
	public boolean submitProjectDetail(@RequestBody ProjectTO projectTO) throws PMException {
		String status;
		try {
			status = projectService.saveProject(projectTO);	
			if("Success".contentEquals(status)) return true;
		} catch(PMException ex) {
			logger.error("Exception occured in SubmitProjectDetail : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return false;
	}
	
	@PostMapping(value = "/SuspendProjectDetail")
	public boolean suspendProjectDetail(@RequestBody ProjectTO projectTO) throws PMException {
		String status;
		try {
			status = projectService.suspendProject(projectTO.getProjectId());
			if("Success".contentEquals(status)) return true;
		} catch(PMException ex) {
			logger.error("Exception occured in SuspendProjectDetail : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return false;
	}
}