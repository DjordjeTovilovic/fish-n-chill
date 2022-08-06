-- Lozinke su hesovane pomocu BCrypt algoritma https://www.dailycred.com/article/bcrypt-calculator
-- Lozinka za oba user-a je 123

INSERT INTO USERS (username, password, first_name, last_name, email, address, city, country, phone_number, enabled, last_password_reset_date) VALUES ('user', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Marko', 'Markovic', 'user@example.com', 'Jug Bogdana 22/7', 'Novi Sad', 'Serbia', '+381665059512', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('cottageUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Simo', 'Simic', 'cottageUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('boatUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Boto', 'Botic', 'boatUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('adventureUser', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Advo', 'Advic', 'adventureUser@example.com', true, '2017-10-01 21:58:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, enabled, last_password_reset_date) VALUES ('admin', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Nikola', 'Nikolic', 'admin@example.com', true, '2017-10-01 18:57:58.508-07');
INSERT INTO USERS (username, password, first_name, last_name, email, address, city, country, phone_number, enabled, last_password_reset_date) VALUES ('user2', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'keko', 'kekic', 'user@example.com', 'Bul. Despota Stefana 7', 'Novi Sad', 'Serbia', '+381665059512', true, '2017-10-01 21:58:58.508-07');

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

INSERT INTO CLIENT (id, penalty_count) VALUES (1, 3);
INSERT INTO COTTAGE_OWNER (id) VALUES (2);
INSERT INTO BOAT_OWNER (id) VALUES (3);
INSERT INTO ADVENTURE_OWNER (id) VALUES (4);
INSERT INTO CLIENT (id, penalty_count) VALUES (6, 1);
--inserting for cottages
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Cottage 1', 1.5, 1, 250, '2022-07-06', '2022-08-28', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, cupiditate! Odio, aliquam soluta vel, eum illum corrupti incidunt nobis porro mollitia itaque reiciendis. Aut, minus dolore! Delectus pariatur praesentium dolorem? In at, quibusdam vero eligendi provident veritatis ipsam suscipit nisi similique nulla est magni harum. Cumque maiores eos alias, aperiam ea deleniti voluptatem culpa a perferendis accusantium, necessitatibus velit laborum');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Cottage 2', 4.5, 1, 300, '2022-08-06', '2022-08-25', 'Najbolji gas od vikendice ikada KEKEKEKEKE');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Cottage 3', 3, 1, 150, '2022-08-13', '2022-08-15', 'Dobra cijena, dobar provod!!!');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Cottage 4', 3.5, 1, 220, '2022-08-06', '2022-08-18', 'Dobra vikendica i nista vise!');
--inserting for boats
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Boat 1', 5, 1, 225, '2022-05-23', '2022-08-25', 'Dobra cijena, dobar provod(JAHTA)!!!');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Boat 2', 1, 3, 225, '2022-05-23', '2022-08-15', 'Manji brod valjda');
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Boat 3', 3.5, 4, 225, '2022-05-23', '2022-09-15', 'Veliki brod');
--inserting for adventures
INSERT INTO BASE_ENTITY (name, rating_average, rating_count, price, availability_start, availability_end, description) VALUES ('Adventure 1', 3.5, 1, 170, '2022-05-23', '2022-09-22', 'All you need in one adventure!!!');


INSERT INTO IMAGE (entity_id, url) VALUES (1, 'https://i.ibb.co/gRhpQYk/cottage1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (2, 'https://i.ibb.co/f9HDvs1/cottage2.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (3, 'https://i.ibb.co/gRhpQYk/cottage1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (4, 'https://i.ibb.co/f9HDvs1/cottage2.jpg');

INSERT INTO IMAGE (entity_id, url) VALUES (5, 'https://i.ibb.co/y6qTpkB/boat1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (6, 'https://i.ibb.co/y6qTpkB/boat1.jpg');
INSERT INTO IMAGE (entity_id, url) VALUES (7, 'https://i.ibb.co/y6qTpkB/boat1.jpg');

INSERT INTO IMAGE (entity_id, url) VALUES (8, 'https://i.ibb.co/HHJrLzF/adventure1.jpg');

INSERT INTO COTTAGE (id, owner_id, capacity, address) VALUES (1, 2, 7, 'Sremska Kamenica 13, Novi Sad');
INSERT INTO COTTAGE (id, owner_id, capacity, address) VALUES (2, 2, 13, 'Svetozara Miletica 2, Veternik(Novi Sad)');
INSERT INTO COTTAGE (id, owner_id, capacity, address) VALUES (3, 2, 15, 'Sremska Kamenica 26, Novi Sad');
INSERT INTO COTTAGE (id, owner_id, capacity, address) VALUES (4, 2, 10 , 'Svetozara Miletica 32, Veternik(Novi Sad)');

INSERT INTO RESERVATION (duration, price, reservation_start, reservation_end) VALUES (2, 500, '2022-08-08', '2022-08-10');

INSERT INTO COTTAGE_RESERVATION (id, client_id, cottage_id) VALUES (1, 1, 1);

INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_id, engine_power, max_speed) VALUES ('yacht', '15', '3A23FB', '400', '120');
INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_id, engine_power, max_speed) VALUES ('smaller boat', '8', 'AA123', '220', '120');
INSERT INTO BOAT_SPECIFICATION (boat_type, length, engine_id, engine_power, max_speed) VALUES ('bigger boat', '11', 'AA123', '220', '120');

INSERT INTO BOAT (id, owner_id, boat_specification_id, capacity, address) VALUES (5, 3, 1, 20, 'Ribarac, Dunav');
INSERT INTO BOAT (id, owner_id, boat_specification_id, capacity, address) VALUES (6, 3, 2, 7, 'Oficirac, Dunav');
INSERT INTO BOAT (id, owner_id, boat_specification_id, capacity, address) VALUES (7, 3, 2, 10, 'Oficirac, Dunav');

INSERT INTO ADVENTURE (id, owner_id, biography, capacity, address) VALUES (8, 4, 'Your guide and instructor biography!', 5, 'Mount OZREN');
