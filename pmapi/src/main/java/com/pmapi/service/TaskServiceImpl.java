package com.pmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pmapi.dao.TaskDao;
import com.pmapi.exception.PMException;
import com.pmapi.to.TaskTO;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskDao taskDao;

	@Override
	public String saveTask(TaskTO task) throws PMException {
		if(task.isParent()) {			
			return taskDao.saveParentTask(task);
		}else {
			return taskDao.saveTask(task);
		}
	}

	@Override
	public List<TaskTO> getParentTasks() throws PMException {
		return taskDao.getParentTasks();
	}

	@Override
	public List<TaskTO> getAllTasks(int projectId) throws PMException {
		return taskDao.getAllTasks(projectId);
	}

	@Override
	public String endTask(int taskId) throws PMException {		
		return taskDao.endTask(taskId);
	}	

}
