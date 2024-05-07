create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)

);

insert into user(name,contactNumber,email,password,status,role) values('Amdin','1231231231','admin@gmail.com','admin','true','admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(25) NOT NULL,
    primary key(id)

);

create table stage(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NUll,
    categoryID integer NOT NULL,
    description varchar(255),
    status varchar(20),
    primary key(id)
);

create table form(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NUll,
    email varchar(255) NOT NUll,
    enseignant varchar(255) NOT NUll,
    niveauE varchar(50),
    stageDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);