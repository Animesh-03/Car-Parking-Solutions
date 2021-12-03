package com.example.demo;

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
@RequestMapping(path = "/orders")
public class OrderController 
{
    @Autowired
    OrderRepository orderRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Order> getAllOrders()
    {
        return orderRepository.findAll();
    }

    @GetMapping(path = "/get")
    public @ResponseBody Iterable<Order> getByCustomer(Long id)
    {
        return orderRepository.findIncompleteOrdersByBookedBy(id);
    }

    @PostMapping(path = "/new")
    public @ResponseBody Order addNewOrder(@RequestParam Long locationId,@RequestParam Long bookedBy,@RequestParam Long slotId,@RequestParam boolean wantDryWash,@RequestParam boolean wantCarWash,@RequestParam boolean wantRepairs,@RequestParam String checkInTime,@RequestParam String checkOutTime,@RequestParam Long amount, @RequestParam String bookingDate)
    {
        Order o = new Order(locationId, bookedBy, slotId, wantDryWash, wantCarWash, wantRepairs, checkInTime, checkOutTime, amount, bookingDate);
        o.setSlotId(slotId);
        orderRepository.save(o);

        return o;
    }

    @GetMapping(path = "/getInLocation")
    public @ResponseBody Iterable<Order> getOrdersInLocation(Long id)
    {
        return orderRepository.findByAssignedToEmployee(id);
    }

    @PostMapping(path = "/finalise")
    public @ResponseBody String completeOrder(Long id)
    {
        Order o = orderRepository.findById(id).get();
        o.setCheckedOut(true);
        orderRepository.save(o);
        return "Saved";
    }
}
