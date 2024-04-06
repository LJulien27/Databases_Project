CREATE TABLE chains ( 

    name VARCHAR(255) PRIMARY KEY, 

    address VARCHAR(255) , 

    num_hotels int 

); 

 

INSERT INTO chains 

  ( name, address, num_hotels ) 

VALUES 

  ('Hilton', '588 Rodeo Dr', 5),  

  ('Mariott', '4 Stacey Pkwy', 3),  

  ('Odyssey', '99 Crumple St', 2), 

  ('Holiday Inn', '101 Red Valley Rd', 4); 

 

CREATE TABLE hotels ( 

    id SERIAL PRIMARY KEY, 

   name VARCHAR(255), 

    address VARCHAR(255), 

    chain_name VARCHAR(255) REFERENCES chains(name) ON DELETE SET NULL, 

    ratings int 

); 

INSERT INTO hotels 

  ( name, address, chain_name, ratings ) 

VALUES 

  (1, 'Hilton Ottawa', '1210 Matheson Rd', 'Hilton', 5),  

  (2, 'Hilton Kanata', '1102 Eaglewood Blvd', 'Hilton', 4), 

  (3, 'Holiday Inn St-Laurent', '1245 St-Laurent Blvd', 'Holiday Inn', 3), 

  (4, 'Mariott Rideau', '506 Rideau Rd', 'Mariott', 5), 

  (5, 'Hilton Kingston', '140 Waverley St', 'Hilton', 4), 

  (6, 'Hilton Montreal', '1200 St-Catherine St', 'Hilton', 5), 

  (7, 'Hilton Revelstoke', '405 Camozzi Rd', 'Hilton', 5), 

  (8, 'The Krusty Towers', '15 Fishhook Ln', 'Odyssey', 2), 

  (9, 'Mariott Sunnyvale', '100 Oceanside Dr', 'Mariott', 5), 

  (10, 'Mariott Sicily', '118 Roma St', 'Mariott', 3), 

  (11, 'Holiday Inn Peterborough', '120 Mark St', 'Holiday Inn', 1), 

  (12, 'Holiday Inn Bells Corners', '14 Westcliff Rd', 'Holiday Inn', 4), 

  (13, 'Holiday Inn Rockland', 'St-Joseph St', 'Holiday Inn', 3), 

  (14, 'The Kingly Suites', '44 Riverside Dr', 'Odyssey', 5); 

 

CREATE TABLE rooms ( 

    id SERIAL PRIMARY KEY, 

    hotel_id int, 

    price int, 

    capacity int, 

    view VARCHAR(255), 

    problems VARCHAR(255), 

    expanding bool, 

    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE 

); 

 

 

 

 

 

INSERT INTO rooms  

  ( hotel_id, price, capacity, view, problems, expanding ) 

VALUES  

  (1, 185, 2, 'lake', 'None', false), 

  (5, 200, 3, 'mountain', 'Air conditioning', true), 

  (7, 150, 2, 'skyline', 'None', false), 

  (10, 100, 4, 'none', 'TV not working', false), 

  (14, 250, 2, 'lake', 'None', true), 

  (2, 100, 2, 'lake', 'None', false), 

  (4, 200, 3, 'mountain', 'Air conditioning', true), 

  (3, 150, 2, 'skyline', 'None', false), 

  (11, 80, 4, 'none', 'TV not working', false), 

  (12, 250, 2, 'lake', 'None', true), 

 (3, 120, 2, 'lake', 'None', false), 

 (6, 210, 3, 'mountain', 'Air conditioning', true), 

 (9, 180, 2, 'skyline', 'None', false), 

 (12, 350, 4, 'none', 'TV not working', false), 

 (2, 260, 2, 'lake', 'None', true), 

 (4, 130, 2, 'mountain', 'None', false), 

 (8, 220, 3, 'skyline', 'Air conditioning', true), 

 (12, 190, 2, 'none', 'None', false), 

 (13, 360, 4, 'lake', 'TV not working', false), 

 (1, 270, 2, 'mountain', 'None', true), 

 (5, 140, 2, 'skyline', 'None', false), 

 (7, 230, 3, 'none', 'Air conditioning', true), 

 (3, 120, 2, 'lake', 'None', false), 

 (6, 210, 3, 'mountain', 'Air conditioning', true), 

 (9, 180, 2, 'skyline', 'None', false), 

 (12, 350, 4, 'none', 'TV not working', false), 

 (2, 260, 2, 'lake', 'None', true), 

 (4, 130, 2, 'mountain', 'None', false), 

 (8, 220, 3, 'skyline', 'Air conditioning', true), 

 (10, 190, 2, 'none', 'None', false), 

 (13, 360, 4, 'lake', 'TV not working', false), 

 (1, 270, 2, 'mountain', 'None', true), 

 (5, 140, 2, 'skyline', 'None', false), 

 (7, 230, 3, 'none', 'Air conditioning', true); 

 

CREATE TABLE clients ( 

    f_name VARCHAR(255), 

    l_name VARCHAR(255), 

    sin int PRIMARY KEY, 

    address VARCHAR(255), 

    r_date DATE 

); 

 

INSERT INTO clients 

  (f_name, l_name, sin, address, r_date) 

VALUES  

  ('John', 'Doe', 123456789, 'john.doe@gmail.com', '2003-04-01'), 

  ('Jane', 'Smith', 987654321, 'jane.smith@rogers.ca', '2005-06-15'), 

  ('Bob', 'Johnson', 456123789, 'mrjohnson48@hotmail.com', '2010-12-20'), 

  ('Alice', 'Williams', 321789456, 'willsa22@gmail.com', '2015-07-30'), 

  ('Charlie', 'Brown', 654321987, 'browntown36@michael.net', '2020-09-10'), 

  ('Cindy', 'Lauper', 123789456, 'lauperc@gmail.com', '2020-10-10'); 

 

 

CREATE TABLE employees ( 

    f_name VARCHAR(255), 

    l_name VARCHAR(255), 

    sin int PRIMARY KEY, 

    address VARCHAR(255), 

    role VARCHAR(255), 

    hotel_id int, 

    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE 

); 

 

INSERT INTO employees 

  (f_name, l_name, sin, address, role, hotel_id) 

VALUES  

  ('Jason', 'Alexander', 133446383, 'alexj@hotmail.com', 'concierge', 1), 

  ('Jon', 'Snow', 551161864, 'snowman43@gmail.com', 'room service', 11), 

  ('Elizabeth', 'Warren', 598649527, 'warburger11@yahoo.com', 'manager', 12), 

  ('Milicent', 'Johannesburg', 68597541, 'millievanillie@gmail.com', 'executive manager', 10), 

  ('Chris', 'Milton', 96852157, 'milkman101@gmail.com', 'concierge', 4), 

  ('Stacey', 'Kitchener', 987521855, 'swiftie4lyfe@hotmail.com', 'manager', 6), 

  ('Alan', 'Bankman', 999999777, 'bankman03@rogers.ca', 'executive manager', 2), 

  ('Balduran', 'Gate', 300231442, 'gateb02@gmail.com', 'executive manager', 5), 

  ('Dominique', 'Lavallee', 191970121, 'dl77@bell.net', 'manager', 3), 

  ('Alex', 'Caruso', 916817363, 'carushow06@yahoo.com', 'concierge', 8), 

  ('Chris', 'Stapleton', 111111111, 'staples.chris@real.tv', 'room service', 9), 

  ('Connie', 'Saperstein', 794566856, 'yes4connie@gmail.com', 'room service', 7), 

  ('Lance', 'Nielson', 582582825, 'bikesrfun@gmail.com', 'manager', 13), 

  ('Sandra', 'Nixon', 693639798, 'nixon.sandra@hotmail.com', 'executive manager', 14), 

  ('Daniel', 'Samson', 145643258, 'sanieldamson@bell.net', 'concierge', 5); 

 

 

CREATE TABLE commodities ( 

    id_room int PRIMARY KEY, 

    tv bool, 

    ac bool, 

    fridge bool, 

    laundry bool, 

    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE CASCADE 

); 

 

INSERT INTO commodities 

  (id_room, tv, ac, fridge, laundry) 

VALUES  

(1, true, false, true, true), 

(2, false, true, false, false), 

(3, true, true, true, false), 

(4, false, false, true, true), 

(5, true, false, false, true), 

(6, false, true, true, false), 

(7, true, true, false, true), 

(8, false, false, false, false), 

(9, true, true, true, true), 

(10, false, true, false, true), 

(11, true, false, true, false), 

(12, false, true, true, true), 

(13, true, false, false, false), 

(14, false, true, false, false), 

(15, true, true, true, false), 

(16, false, false, true, true), 

(17, true, false, false, true), 

(18, false, true, true, false), 

(19, true, true, false, true), 

(20, false, false, false, false), 

(21, true, true, true, true), 

(22, false, true, false, true), 

(23, true, false, true, false), 

(24, false, true, true, true), 

(25, true, false, false, false), 

(26, false, true, false, false), 

(27, true, true, true, false), 

(28, false, false, true, true), 

(29, true, false, false, true), 

(30, false, true, true, false), 

(31, true, true, false, true), 

(32, false, false, false, false), 

(33, true, true, true, true), 

(34, false, true, false, true); 

 

CREATE TABLE reservations ( 

    client_sin int, 

    id_room int, 

    s_date DATE, 

    e_date DATE, 

    PRIMARY KEY (client_sin, id_room), 

    FOREIGN KEY (client_sin) REFERENCES clients(sin) ON DELETE CASCADE, 

    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE CASCADE 

); 

 

INSERT INTO reservations  

  ( client_sin, id_room, s_date, e_date ) 

VALUES 

  (123456789, 1, '2024-04-15', '2024-04-25'), 

  (987654321, 2, '2024-04-13', '2024-04-20'), 

  (456123789, 3, '2024-04-18', '2024-04-07'), 

  (321789456, 4, '2024-04-01', '2024-04-15'), 

  (654321987, 5, '2024-05-01', '2024-05-10'), 

  (654321987, 6, '2024-06-01', '2024-06-05'), 

  (456123789, 7, '2024-07-01', '2024-07-10'), 

  (123789456, 8, '2024-07-01', '2024-07-15'), 

  (987654321, 9, '2024-06-01', '2024-06-10'), 

  (123456789, 10, '2024-08-01', '2024-08-05'), 

  (987654321, 11, '2024-10-01', '2024-10-10'), 

  (456123789, 12, '2024-12-01', '2024-12-15'); 

 

CREATE TABLE rentals ( 

    client_sin int, 

    id_room int, 

    s_date DATE, 

    e_date DATE, 

    id SERIAL PRIMARY KEY, 

    FOREIGN KEY (client_sin) REFERENCES clients(sin) ON DELETE SET NULL, 

    FOREIGN KEY (id_room) REFERENCES rooms(id) ON DELETE SET NULL 

); 

INSERT INTO rentals  

  (client_sin, id_room, s_date, e_date) 

VALUES  

  (123456789, 1, '2023-01-01', '2023-01-05'), 

  (987654321, 2, '2023-02-01', '2023-02-10'), 

  (456123789, 3, '2023-03-01', '2023-03-07'), 

  (321789456, 4, '2023-04-01', '2023-04-15'), 

  (654321987, 5, '2023-05-01', '2023-05-10'), 

  (123456789, 6, '2023-06-01', '2023-06-05'), 

  (321789456, 7, '2023-07-01', '2023-07-10'), 

  (123789456, 8, '2023-08-01', '2023-08-15'), 

  (456123789, 9, '2023-09-01', '2023-09-10'), 

  (123456789, 10, '2023-10-01', '2023-10-05'), 

  (987654321, 11, '2023-11-01', '2023-11-10'), 

  (456123789, 12, '2023-12-01', '2023-12-15'), 

  (321789456, 13, '2023-01-15', '2023-01-25'), 

  (654321987, 14, '2023-02-15', '2023-02-25'), 

  (987654321, 15, '2023-03-15', '2023-03-25'), 

  (321789456, 16, '2023-04-15', '2023-04-25'), 

  (123789456, 17, '2023-05-15', '2023-05-25'), 

  (456123789, 18, '2023-06-15', '2023-06-25'), 

  (123456789, 19, '2023-07-15', '2023-07-25'), 

  (987654321, 20, '2023-08-15', '2023-08-25'), 

  (456123789, 21, '2023-09-15', '2023-09-25'), 

  (321789456, 22, '2023-10-15', '2023-10-25'), 

  (654321987, 23, '2023-11-15', '2023-11-25'), 

  (654321987, 24, '2023-12-15', '2023-12-25'); 

 

CREATE TABLE mailbank ( 

    email VARCHAR(255) PRIMARY KEY, 

    chain_name VARCHAR(255), 

    hotel_id INT, 

    FOREIGN KEY (chain_name) REFERENCES chains(name) ON DELETE CASCADE, 

    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE 

); 

 

INSERT INTO mailbank 

  ( email, chain_name, hotel_id ) 

VALUES 

  ('mgmt@hiltonresorts.com', 'Hilton', null ), 

  ('execs@mariott.com', 'Mariott', null ), 

  ('assistance@odysseyvacations.com', 'Odyssey', null ), 

  ('management@holidayinn.com', 'Holiday Inn', null ), 

  ('support.ottawa@hiltonresorts.com', null, 1 ),  

  ('support.kanata@hiltonresorts.com', null, 2 ), 

  ('help@holidaystlaurent.ca', null, 3 ), 

  ('support@mariottrideau.ca', null, 4 ), 

  ('support.kingston@hiltonresorts.com', null, 5 ), 

  ('support.montreal@hiltonresorts.com', null, 6 ), 

  ('support.revelstoke@hiltonresorts.com', null, 7 ), 

  ('helpme@thekrustytowers.com', null, 8 ), 

  ('support@mariottsunnyvale.com', null, 9 ), 

  ('support@mariottsicily.com', null, 10), 

  ('help@holidayinnpeterborough.com', null, 11 ), 

  ('help@holidayinnbellscorners.com', null, 12 ), 

  ('help@holidayinnrockland.com', null, 13 ), 

  ('helpme@thekinglysuites.ca', null, 14 ); 

 

CREATE TABLE phonebank ( 

    phone_number CHAR(15) PRIMARY KEY, 

    chain_name VARCHAR(255), 

    hotel_id INT, 

    FOREIGN KEY (chain_name) REFERENCES chains(name) ON DELETE CASCADE, 

    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE 

); 

 

INSERT INTO phonebank 

  (phone_number, chain_name, hotel_id ) 

VALUES 

  ('888-114-1144', 'Hilton', null ), 

  ('606-343-4343', 'Mariott', null ), 

  ('511-139-8888', 'Odyssey', null ), 

  ('901-123-1234', 'Holiday Inn', null ), 

  ('738-293-1913', null, 1 ),  

  ('967-314-1111', null, 2 ), 

  ('876-876-8761', null, 3 ), 

  ('613-738-1000', null, 4 ), 

  ('883-163-2484', null, 5 ), 

  ('643-333-8967', null, 6 ), 

  ('901-615-0010', null, 7 ), 

  ('514-256-0504', null, 8 ), 

  ('705-411-6181', null, 9 ), 

  ('611-787-4004', null, 10), 

  ('888-123-8462', null, 11 ), 

  ('613-441-4567', null, 12 ), 

  ('808-404-5555', null, 13 ), 

  ('743-781-9081', null, 14 ); 