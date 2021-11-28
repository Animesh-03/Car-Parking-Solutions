package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,Long> {
    public Employee findByUserName(String userName);
    public Employee findByAssignedTo(Long id);
}
