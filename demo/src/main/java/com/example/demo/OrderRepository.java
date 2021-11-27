package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order,Long> 
{
    public Iterable<Order> findByBookedBy(Long Id);
    @Query(value = "SELECT * FROM cps.orders WHERE booked_by=:id AND checked_out=0;", nativeQuery = true)
    public Iterable<Order> findIncompleteOrdersByBookedBy(Long id);
}
