package com.example.demo;

import java.util.List;

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
@RequestMapping(path = "/users")
public class UserController 
{
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestParam String firstName, @RequestParam String lastName,@RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String phoneNumber, @RequestParam(defaultValue = "customer") String role)
    {
        User n = new User(firstName,lastName,username,password,email,phoneNumber,role);
        userRepository.save(n);
        return "Saved";
    }

    @PostMapping("/addBalance")
    public @ResponseBody String addBalance(Long id, Long amount)
    {
        User u = userRepository.findById(id).get();
        Long currentBalance = u.getBalance();
        if(currentBalance == null)
            currentBalance = (long)0;
        u.setBalance(currentBalance + amount);
        userRepository.save(u);
        return "Added";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/get")
    public List<User> getUser(@RequestParam(value = "userID") String userID)
    {
        return userRepository.findByUsername(userID);
    }
}