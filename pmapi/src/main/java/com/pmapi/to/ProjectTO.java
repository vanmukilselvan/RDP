package com.pmapi.to;

import java.io.Serializable;

public class ProjectTO implements Serializable{
	private static final long serialVersionUID = 7047702343075258618L;
	private int projectId;
	private String project;
	private String startDate;
	private String endDate;
	private int priority;
	private int taskCount;
	private int taskCompleted;
	private int managerId;
	private String managerName;
	private int IsActive;
	/**
	 * @return the projectId
	 */
	public int getProjectId() {
		return projectId;
	}
	/**
	 * @param projectId the projectId to set
	 */
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	/**
	 * @return the project
	 */
	public String getProject() {
		return project;
	}
	/**
	 * @param project the project to set
	 */
	public void setProject(String project) {
		this.project = project;
	}
	/**
	 * @return the startDate
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	/**
	 * @return the endDate
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	/**
	 * @return the priority
	 */
	public int getPriority() {
		return priority;
	}
	/**
	 * @param priority the priority to set
	 */
	public void setPriority(int priority) {
		this.priority = priority;
	}
	/**
	 * @return the taskCount
	 */
	public int getTaskCount() {
		return taskCount;
	}
	/**
	 * @param taskCount the taskCount to set
	 */
	public void setTaskCount(int taskCount) {
		this.taskCount = taskCount;
	}
	/**
	 * @return the managerId
	 */
	public int getManagerId() {
		return managerId;
	}
	/**
	 * @param managerId the managerId to set
	 */
	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}
	/**
	 * @return the isActive
	 */
	public int getIsActive() {
		return IsActive;
	}
	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(int isActive) {
		IsActive = isActive;
	}
	/**
	 * @return the taskCompleted
	 */
	public int getTaskCompleted() {
		return taskCompleted;
	}
	/**
	 * @param taskCompleted the taskCompleted to set
	 */
	public void setTaskCompleted(int taskCompleted) {
		this.taskCompleted = taskCompleted;
	}
	/**
	 * @return the managerName
	 */
	public String getManagerName() {
		return managerName;
	}
	/**
	 * @param managerName the managerName to set
	 */
	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}
	
	}
