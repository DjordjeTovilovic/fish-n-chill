-- Lozinke su hesovane pomocu BCrypt algoritma https://www.dailycred.com/article/bcrypt-calculator
-- Lozinka za oba user-a je 123

INSERT INTO USERS (username, password, first_name, last_name, email, address, city, country, phone_number, enabled, last_password_reset_date) VALUES ('user', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Marko', 'Markovic', 'user@example.com', 'Jug Bogdana 22/7', 'Novi Sad', 'Serbia', '+381665059512', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ( 'cottageUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Simo', 'Simic', 'cottageUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('boatUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Boto', 'Botic', 'boatUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('adventureUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Advo', 'Advic', 'adventureUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Nikola', 'Nikolic', 'admin@example.com', true, '2017-10-01 18:57:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, address, city, country, phone_number, enabled, last_password_reset_date) VALUES ( 'user2', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'keko', 'kekic', 'user@gmail.com', 'Bul. Despota Stefana 7', 'Novi Sad', 'Serbia', '+381665059512', true, '2017-10-01 21:58:58.508-07');

INSERT INTO AUTHORITY (name) VALUES ('ROLE_CLIENT');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_COTTAGE_OWNER');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_BOAT_OWNER');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_ADVENTURE_OWNER');
INSERT INTO AUTHORITY (name) VALUES ('ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (3, 3);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (4, 4);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (5, 5);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (6, 1);

INSERT INTO CLIENT (id, penalty_count,loyalty_points) VALUES (1, 3, 10);
INSERT INTO COTTAGE_OWNER (id) VALUES (2);
INSERT INTO BOAT_OWNER (id) VALUES (3);
INSERT INTO ADVENTURE_OWNER (id) VALUES (4);
INSERT INTO CLIENT (id, penalty_count, loyalty_points) VALUES (6, 1, 30);
--inserting for cottages
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Cottage 1', 3.5, 1, 250, '2022-09-06', '2022-09-28', 7, 'Sremska Kamenica 13, Novi Sad', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, cupiditate! Odio, aliquam soluta vel, eum illum corrupti incidunt nobis porro mollitia itaque reiciendis. Aut, minus dolore! Delectus pariatur praesentium dolorem? In at, quibusdam vero eligendi provident veritatis ipsam suscipit nisi similique nulla est magni harum. Cumque maiores eos alias, aperiam ea deleniti voluptatem culpa a perferendis accusantium, necessitatibus velit laborum');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Cottage 2', 0, 0, 300, '2022-09-06', '2022-09-25', 13, 'Svetozara Miletica 2, Veternik(Novi Sad)', 'Najbolji gas od vikendice ikada KEKEKEKEKE');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Cottage 3', 0, 0, 150, '2022-09-13', '2022-09-25', 15, 'Sremska Kamenica 26, Novi Sad', 'Dobra cijena, dobar provod!!!');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Cottage 4', 0, 0, 220, '2022-09-06', '2022-09-25', 10 , 'Svetozara Miletica 32, Veternik(Novi Sad)', 'Dobra vikendica i nista vise!');
--inserting for boats
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Boat 1', 0, 0, 225, '2022-09-02', '2022-09-25', 20, 'Ribarac, Novi Sad', 'Dobra cijena, dobar provod(JAHTA)!!!');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Boat 2', 0, 0, 225, '2022-09-15', '2022-09-25', 7, 'Ribarac, Novi Sad', 'Manji brod valjda');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Boat 3', 0, 0, 225, '2022-09-15', '2022-09-25', 10, 'Ribarac, Novi Sad', 'Veliki brod');
--inserting for adventures
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, capacity, address, description) VALUES ('Adventure 1', 0, 0, 170, '2022-05-23', '2022-09-22', 5, 'Breza 2, Zlatibor', 'All you need in one adventure!!!');


INSERT INTO IMAGE (entity_id, url) VALUES (1, 'https://i.ibb.co/gRhpQYk/cottage1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (2, 'https://i.ibb.co/f9HDvs1/cottage2.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (3, 'https://i.ibb.co/gRhpQYk/cottage1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (4, 'https://i.ibb.co/f9HDvs1/cottage2.jpg');

INSERT INTO IMAGE (entity_id, url) VALUES (5, 'https://i.ibb.co/y6qTpkB/boat1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (6, 'https://i.ibb.co/y6qTpkB/boat1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (7, 'https://i.ibb.co/y6qTpkB/boat1.jpg');

INSERT INTO IMAGE (entity_id, url) VALUES (8, 'https://i.ibb.co/HHJrLzF/adventure1.jpg');

INSERT INTO COTTAGE (id, owner_id) VALUES (1, 2);
INSERT INTO COTTAGE (id, owner_id) VALUES (2, 2);
INSERT INTO COTTAGE (id, owner_id) VALUES (3, 2);
INSERT INTO COTTAGE (id, owner_id) VALUES (4, 2);

INSERT INTO ROOM (number_of_beds, cottage_id) VALUES (2, 1);
INSERT INTO ROOM (number_of_beds, cottage_id) VALUES (3, 1);

INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (500, 5, '2022-08-17', '2022-09-03');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1200, 5, '2022-08-08', '2022-08-12');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1000, 5, '2022-05-03', '2022-05-07');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (2100, 3, '2022-08-03', '2022-08-10');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (600, 5, '2022-06-13', '2022-06-15');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1000, 5, '2022-05-03', '2022-05-07');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1000, 5, '2022-08-18', '2022-08-20');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1000, 5, '2022-08-18', '2022-09-3');
INSERT INTO RESERVATION (price, number_of_guests, reservation_start, reservation_end) VALUES (1000, 5, '2022-08-18', '2022-08-20');


INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (1, 1, 1);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (2, 1, 2);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (3, 1, 1);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (4, 1, 2);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (5, 1, 2);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (6, 6, 1);
INSERT INTO COTTAGE_RESERVATION (id, client_id, entity_id) VALUES (7, 6, 4);


INSERT INTO COTTAGE_ACTION (entity_id, action_price, actual_price, number_of_guests, reservation_start, reservation_end, action_end) VALUES (1, 500, 600, 5, '2022-08-16', '2022-08-19', '2022-08-15');
INSERT INTO COTTAGE_ACTION (entity_id, action_price, actual_price, number_of_guests, reservation_start, reservation_end, action_end) VALUES (1, 300, 600, 5, '2022-08-22', '2022-08-26', '2022-08-21');
INSERT INTO COTTAGE_ACTION (entity_id, action_price, actual_price, number_of_guests, reservation_start, reservation_end, action_end) VALUES (1, 500, 600, 5, '2022-08-10', '2022-08-15', '2022-08-09');
INSERT INTO COTTAGE_ACTION (entity_id, action_price, actual_price, number_of_guests, reservation_start, reservation_end, action_end) VALUES (2, 75, 300, 3, '2022-08-11', '2022-08-14', '2022-08-10');
INSERT INTO COTTAGE_ACTION (entity_id, action_price, actual_price, number_of_guests, reservation_start, reservation_end, action_end) VALUES (2, 300, 400, 13, '2022-08-27', '2022-08-29', '2022-08-26');

INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_model, engine_power, max_speed) VALUES ('yacht', '15', '3A23FB', '400', '120');
INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_model, engine_power, max_speed) VALUES ('smaller boat', '8', 'AA123', '220', '120');
INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_model, engine_power, max_speed) VALUES ('bigger boat', '11', 'AA123', '220', '120');

INSERT INTO BOAT (id, owner_id, boat_specification_id) VALUES (5, 3, 1);
INSERT INTO BOAT (id, owner_id, boat_specification_id) VALUES (6, 3, 2);
INSERT INTO BOAT (id, owner_id, boat_specification_id) VALUES (7, 3, 2);

INSERT INTO BOAT_RESERVATION (id, client_id, entity_id) VALUES (8, 6, 5);


INSERT INTO ADVENTURE (id, owner_id, biography) VALUES (8, 4, 'Your guide and instructor biography!');

INSERT INTO ADVENTURE_RESERVATION (id, client_id, entity_id) VALUES (9, 6, 8);


INSERT INTO RATING (client_id, entity_id, rating) VALUES (1,1,3.5);

INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (false,true,true,false,1)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,true,true,true,2)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,false,true,false,3)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,false,false,false,4)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,false,true,false,5)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,false,true,true,6)
INSERT INTO TAG (air_condition, television, wifi, pet_friendly, entity_id) VALUES (true,false,false,false,7)
