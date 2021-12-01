package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,Long> {
    public Employee findByUserName(String userName);
    @Query(value = "SELECT * FROM cps.employee e WHERE e.assigned_to=:id", nativeQuery = true)
    public Employee findByAssignedTo(Long id);
}
