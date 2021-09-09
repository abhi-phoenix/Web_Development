create database xaicyber;

use xaicyber;

create table study(study_id varchar(10), start_of_study datetime, end_of_study datetime,Primary Key(study_id));

create table logs(timestamp varchar(255) ,version varchar(255),user varchar(35) REFERENCES users(user_id), network varchar(255), id varchar(255), button_type varchar(255), resources varchar(255), primary key(timestamp, user, version ));

create table users(user_id varchar(35), name varchar(35), email varchar(35), primary key(user_id));

create table completion_study(study_id varchar(10), user_id varchar(35), start_time varchar(40), end_time varchar(40), completion_code varchar(10), primary key(study_id, user_id), foreign key(study_id) references study(study_id), foreign key(user_id) references users(user_id) on delete cascade);
