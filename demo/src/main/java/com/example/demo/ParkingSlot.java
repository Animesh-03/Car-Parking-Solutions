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
    private Long parkingSlotId;
    private boolean isBooked = false;
    private String location;
    private String checkInTime;
    private String checkOutTime;
    private Long bookedBy;

    public Long getParkingSlotId() {
        return parkingSlotId;
    }
    public String getCheckInTime() {
        return checkInTime;
    }
    public String getCheckOutTime() {
        return checkOutTime;
    }
    public String getLocation() {
        return location;
    }
    public boolean getIsBooked() {
        return isBooked;
    }
    public Long getBookedBy()
    {
        return bookedBy;
    }
    public void setIsBooked(boolean isBooked) {
        this.isBooked = isBooked;
    }
    public void setCheckInTime(String checkInTime) {
        this.checkInTime = checkInTime;
    }
    public void setCheckOutTime(String checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public void setParkingSlotId(Long parkingSlotId) {
        this.parkingSlotId = parkingSlotId;
    }
    public void setBookedBy(Long bookedBy)
    {
        this.bookedBy = bookedBy;
    }

}
