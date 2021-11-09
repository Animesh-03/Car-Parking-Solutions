package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface ParkingSlotRepository extends CrudRepository<ParkingSlot,Long>
{
    
}