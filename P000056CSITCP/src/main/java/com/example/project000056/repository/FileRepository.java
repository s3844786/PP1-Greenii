package com.example.project000056.repository;

//import com.example.project000056.model.FileUpload;
import com.example.project000056.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<Order, String>  {
}
