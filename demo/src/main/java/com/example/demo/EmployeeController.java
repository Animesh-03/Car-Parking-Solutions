package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/employee")
public class EmployeeController 
{
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Employee> getAllEmployees()
    {
        return employeeRepository.findAll();
    }

    @PostMapping(path = "/add")
    public @ResponseBody String addEmployee(@RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String phoneNumber, @RequestParam Long assignedTo, @RequestParam String userName, @RequestParam String password)
    {
        // Employee e = new Employee(firstName, lastName, email, phoneNumber,assignedTo,userName,password);
        Employee e = new Employee();
        e.setAssignedTo(assignedTo);
        e.setEmail(email);
        e.setFirstName(firstName);
        e.setLastName(lastName);
        e.setPhoneNumber(phoneNumber);
        e.setUserName(userName);
        e.setPassword(password);
        
        employeeRepository.save(e);
        return "Saved";
    }

    @GetMapping(path = "/get")
    public @ResponseBody Employee getEmployee(@RequestParam String userName)
    {
        return employeeRepository.findByUserName(userName);
    }
}
