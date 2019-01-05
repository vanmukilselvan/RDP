package com.pmapi.service;

import java.util.List;

import com.pmapi.exception.PMException;
import com.pmapi.to.ProjectTO;

public interface ProjectService {
	
	public List<ProjectTO> getAllProjects() throws PMException;

	public String saveProject(ProjectTO project) throws PMException;

	public String suspendProject(int projectId) throws PMException;
}
