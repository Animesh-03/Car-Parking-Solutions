package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ParkingSlot 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long locationId;
    private String locationName;
    private String preference;
    private boolean isBooked;

    public ParkingSlot(Long locationId,String locationName, String preference)
    {
        this.locationId = locationId;
        this.locationName = locationName;
        this.isBooked = false;
        this.preference = preference;
    }

    public ParkingSlot()
    {

    }

    public Long getId() {
        return id;
    }
    public boolean getIsBooked()
    {
        return isBooked;
    }
    public Long getLocationId() {
        return locationId;
    }
    public String getLocationName() {
        return locationName;
    }
    public String getPreference() {
        return preference;
    }
    public void setBooked(boolean isBooked) {
        this.isBooked = isBooked;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }
    public void setPreference(String preference) {
        this.preference = preference;
    }


}
