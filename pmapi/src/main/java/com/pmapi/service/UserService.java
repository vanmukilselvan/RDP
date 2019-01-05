package com.pmapi.service;

import java.util.List;

import com.pmapi.exception.PMException;
import com.pmapi.to.UserTO;

public interface UserService {
	
	public List<UserTO> getAllUsers() throws PMException;

	public String saveUser(UserTO user) throws PMException;

	public String deleteUser(int userId) throws PMException;
}
