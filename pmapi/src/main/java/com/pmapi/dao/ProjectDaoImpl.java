package com.pmapi.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pmapi.constants.PMConstants;
import com.pmapi.exception.PMException;
import com.pmapi.model.Project;
import com.pmapi.model.Task;
import com.pmapi.model.User;
import com.pmapi.to.ProjectTO;

@Component
public class ProjectDaoImpl implements ProjectDao, PMConstants {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
    private SessionFactory sessionFactory;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ProjectTO> getAllProjects() throws PMException {		
		List<ProjectTO> projectTOs = null;
		Session session = null;
		Set<User> useSet;
		Set<Task> tasks;
		int CompletedTasks = 0;
		try {
			session = sessionFactory.openSession();
	        List<Project> ProjectList = session.createCriteria(Project.class).list();
	        if(null != ProjectList && !ProjectList.isEmpty()) {
	        	projectTOs = new ArrayList<ProjectTO>();	        	
	        	for(Project project : ProjectList) {
	        		ProjectTO projectTO = new ProjectTO();
	        		projectTO.setProjectId(project.getProjectId());
	        		projectTO.setProject(project.getProject());
	        		projectTO.setPriority(project.getPriority());
	        		projectTO.setStartDate(project.getStartDate().toString());
	        		projectTO.setEndDate(project.getEndDate().toString());
	        		useSet=project.getUser();
	        		if(null!=useSet&&!useSet.isEmpty()) {
	        			for(User user:useSet) {
	        			 projectTO.setManagerId(user.getUserId());
	        			 projectTO.setManagerName(user.getFname()+","+user.getLname());
	        			}
	        		}
	        		tasks=project.getTask();
	        		projectTO.setTaskCount(tasks.size());
	        		CompletedTasks = 0;
	        		for(Task tsk:tasks) {
	        			 if(COMPLETED.equalsIgnoreCase(tsk.getStatus())) {
	        				 CompletedTasks++;
	        			 }
	        		 }
	        		projectTO.setTaskCompleted(CompletedTasks);
	        		projectTOs.add(projectTO);
	        	}
	        }			
		} catch(Exception ex) {
			logger.error("Exception in getAllProjects : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
		return projectTOs;
	}
	
	@Override
	public String saveProject(ProjectTO projectTO) throws PMException {		
		Session session = null;
		Transaction tx = null;
		DateFormat formatter=new SimpleDateFormat(YYYY_MM_DD);
		Project project = new Project();
		try {
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			
			if(0!=projectTO.getProjectId()) {
				project.setProjectId(projectTO.getProjectId());
			}	
			project.setProject(projectTO.getProject());
			project.setPriority(projectTO.getPriority());
			project.setStartDate(formatter.parse(projectTO.getStartDate()));
			project.setEndDate(formatter.parse(projectTO.getEndDate()));	
			project=(Project) session.merge(project);
			session.flush();
			tx.commit();
			this.updateUser(project.getProjectId(),projectTO.getManagerId());
			return SUCCESS;
		} catch(Exception ex) {
			logger.error("Exception occured in saveProject : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}		
	}

	@Override
	public String suspendProject(int projectId) throws PMException {	
		Session session = null;
		Transaction tx = null;
		try {
			session = sessionFactory.openSession();		
			tx = session.beginTransaction();
			Project project= session.get(Project.class, projectId);
			session.delete(project);
			tx.commit();
			return "Success";
		} catch(Exception ex) {
			logger.error("Exception occured in suspendProject : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
	}
	
	private void updateUser(int projectId,int userId)throws PMException {	
		Session session = null;
		Transaction tx = null;
		Set<User> useSet;
		User user=null;
		try {
			session = sessionFactory.openSession();		
			tx = session.beginTransaction();
			Project project= session.get(Project.class, projectId);
			useSet=project.getUser();
    		if(null!=useSet&&!useSet.isEmpty()) {
    			for(User userObj:useSet) {
    				userObj.setProjectId(0);
    				session.merge(userObj);
    			}
    		}
    		user=session.get(User.class, userId);
    		user.setProjectId(project.getProjectId());
			session.merge(user);
			tx.commit();
		} catch(Exception ex) {
			logger.error("Exception occured in updateUser : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
	}
}
