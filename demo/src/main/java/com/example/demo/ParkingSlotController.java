package com.example.demo;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/slots")
public class ParkingSlotController 
{
    @Autowired
    private ParkingSlotRepository parkingSlotRepository;    

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<ParkingSlot> getAllParkingSlots()
    {
        return parkingSlotRepository.findAll();
    }

    @GetMapping(path="/get")
    public @ResponseBody Optional<ParkingSlot> getParkingSlot(@RequestParam Long id)
    {
        return parkingSlotRepository.findById(id);
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateSlot(@RequestParam Long slotId,@RequestParam String checkInTime, @RequestParam String checkOutTime, @RequestParam Long bookedBy)
    {
        ParkingSlot slot = parkingSlotRepository.findById(slotId).get();
        slot.setCheckInTime(checkInTime);
        slot.setCheckOutTime(checkOutTime);
        slot.setBookedBy(bookedBy);
        slot.setIsBooked(true);
        parkingSlotRepository.save(slot);
        return "saved";
    } //

    @PostMapping(path = "/add")
    public @ResponseBody String addNewSlot(@RequestParam String location)
    {
        ParkingSlot slot = new ParkingSlot();
        slot.setLocation(location);
        parkingSlotRepository.save(slot);
        return "Saved";
    }
}
