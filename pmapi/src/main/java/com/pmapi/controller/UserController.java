package com.pmapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pmapi.constants.PMConstants;
import com.pmapi.exception.PMException;
import com.pmapi.service.UserService;
import com.pmapi.to.UserTO;

@RestController
@RequestMapping("User")
public class UserController implements PMConstants {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private UserService userService;
		
	
	@GetMapping(value = "/GetUserDetails")
	public List<UserTO> getUserDetails() throws PMException {	
		List<UserTO> list=null;
		try {
			list= userService.getAllUsers();
		} catch(PMException ex) {
			logger.error("Exception occured in UserController GetUserDetails : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return list;
	}
	
	@PostMapping(value = "/SubmitUserDetail")
	public boolean submitUserDetail(@RequestBody UserTO userTO) throws PMException {
		String status;
		try {
			status = userService.saveUser(userTO);	
			if("Success".contentEquals(status)) return true;
		} catch(PMException ex) {
			logger.error("Exception occured in UserController SubmitUserDetail : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return false;
	}
	
	@PostMapping(value = "/DeleteUserDetail")
	public boolean deleteUserDetail(@RequestBody UserTO userTO) throws PMException {
		String status;
		try {
			status = userService.deleteUser(userTO.getUserId());	
			if("Success".contentEquals(status)) return true;
		} catch(PMException ex) {
			logger.error("Exception occured in UserController DeleteUserDetail : "+ ex);
			throw new PMException(ex.getErrorCode(), ex.getErrorMessage(), ex.getStatus());
		}
		return false;
	}
}