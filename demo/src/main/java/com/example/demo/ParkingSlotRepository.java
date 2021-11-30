package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ParkingSlotRepository extends CrudRepository<ParkingSlot,Long>
{
    @Query(value = "SELECT * FROM cps.parking_slot s WHERE s.location_id = :locationId AND is_booked=false",nativeQuery = true)
    public Iterable<ParkingSlot> findAllByLocationId(Long locationId);

    @Query(value = "SELECT * FROM cps.parking_slot s WHERE s.location_id = :locationId AND is_booked=false AND preference = :preference", nativeQuery = true)
    public Iterable<ParkingSlot> findAllByLocationAndPreference(Long locationId, String preference);

}