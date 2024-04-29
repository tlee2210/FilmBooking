package com.cinemas.service.impl;

import com.cinemas.dto.EmployeeDTO;
import com.cinemas.entity.Employee;
import com.cinemas.repository.EmployeeRepository;
import com.cinemas.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployee(Integer id) {
        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));
        return employee;
    }

    @Override
    public void updateEmployee(Integer id, Employee employee) {
        employeeRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));
        employee.setId(id);
        employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Integer id) {
        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));

        employeeRepository.delete(employee);

    }

    @Override
    public void updateName(Integer id, EmployeeDTO emp) {
        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));

        employee.setName(emp.getName());
        employeeRepository.save(employee);
    }
}
