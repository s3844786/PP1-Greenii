package com.example.project000056.repository;

import com.example.project000056.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // custom query to get Order by UserID
    @Query("select o from Order o where o.userID = ?1")
    public List<Order> findOrderByUserID(Long input);

    Optional<Order> findById(Long input);

    @Query("select o from Order o where o.status = 'waiting'")
    public List<Order> findWaitingOrder();

    // custom query to get Order by UserID
    @Query("select o from Order o where o.driverID = ?1")
    public List<Order> findByDriverID(int input);
}

