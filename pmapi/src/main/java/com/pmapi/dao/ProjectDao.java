package com.pmapi.dao;

import java.util.List;

import com.pmapi.exception.PMException;
import com.pmapi.to.ProjectTO;

public interface ProjectDao {

	public List<ProjectTO> getAllProjects() throws PMException;

	public String saveProject(ProjectTO project) throws PMException;

	public String suspendProject(int projectId) throws PMException;

}
