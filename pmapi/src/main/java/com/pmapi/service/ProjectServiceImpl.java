package com.pmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pmapi.dao.ProjectDao;
import com.pmapi.exception.PMException;
import com.pmapi.to.ProjectTO;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectDao projectDao;	

	@Override
	public List<ProjectTO> getAllProjects() throws PMException {
		return projectDao.getAllProjects();
	}

	@Override
	public String saveProject(ProjectTO project) throws PMException {
		return projectDao.saveProject(project);
	}

	@Override
	public String suspendProject(int projectId) throws PMException {
		return projectDao.suspendProject(projectId);
	}

}
