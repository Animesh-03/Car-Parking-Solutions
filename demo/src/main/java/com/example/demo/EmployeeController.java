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
        e.setNumberOfOrders(0);
        
        employeeRepository.save(e);
        return "Saved";
    }

    @PostMapping(path = "/addRating")
    public @ResponseBody String addRating(Long id, Float rating)
    {
        Employee e = employeeRepository.findById(id).get();
        float currentRating = e.getRating();
        int currentOrders = e.getNumberOfOrders();
        float newRating = ((currentOrders*currentRating) + rating)/(currentOrders+1);
        e.setNumberOfOrders(currentOrders + 1);
        e.setRating(newRating);

        employeeRepository.save(e);

        return "Saved";
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String deleteEmployee(@RequestParam Long id)
    {
        employeeRepository.deleteById(id);
        return "Deleted";
    }

    @GetMapping(path = "/getByUsername")
    public @ResponseBody Employee getEmployee(@RequestParam String userName)
    {
        return employeeRepository.findByUserName(userName);
    }

    @GetMapping(path = "getByAssignedTo")
    public @ResponseBody Employee getEmployeeByAssignedTo(Long id)
    {
        return employeeRepository.findByAssignedTo(id);
    }
}
