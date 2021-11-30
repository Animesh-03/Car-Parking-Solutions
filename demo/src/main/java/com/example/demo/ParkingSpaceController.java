package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/location")
public class ParkingSpaceController 
{
    @Autowired
    private ParkingSpaceRepository parkingSpaceRepository;
    
    @GetMapping(path = "/all")
    public Iterable<ParkingSpace> getAllParkingSpaces() {
        return parkingSpaceRepository.findAll();
    }

    @GetMapping(value="/get")
    public @ResponseBody ParkingSpace getParkingSpace(@RequestParam Long id) {
        return parkingSpaceRepository.findById(id).get();
    }

    @PostMapping(path = "/add")
    public @ResponseBody String addParkingSpace(@RequestParam String location, @RequestParam boolean offeredDryWash, @RequestParam boolean offeredCarWash, @RequestParam boolean offeredRepairs)
    {
        ParkingSpace p = new ParkingSpace(location,offeredDryWash,offeredCarWash,offeredRepairs);
        parkingSpaceRepository.save(p);
        return "Saved";
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String deleteLocation(@RequestParam Long id)
    {
        parkingSpaceRepository.deleteById(id);

        return "Deleted";
    }
    
}
