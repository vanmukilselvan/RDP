package com.pmapi.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PMException extends Exception {	
	
	private static final long serialVersionUID = 4657743076067403540L;

	private String errorCode;
	
	private String errorMessage;
	
	private int status;

	public PMException(String errorCode, String errorMessage, int status) {		
		super(errorMessage);
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
		this.status = status;
	}

	/**
	 * @return the errorCode
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * @param errorCode the errorCode to set
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}
	
	public ExceptionResponse transformException()
	{
		ExceptionResponse restError = new ExceptionResponse();
		restError.setErrorCode(this.errorCode);
		restError.setErrorMessage(this.errorMessage);
		return restError;
	}
	
}
