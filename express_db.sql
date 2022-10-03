create table account
(
    id        int auto_increment,
    email     varchar(100) not null,
    user_name int          not null,
    psw       varchar(100) not null,
    constraint account_email_uindex
        unique (email),
    constraint account_id_uindex
        unique (id)
);

alter table account
    add primary key (id);

create table `order`
(
    id                    int auto_increment
        primary key,
    email_address         varchar(100)         not null,
    sender_name           varchar(100)         not null,
    sender_phone_number   int                  not null,
    sender_address        varchar(100)         not null,
    receiver_name         varchar(100)         not null,
    receiver_phone_number int                  not null,
    receiver_address      varchar(100)         not null,
    products_type         varchar(100)         not null,
    products_weight       varchar(100)         not null,
    pickup_time           datetime             not null,
    delivery_status       tinyint(1) default 0 null,
    user_id               int                  not null
);

create table order_list
(
    id       int auto_increment
        primary key,
    user_id  int null,
    order_id int null,
    constraint order_list_account_id_fk
        foreign key (user_id) references account (id),
    constraint order_list_order_id_fk
        foreign key (order_id) references `order` (id)
);

