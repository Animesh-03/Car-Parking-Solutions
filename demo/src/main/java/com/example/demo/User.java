package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User 
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String role;
    private Long balance;

    public User(String firstName, String lastName,String username,String password,String email, String phoneNumber, String role)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.balance = (long)0;
    }

    public User()
    {
        
    }

    public Long getId() 
    {
        return id;
    }

    public String getPassword() 
    {
        return password;
    }

    public String getUsername() 
    {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getRole()
    {
        return role;
    }

    public Long getBalance() {
        return balance;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) 
    {
        this.password = password;
    }

    public void setUsername(String username) 
    {
        this.username = username;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }
    public void setRole(String role)
    {
        this.role = role;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }
}
