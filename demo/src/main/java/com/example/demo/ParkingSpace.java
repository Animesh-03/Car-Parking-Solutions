package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ParkingSpace 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String location;
    private boolean offeredDryWash;
    private boolean offeredCarWash;
    private boolean offeredRepairs;

    public ParkingSpace(String location,boolean offeredDryWash, boolean offeredCarWash, boolean offeredRepairs)
    {
        this.location = location;
        this.offeredDryWash = offeredDryWash;
        this.offeredCarWash = offeredCarWash;
        this.offeredRepairs = offeredRepairs;
    }

    public ParkingSpace() {
        
    }

    public Long getId() {
        return id;
    }
    public String getLocation() {
        return location;
    }
    public boolean isDryWashOffered(){
        return offeredDryWash;
    }
    public boolean isCarWashOffered(){
        return offeredCarWash;
    }
    public boolean isRepairsOffered(){
        return offeredRepairs;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public void setOfferedCarWash(boolean offeredCarWash) {
        this.offeredCarWash = offeredCarWash;
    }
    public void setOfferedDryWash(boolean offeredDryWash) {
        this.offeredDryWash = offeredDryWash;
    }
    public void setOfferedRepairs(boolean offeredRepairs) {
        this.offeredRepairs = offeredRepairs;
    }
    
}
