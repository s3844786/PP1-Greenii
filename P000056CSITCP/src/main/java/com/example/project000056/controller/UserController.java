package com.example.project000056.controller;

import com.example.project000056.email.EmailSendBox;
import com.example.project000056.email.MailService;
import com.example.project000056.model.ERole;
import com.example.project000056.model.Role;
import com.example.project000056.model.User;
import com.example.project000056.payload.request.LoginRequest;
import com.example.project000056.payload.request.SignupRequest;
import com.example.project000056.payload.request.UpdateRequest;
import com.example.project000056.payload.response.JwtResponse;
import com.example.project000056.payload.response.MessageResponse;
import com.example.project000056.qrcode.QRCodeGenerator;
import com.example.project000056.qrcode.QRcodeMaker;
import com.example.project000056.repository.RoleRepository;
import com.example.project000056.repository.UserRepository;
import com.example.project000056.security.jwt.JwtUtils;
import com.example.project000056.security.services.UserDetailsImpl;
import com.example.project000056.singleton.userHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/")
public class UserController{
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private MailService MailService;

    QRcodeMaker qRcodeUtil = new QRcodeMaker();
    EmailSendBox emailSendBox = new EmailSendBox();

    @Autowired
    JwtUtils jwtUtils;
    private User user;
    private userHolder userHolder;

    @Autowired
    public UserController(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
        QRCodeGenerator qr = new QRCodeGenerator();
        userHolder = userHolder.getInstance();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());


        // set singleton
        User userSignin = new User(userDetails.getId(),userDetails.getUsername(),userDetails.getEmail());
        userHolder.setUser(userSignin);

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PutMapping("/update")
    public ResponseEntity updateUser(@RequestBody UpdateRequest updateRequest) throws Exception {

// *Note from Yohanes = Hi guys, Im using @RequestBody for update user functionality to make it simple for the front-end,
// which means you need use JSON raw in Postman as the parameter. Thanks

        userHolder = userHolder.getInstance();
        // get current user's details
        Optional<User> userOptional =  userRepository.findByUsername(userHolder.getUser().getUsername());
        User updateUser = userOptional.get();
        System.out.println(updateUser.getUsername() + " " + updateUser.getPassword() + " " + updateUser.getPhone());
        // update user's details
        if(!updateRequest.getUsername().isEmpty()) {
            updateUser.setUsername(updateRequest.getUsername());
        }
        if(!updateRequest.getPassword().isEmpty()) {
            updateUser.setPassword(encoder.encode(updateRequest.getPassword()));
        }
        if(!updateRequest.getPhone().isEmpty()) {
            updateUser.setPhone(updateRequest.getPhone());
        }
        // save updated user
        userRepository.save(updateUser);
        System.out.println(updateUser.getUsername() + " " + updateUser.getPassword() + " " + updateUser.getPhone());
        // set singleton
        userHolder.setUser(updateUser);

        return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerDriver(@Valid @RequestBody SignupRequest signUpRequest) {
        userHolder = userHolder.getInstance();

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        if(signUpRequest.getRole() == 1) {
            // Create new user's account
            user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()),signUpRequest.getRole());

            Set<String> strRoles = signUpRequest.getRoles();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            }
            user.setRoles(roles);
            userRepository.save(user);
        } else if (signUpRequest.getRole() == 2){
            // Create new driver's account
            user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()),signUpRequest.getPhone(), signUpRequest.getRole());

            Set<String> strRoles = signUpRequest.getRoles();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role modDriver = roleRepository.findByName(ERole.ROLE_DRIVER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modDriver);
            }
            user.setRoles(roles);
            userRepository.save(user);

        }
        // set singleton
        userHolder.setUser(user);
        System.out.println(user.getId());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}