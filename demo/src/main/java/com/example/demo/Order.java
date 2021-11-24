package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "orders")
public class Order 
{   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private Long locationId;
    private Long bookedBy;
    private Long slotId;
    private boolean wantDryWash;
    private boolean wantCarWash;
    private boolean wantRepairs;
    private String checkInTime;
    private String checkOutTime;
    private Long amount;
    private boolean checkedOut;

    public Order(Long locationId, Long bookedBy, Long slotId, boolean wantDryWash, boolean wantCarWash, boolean wantRepairs, String checkInTime, String checkOutTime, Long amount)
    {
        this.locationId = locationId;
        this.bookedBy = bookedBy;
        this.wantDryWash = wantDryWash;
        this.wantCarWash = wantCarWash;
        this.wantRepairs = wantRepairs;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.amount = amount;
        this.checkedOut = false;
    }

    public Order()
    {

    }

    public Long getOrderId() {
        return orderId;
    }
    public Long getLocationId() {
        return locationId;
    }
    public Long getSlotId() {
        return slotId;
    }
    public boolean getDryWash() {
        return wantDryWash;
    }
    public boolean getCarWash() {
        return wantCarWash;
    }
    public boolean getRepairs() {
        return wantRepairs;
    }
    public Long getBookedBy() {
        return bookedBy;
    }
    public Long getAmount() {
        return amount;
    }
    public String getCheckInTime() {
        return checkInTime;
    }
    public String getCheckOutTime() {
        return checkOutTime;
    }
    public boolean getCheckedOut() {
        return checkedOut;
    }
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }
    public void setBookedBy(Long bookedBy) {
        this.bookedBy = bookedBy;
    }
    public void setWantCarWash(boolean wantCarWash) {
        this.wantCarWash = wantCarWash;
    }
    public void setWantDryWash(boolean wantDryWash) {
        this.wantDryWash = wantDryWash;
    }
    public void setWantRepairs(boolean wantRepairs) {
        this.wantRepairs = wantRepairs;
    }
    public void setCheckInTime(String checkInTime) {
        this.checkInTime = checkInTime;
    }
    public void setCheckOutTime(String checkOutTime) {
        this.checkOutTime = checkOutTime;
    }
    public void setAmount(Long amount) {
        this.amount = amount;
    }
    public void setCheckedOut(boolean checkedOut)
    {
        this.checkedOut = checkedOut;
    }
}

