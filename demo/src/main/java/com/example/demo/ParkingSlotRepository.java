package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ParkingSlotRepository extends CrudRepository<ParkingSlot,Long>
{
    @Query(value = "SELECT * FROM cps.parking_slot s WHERE s.location_id = :locationId and is_booked=false",nativeQuery = true)
    // @Query("select id, x, y from test where x = :x and is_booked=false", nativeQuery = true)
    public Iterable<ParkingSlot> findAllByLocationId(Long locationId);
}