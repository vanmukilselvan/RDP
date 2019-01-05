package com.pmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pmapi.dao.UserDao;
import com.pmapi.exception.PMException;
import com.pmapi.to.UserTO;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;	
	
	@Override
	public List<UserTO> getAllUsers() throws PMException {
			return userDao.getAllUsers();		
	}
	
	@Override
	public String saveUser(UserTO user) throws PMException {
			return userDao.saveUser(user);		
	}

	@Override
	public String deleteUser(int userId) throws PMException {
		return userDao.deleteUser(userId);	
	}

}
