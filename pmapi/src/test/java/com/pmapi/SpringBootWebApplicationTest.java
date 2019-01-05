package com.pmapi;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringBootWebApplication.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SpringBootWebApplicationTest {
	
	private MockMvc mockMvc;
	
	@Autowired
    private WebApplicationContext wac;
	
	@Before
	public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();

	}
	
	@Test
	public void A_addUser() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/User/SubmitUserDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"userId\":0,\"employeeId\":\"0122333\",\"projectId\":\"\",\"taskId\":\"\"}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void B_getAllUsers() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/User/GetUserDetails").accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isArray()).andDo(print());
	}
	
	@Test
	public void C_editUser() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/User/SubmitUserDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"userId\":1,\"employeeId\":\"99999\",\"projectId\":\"\",\"taskId\":\"\"}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void D_DeleteUser() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/User/SubmitUserDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"userId\":0,\"employeeId\":\"5555\",\"projectId\":\"\",\"taskId\":\"\"}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
		mockMvc.perform(MockMvcRequestBuilders.post("/User/DeleteUserDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"userId\":2,\"employeeId\":\"5555\",\"projectId\":\"\",\"taskId\":\"\"}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void E_AddProject() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SubmitProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":0,\"project\":\"Test Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":23,\"managerId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void F_getAllProjects() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/Project/GetProjectDetails").accept(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$").isArray()).andDo(print());
	}
	
	@Test
	public void G_UpdateProject() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SubmitProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":1,\"project\":\"Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":15,\"managerId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void H_SuspendProject() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SubmitProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":0,\"project\":\"Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":15,\"managerId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
		
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SuspendProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":2,\"project\":\"Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":15,\"managerId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void I_AddParentTask() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/SubmitTaskDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":null,\"task\":\"Parent Task \",\"parent\":true}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
		
	@Test
	public void J_getParentTasks() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/TaskManager/GetParentTaskList").accept(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$").isArray()).andDo(print());
	}
	
	@Test
	public void K_AddTask() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/SubmitTaskDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":null,\"parentId\":1,\"task\":\"Child Task\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-23\",\"priority\":24,\"projectId\":1,\"userId\":1,\"status\":0}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void L_getProjectTasks() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/GetTaskDetailList")
				.contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":1,\"project\":\"Test Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":23,\"taskCount\":1,\"taskCompleted\":0,\"managerId\":2,\"managerName\":\"First Name,Last Name\",\"isActive\":0}")
				.accept(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$").isArray()).andDo(print());
	}
	
	@Test
	public void M_EditTask() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/SubmitTaskDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":1,\"parentId\":1,\"task\":\"Child Task Updated\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-23\",\"priority\":24,\"projectId\":1,\"userId\":1,\"status\":0}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void N_EndTask() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/UpdateEndTask")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isBoolean()).andDo(print());
	}
	
	@Test
	public void O_AddTaskNegative() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/UpdateEndTask")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":null,\"parentId\":1,\"task\":\"Child Task\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-23\",\"priority\":24,\"projectId\":10,\"userId\":1,\"status\":0}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isNotEmpty()).andDo(print());
	}
	
	@Test
	public void P_EndTaskNegative() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/TaskManager/SubmitTaskDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"taskId\":null,\"parentId\":1,\"task\":\"Child Task\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-23\",\"priority\":24,\"projectId\":10,\"userId\":1,\"status\":0}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").isNotEmpty()).andDo(print());
	}
	
	@Test
	public void Q_DeleteUserNegative() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/User/DeleteUserDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"userId\":-1,\"employeeId\":\"5555\",\"projectId\":\"\",\"taskId\":\"\"}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").exists()).andDo(print());
	}
	
	@Test
	public void R_SuspendProjectNegative() throws Exception {		
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SuspendProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":-1,\"project\":\"Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":15,\"managerId\":1}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").exists()).andDo(print());
	}
	
	@Test
	public void S_UpdateProjectNegative() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/Project/SubmitProjectDetail")
				 .contentType(MediaType.APPLICATION_JSON)
			      .content("{\"projectId\":-2,\"project\":\"Project\",\"startDate\":\"2018-11-01\",\"endDate\":\"2018-11-30\",\"priority\":15,\"managerId\":5}")
				.accept(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$").exists()).andDo(print());
	}
}
