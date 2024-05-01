package com.cinemas.service;

import com.cinemas.dto.EmployeeDTO;
import com.cinemas.dto.request.EmployeeRequest;
import com.cinemas.entities.Employee;

import java.util.List;

public interface EmployeeService {
    void addEmployee(EmployeeRequest employee);

    List<Employee> getAllEmployee();

    Employee getEmployee(Integer id);

    void updateEmployee(Integer id, Employee employee);

    void deleteEmployee(Integer id);

    void updateName(Integer id, EmployeeDTO emp);
}
