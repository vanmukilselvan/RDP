package com.pmapi.dao;

import java.util.List;

import com.pmapi.exception.PMException;
import com.pmapi.to.UserTO;

public interface UserDao {

	public List<UserTO> getAllUsers() throws PMException;

	public String saveUser(UserTO user) throws PMException;

	public String deleteUser(int userId) throws PMException;

}
