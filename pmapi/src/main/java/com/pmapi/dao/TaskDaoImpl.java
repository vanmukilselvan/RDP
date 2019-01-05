package com.pmapi.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pmapi.constants.PMConstants;
import com.pmapi.exception.PMException;
import com.pmapi.model.ParentTask;
import com.pmapi.model.Project;
import com.pmapi.model.Task;
import com.pmapi.model.User;
import com.pmapi.to.TaskTO;

@Component
public class TaskDaoImpl implements TaskDao, PMConstants {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
    private SessionFactory sessionFactory;	

	@Override
	public String saveTask(TaskTO taskTo) throws PMException {	
		Session session = null;
		Transaction tx = null;
		DateFormat formatter=new SimpleDateFormat(YYYY_MM_DD);
		Task task = new Task();
		Project project=new Project();
		ParentTask parenttask=new ParentTask();
		try {
			session = sessionFactory.openSession();
			tx = session.beginTransaction();			
			if(0!=taskTo.getTaskId()) {
				task.setTaskId(taskTo.getTaskId());
			}	
			task.setTask(taskTo.getTask());
			project.setProjectId(taskTo.getProjectId());
			task.setProject(project);
			parenttask.setParentId(taskTo.getParentId());
			task.setParentTask(parenttask);
			task.setPriority(taskTo.getPriority());
			task.setStartDate(formatter.parse(taskTo.getStartDate()));
			task.setEndDate(formatter.parse(taskTo.getEndDate()));	
			task.setStatus(taskTo.getStatus());
			task=(Task) session.merge(task);
			tx.commit();
			this.updateUser(task.getTaskId(),taskTo.getUserId());
			return SUCCESS;
		} catch(Exception ex) {
			logger.error("Exception occured in saveTask : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}		
	}

	@Override
	public String saveParentTask(TaskTO task) throws PMException {
		Session session = null;
		Transaction tx = null;
		ParentTask parenttask=new ParentTask();
		try {
			session = sessionFactory.openSession();
			tx = session.beginTransaction();			
			if(0!=task.getTaskId()) {
				parenttask.setParentId(task.getTaskId());
			}	
			parenttask.setParentTask(task.getTask());
			session.saveOrUpdate(parenttask);
			tx.commit();
			return SUCCESS;
		} catch(Exception ex) {
			logger.error("Exception occured in saveParentTask : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}	
	}
	private void updateUser(int taskId,int userId)throws PMException {	
		Session session = null;
		Transaction tx = null;
		Set<User> useSet;
		User user=null;
		try {
			session = sessionFactory.openSession();		
			tx = session.beginTransaction();
			Task task= session.get(Task.class, taskId);
			useSet=task.getUser();
    		if(null!=useSet&&!useSet.isEmpty()) {
    			for(User userObj:useSet) {
    				userObj.setTaskId(0);
    				session.merge(userObj);
    			}
    		}
    		user=session.get(User.class, userId);
    		user.setTaskId(task.getTaskId());
			session.merge(user);
			tx.commit();
		} catch(Exception ex) {
			logger.error("Exception occured in updateUser : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TaskTO> getParentTasks() throws PMException {		
		List<TaskTO> taskToList = null;
		Session session = null;
		try {
			session = sessionFactory.openSession();
	        List<ParentTask> parentTaskList = session.createCriteria(ParentTask.class).list();
	        if(null != parentTaskList && !parentTaskList.isEmpty()) {
	        	taskToList = new ArrayList<TaskTO>();	        	
	        	for(ParentTask task : parentTaskList) {
	        		TaskTO taskTO = new TaskTO();
	        		taskTO.setTaskId(task.getParentId());
	        		taskTO.setTask(task.getParentTask());
	        		taskToList.add(taskTO);
	        	}
	        }			
		} catch(Exception ex) {
			logger.error("Exception in getParentTasks : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
		return taskToList;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TaskTO> getAllTasks(int ProjectId) throws PMException {		
		List<TaskTO> taskToList = null;
		List<Task> taskList;
		Session session = null;
		ParentTask parentTask;
		Project project;
		Criteria criteria;
		Set<User> useSet;
		try {
			session = sessionFactory.openSession();
			criteria=session.createCriteria(Task.class);
			criteria.add(Restrictions.eq(PROJECT_ID, ProjectId));
			taskList= criteria.list();
	        if(null != taskList && !taskList.isEmpty()) {
	        	taskToList = new ArrayList<TaskTO>();	        	
	        	for(Task task : taskList) {
	        		TaskTO taskTO = new TaskTO();
	        		taskTO.setTaskId(task.getTaskId());
	        		taskTO.setTask(task.getTask());
	        		parentTask=task.getParentTask();
	        		if(null!=parentTask) {
	        			taskTO.setParentId(parentTask.getParentId());
	        			taskTO.setParentTask(parentTask.getParentTask());
	        		}
	        		project=task.getProject();
	        		if(null!=project) {
	        			taskTO.setProjectId(project.getProjectId());
	        			taskTO.setProjectName(project.getProject());
	        		}
	        		taskTO.setStartDate(task.getStartDate().toString());
	        		taskTO.setEndDate(task.getEndDate().toString());
	        		taskTO.setPriority(task.getPriority());
	        		taskTO.setStatus(task.getStatus());
	        		useSet=task.getUser();
	        		if(null!=useSet&&!useSet.isEmpty()) {
	        			for(User user:useSet) {
	        				taskTO.setUserId(user.getUserId());
	        				taskTO.setUserName(user.getFname()+","+user.getLname());
	        			}
	        		}
	        		
	        		taskToList.add(taskTO);
	        	}
	        }			
		} catch(Exception ex) {
			logger.error("Exception in getAllTasks : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
		return taskToList;
	}

	@Override
	public String endTask(int taskId) throws PMException {
		Session session = null;
		Transaction tx = null;
		Task task;
		try {
			session = sessionFactory.openSession();
			tx = session.beginTransaction();	
			task=session.load(Task.class, taskId);
			task.setStatus(ENDTASK);
			session.saveOrUpdate(task);
			tx.commit();
			return SUCCESS;
		} catch(Exception ex) {
			logger.error("Exception occured in saveParentTask : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}	
	}
}
