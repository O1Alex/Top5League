CREATE DATABASE IF NOT EXISTS Top5league;
USE Top5League;


-- CREATE TABLE users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   username VARCHAR(50) NOT NULL UNIQUE,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   role ENUM('user','admin') NOT NULL DEFAULT 'user',
--   favorite_player VARCHAR(100) NULL
-- );


-- CREATE TABLE months (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   label VARCHAR(20) NOT NULL UNIQUE,               
--   start_date DATE NOT NULL,                        
--   end_date DATE NOT NULL,                          
--   publish_date DATE NOT NULL,                      
--   status ENUM('open','closed','published') NOT NULL DEFAULT 'open'
-- );


-- CREATE TABLE monthly_players (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   month_id INT NOT NULL,
--   fullname VARCHAR(100) NOT NULL UNIQUE,
--   position ENUM('PG','SG','SF','PF','C') NOT NULL,
--   team_name VARCHAR(100) NULL,
--   pts DECIMAL(5,2) NOT NULL DEFAULT 0.00,
--   ast DECIMAL(5,2) NOT NULL DEFAULT 0.00,
--   reb DECIMAL(5,2) NOT NULL DEFAULT 0.00,
--   photo_url VARCHAR(255) NULL,

--   FOREIGN KEY (month_id) REFERENCES months(id)
--   ON DELETE CASCADE ON UPDATE CASCADE
-- );


-- CREATE TABLE lineups (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   month_id INT NOT NULL,

--   UNIQUE (user_id, month_id),

--   FOREIGN KEY (user_id) REFERENCES users(id)
--   ON DELETE CASCADE ON UPDATE CASCADE,

--   FOREIGN KEY (month_id) REFERENCES months(id)
--   ON DELETE CASCADE ON UPDATE CASCADE
-- );


-- CREATE TABLE lineup_players (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   lineup_id INT NOT NULL,
--   monthly_player_id INT NOT NULL,

--   FOREIGN KEY (lineup_id) REFERENCES lineups(id)
--   ON DELETE CASCADE ON UPDATE CASCADE,

--   FOREIGN KEY (monthly_player_id) REFERENCES monthly_players(id)
--   ON DELETE RESTRICT ON UPDATE CASCADE
-- );


-- CREATE TABLE official_lineups (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   month_id INT NOT NULL UNIQUE,
--   method ENUM('manual','auto') NOT NULL DEFAULT 'manual',

--   FOREIGN KEY (month_id) REFERENCES months(id)
--   ON DELETE CASCADE ON UPDATE CASCADE
-- ); 

-- CREATE TABLE official_lineup_players (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   official_lineup_id INT NOT NULL,
--   monthly_player_id INT NOT NULL,

--   FOREIGN KEY (official_lineup_id) REFERENCES official_lineups(id)
--   ON DELETE CASCADE ON UPDATE CASCADE,

--   FOREIGN KEY (monthly_player_id) REFERENCES monthly_players(id)
--   ON DELETE RESTRICT ON UPDATE CASCADE
-- );

-- CREATE TABLE winners (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   month_id INT NOT NULL UNIQUE,
--   user_id INT NOT NULL,
--   score INT NOT NULL DEFAULT 0,
--   reward_status ENUM('pending','sent') NOT NULL DEFAULT 'pending',

--   FOREIGN KEY (month_id) REFERENCES months(id)
--   ON DELETE CASCADE ON UPDATE CASCADE,

--   FOREIGN KEY (user_id) REFERENCES users(id)
--   ON DELETE CASCADE ON UPDATE CASCADE
-- );
