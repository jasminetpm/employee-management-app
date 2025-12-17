import axios from 'axios';

const API_URL = 'http://localhost:8080/employee';

export const getDepartments = () => axios.get(`${API_URL}/getAllDepts`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/searchByEmpNo`, { params: { empNo: id } });
export const getEmployeesByDept = (deptNo, page) => axios.get(`${API_URL}/searchByDept`, { params: { deptNo, page } });
export const promoteEmployee = (data) => axios.post(`${API_URL}/promotion`, data);