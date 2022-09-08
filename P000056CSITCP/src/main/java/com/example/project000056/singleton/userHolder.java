package com.example.project000056.singleton;

import com.example.project000056.model.User;

//This is a singleton class. It keeps track of the User globally.
public final class userHolder {

    private User user;
    private final static userHolder INSTANCE = new userHolder();

    private userHolder() { }

    public static userHolder getInstance() { return INSTANCE; }

    public void setUser(User user) { this.user = user; }

    public User getUser() { return user; }

}