package com.cinemas.service;

import com.cinemas.dto.EmployeeDTO;
import com.cinemas.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void addEmployee(Employee employee);

    List<Employee> getAllEmployee();

    Employee getEmployee(Integer id);

    void updateEmployee(Integer id, Employee employee);

    void deleteEmployee(Integer id);

    void updateName(Integer id, EmployeeDTO emp);
}
