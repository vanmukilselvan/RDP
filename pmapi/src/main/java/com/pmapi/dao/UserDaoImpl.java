package com.pmapi.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pmapi.constants.PMConstants;
import com.pmapi.exception.PMException;
import com.pmapi.model.User;
import com.pmapi.to.UserTO;

@Component
public class UserDaoImpl implements UserDao, PMConstants {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
    private SessionFactory sessionFactory;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<UserTO> getAllUsers() throws PMException {		
		List<UserTO> userToList = null;
		Session session = null;
		try {
			session = sessionFactory.openSession();
	        List<User> userList = session.createCriteria(User.class).list();
	        if(null != userList && !userList.isEmpty()) {
	        	userToList = new ArrayList<UserTO>();
	        	
	        	for(User user : userList) {
	        		UserTO userTo = new UserTO();
	        		userTo.setUserId(user.getUserId());
	        		userTo.setFirstName(user.getFname());
	        		userTo.setLastName(user.getLname());
	        		userTo.setEmployeeId(user.getEmpId());	
	        		userTo.setProjectId(user.getProjectId());
	        		userTo.setTaskId(user.getTaskId());
	        		userToList.add(userTo);
	        	}
	        }			
		} catch(Exception ex) {
			logger.error("Exception in getAllUsers : " + ex);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
		return userToList;
	}
	
	@Override
	public String deleteUser(int userId) throws PMException {	
		Session session = null;
		Transaction tx = null;
		try {
			session = sessionFactory.openSession();		
			tx = session.beginTransaction();
			User user= session.get(User.class, userId);
			session.delete(user);
			tx.commit();
			return SUCCESS;
		} catch(Exception e) {
			logger.error("Exception occured in deleteUser : " + e);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}
	}
	
	@Override
	public String saveUser(UserTO userTo) throws PMException {		
		Session session = null;
		Transaction tx = null;
		User user = new User();
		try {
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			
			if(0!=userTo.getUserId()) {
				user.setUserId(userTo.getUserId());
			}				
			user.setFname(userTo.getFirstName());
			user.setLname(userTo.getLastName());
			user.setEmpId(userTo.getEmployeeId());
			session.saveOrUpdate(user);
			tx.commit();
			return SUCCESS;
		} catch(Exception e) {
			logger.error("Exception occured in saveUser : " + e);
			throw new PMException(TECH_ERROR_CODE, TECH_ERROR_MESSAGE, STATUS_500);
		} finally {
			session.close();
		}		
	}
}
