package com.cinemas.controller;

import com.cinemas.dto.EmployeeDTO;
import com.cinemas.dto.request.EmployeeRequest;
import com.cinemas.entities.Employee;
import com.cinemas.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "User Controller")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    /**
     * add new Employee
     *
     * @param employee
     * @return
     */
    @Operation(method = "POST", summary = "Add new employee", description = "Send a request via this API to create new employee")
    @PostMapping("/add")
    public String addEmployee(@RequestBody @Valid EmployeeRequest employee) {
        service.addEmployee(employee);
        return "Success add Employes";
    }

    /**
     * get All Employee
     *
     * @return
     */
//    @GetMapping("/user")
//    public OAuth2User getUser(@AuthenticationPrincipal OAuth2User principal) {
//        System.out.println("===================");
//        System.out.println(principal);
//        System.out.println("===================");
//        return principal;
//    }

    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> employees = service.getAllEmployee();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    /**
     * get Employee by id
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public Employee getUser(@RequestParam Integer id) {
        return service.getEmployee(id);
    }

    /**
     * update Employee by id
     *
     * @param id
     * @param employee
     * @return
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
        service.updateEmployee(id, employee);

        return ResponseEntity.noContent().build();
    }

    /**
     * Delete Employee by id
     *
     * @param id
     * @return
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
        service.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * update name employee by id
     *
     * @param id
     * @param emp
     * @return
     */
    @PatchMapping("/update-name/{id}")
    public ResponseEntity<Void> updatename(@PathVariable Integer id, @RequestBody EmployeeDTO emp) {
        service.updateName(id, emp);
        return ResponseEntity.noContent().build();

    }
}
