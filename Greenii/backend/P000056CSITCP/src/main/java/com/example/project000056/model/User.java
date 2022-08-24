package com.example.project000056.model;
import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name="user", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String username;
    private String password;
    private Boolean verified;
    private int role;
    private String phone;

//    @OneToOne(mappedBy = "user")
//    private Order order;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(	name = "user_role",

            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id")
    )

    private Collection<Role> roles;

    public User() {
        
    }
    public User(String email, String password) {
        super();
        this.email = email;
        this.password = password;
    }
    public User(Long id) {
        this.id = id;
    }
    public User(String email, String username, String password, Collection<Role> roles, boolean loggedIn) {
        super();
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.verified = loggedIn;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public User(String username, String email, String password, int userRole) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = userRole;
    }
    public User(String username, String email, String password, String phone_number, int userRole) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone_number;
        this.role = userRole;
    }
    public User(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean loggedIn) {
        this.verified = loggedIn;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone_number) {
        this.phone = phone_number;
    }
}
