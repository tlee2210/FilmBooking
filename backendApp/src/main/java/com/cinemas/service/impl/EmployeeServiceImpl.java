package com.cinemas.service.impl;

import com.cinemas.dto.EmployeeDTO;
import com.cinemas.dto.request.EmployeeRequest;
import com.cinemas.entities.Employee;
import com.cinemas.repositories.EmployeeRepository;
import com.cinemas.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public void addEmployee(EmployeeRequest emp) {
        if (employeeRepository.existsByname(emp.getName())) throw new RuntimeException("ErrorCode.USER_EXISTED");
        Employee employee = new Employee();
        employee.setNo(emp.getNo());
        employee.setDOB(emp.getDOB());
        employee.setName(emp.getName());
        employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployee(Integer id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));
        return employee;
    }

    @Override
    public void updateEmployee(Integer id, Employee employee) {
        employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));
        employee.setId(id);
        employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Integer id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));

        employeeRepository.delete(employee);

    }

    @Override
    public void updateName(Integer id, EmployeeDTO emp) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid Employee id " + id));

        employee.setName(emp.getName());
        employeeRepository.save(employee);
    }
}
