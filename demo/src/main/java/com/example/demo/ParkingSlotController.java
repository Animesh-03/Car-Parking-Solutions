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

    @GetMapping(path="/getByLocation")
    public @ResponseBody Iterable<ParkingSlot> getAllParkingSlotsinLocation(@RequestParam Long id)
    {
        return parkingSlotRepository.findAllByLocationId(id);
    }

    @GetMapping(path="/get")
    public @ResponseBody ParkingSlot getParkingSlot(@RequestParam Long id)
    {
        return parkingSlotRepository.findById(id).get();
    }

    @GetMapping(path="/getByLocationAndPreference")
    public @ResponseBody Iterable<ParkingSlot> getParkingSlotInLocationByPreference(@RequestParam Long id, @RequestParam String preference)
    {
        return parkingSlotRepository.findAllByLocationAndPreference(id, preference);
    }

    @PostMapping(path = "/update")
    public @ResponseBody String updateSlot(@RequestParam Long slotId,@RequestParam boolean isBooked)
    {
        ParkingSlot slot = parkingSlotRepository.findById(slotId).get();
        slot.setBooked(isBooked);
        parkingSlotRepository.save(slot);
        return "Updated";
    }

    @PostMapping(path = "/setBooked")
    public @ResponseBody String setBooked(Long id)
    {
        ParkingSlot p = parkingSlotRepository.findById(id).get();
        p.setBooked(true);
        parkingSlotRepository.save(p);
        return "Saved";
    }

    @PostMapping(path = "/setNotBooked")
    public @ResponseBody String setNotBooked(Long id)
    {
        ParkingSlot p = parkingSlotRepository.findById(id).get();
        p.setBooked(false);
        parkingSlotRepository.save(p);
        return "Saved";
    }

    @PostMapping(path = "/add")
    public @ResponseBody String addNewSlot(@RequestParam Long locationId, @RequestParam String locationName, @RequestParam String preference)
    {
        ParkingSlot slot = new ParkingSlot(locationId,locationName,preference);
        parkingSlotRepository.save(slot);
        return "Saved";
    }
}
