create table user (
  id int unsigned primary key auto_increment not null,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email varchar(255) not null unique,
  password varchar(255) not null
);
