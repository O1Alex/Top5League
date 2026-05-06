USE top5league;

-- INSERT INTO users (username, email, password, role, favorite_player)
-- VALUES
-- ('admin', 'admin@top5league.test', 'admin123', 'admin', NULL),
-- ('lukaFan', 'lukafan@top5league.test', 'luka123', 'user', 'Luka Doncic'),
-- ('giannisFan', 'giannisfan@top5league.test', 'giannis123', 'user', 'Giannis Antetokounmpo'),
-- ('curryNation', 'currynation@top5league.test', 'curry123', 'user', 'Stephen Curry'),
-- ('jokicMVP', 'jokicmvp@top5league.test', 'jokic123', 'user', 'Nikola Jokic'),
-- ('kdSniper', 'kdsniper@top5league.test', 'kd123', 'user', 'Kevin Durant'),
-- ('dameTime', 'dametime@top5league.test', 'tatum123', 'user', NULL),
-- ('bronLegacy', 'bronlegacy@top5league.test', 'bron123', 'user', 'LeBron James'),
-- ('anonymousHooper', 'anonymoushooper@top5league.test', 'anonymous123', 'user', NULL);


-- MONTH 1 "PUBLISHED"

INSERT INTO months (label, start_date, end_date, publish_date, status)
VALUES ('2026-04', '2026-04-01', '2026-04-05', '2026-04-30', 'published');

INSERT INTO monthly_players (month_id, fullname, position, team_name, pts, ast, reb, photo_url)
VALUES
(1, 'Luka Doncic', 'PG', 'Dallas Mavericks', 33.1, 9.2, 8.4, "http://localhost:3000/public/basket-player.png"),
(1, 'Stephen Curry', 'PG', 'Golden State Warriors', 28.4, 6.1, 4.5, "http://localhost:3000/public/basket-player.png"),
(1, 'Jayson Tatum', 'SF', 'Boston Celtics', 30.0, 4.8, 8.2, "http://localhost:3000/public/basket-player.png"),
(1, 'Giannis Antetokounmpo', 'PF', 'Milwaukee Bucks', 31.2, 6.0, 12.1, "http://localhost:3000/public/basket-player.png"),
(1, 'Nikola Jokic', 'C', 'Denver Nuggets', 26.7, 9.8, 12.3, "http://localhost:3000/public/basket-player.png"),
(1, 'Shai Gilgeous-Alexander', 'PG', 'Oklahoma City Thunder', 27.5, 4.4, 5.6, "http://localhost:3000/public/basket-player.png"),
(1, 'Kevin Durant', 'SG', 'Phoenix Suns', 27.9, 5.4, 6.8, "http://localhost:3000/public/basket-player.png"),
(1, 'Devin Booker', 'SG', 'Phoenix Suns', 27.2, 7.3, 4.1, "http://localhost:3000/public/basket-player.png"),
(1, 'Joel Embiid', 'C', 'Philadelphia 76ers', 30.3, 4.9, 10.8, "http://localhost:3000/public/basket-player.png"),
(1, 'Anthony Edwards', 'SG', 'Minnesota Timberwolves', 26.4, 5.1, 5.7, "http://localhost:3000/public/basket-player.png"),
(1, 'LeBron James', 'SF', 'Los Angeles Lakers', 25.8, 7.2, 7.9, "http://localhost:3000/public/basket-player.png"),
(1, 'Anthony Davis', 'PF', 'Los Angeles Lakers', 24.0, 3.1, 12.2, "http://localhost:3000/public/basket-player.png" ),
(1, 'Kawhi Leonard', 'SF', 'LA Clippers', 24.6, 3.9, 6.3, "http://localhost:3000/public/basket-player.png"),
(1, 'Victor Wembanyama', 'C', 'San Antonio Spurs', 24.4, 4.9, 8.6, "http://localhost:3000/public/basket-player.png"),
(1, 'Bam Adebayo', 'C', 'Miami Heat', 21.2, 4.1, 10.4, "http://localhost:3000/public/basket-player.png"),
(1, 'Jimmy Butler', 'SF', 'Miami Heat', 20.5, 5.6, 5.1, "http://localhost:3000/public/basket-player.png"),
(1, 'Damian Lillard', 'PG', 'Milwaukee Bucks', 26.0, 7.0, 4.2, "http://localhost:3000/public/basket-player.png"),
(1, 'Jaylen Brown', 'SG', 'Boston Celtics', 23.1, 3.6, 5.4, "http://localhost:3000/public/basket-player.png"),
(1, 'Kristaps Porzingis', 'PF', 'Boston Celtics', 20.4, 2.1, 7.1, "http://localhost:3000/public/basket-player.png"),
(1, 'Domantas Sabonis', 'PF', 'Sacramento Kings', 19.8, 7.9, 13.0, "http://localhost:3000/public/basket-player.png");

INSERT INTO lineups (user_id, month_id) VALUES (2, 1), (4, 1), (5, 1);

INSERT INTO lineup_players (lineup_id, monthly_player_id, predicted_pts, predicted_ast, predicted_reb)
VALUES
(1, 1, 33.0, 9.0, 8.0),(1, 3, 28.0, 6.0, 4.0),(1, 4, 30.0, 5.0, 8.0),(1, 5, 31.0, 6.0, 12.0),(1, 7, 27.0, 10.0, 12.0),
(2, 2, 26.0, 7.0, 4.0),(2, 14, 27.0, 4.0, 5.0),(2, 7, 28.0, 5.0, 6.0),(2, 13, 31.0, 6.0, 12.0),(2, 4, 30.0, 5.0, 10.0),
(3, 6, 31.0, 5.2, 3.0),(3, 11, 28.0, 7.0, 6.0),(3, 18, 28.8, 8.1, 3.2),(3, 20, 28.0, 6.4, 14.6),(3, 14, 30.0, 5.5, 12.0);

INSERT INTO official_lineups (month_id, method) VALUES (1, 'manual');

INSERT INTO official_lineup_players (official_lineup_id, monthly_player_id, pts, ast, reb)
VALUES
(1, 2, 33.1, 9.2, 8.4),(1, 14, 28.4, 6.1, 4.5),(1, 7, 30.0, 4.8, 8.2),(1, 13, 31.2, 6.0, 12.1),(1, 4, 26.7, 9.8, 12.3);

INSERT INTO winners (month_id, user_id, score, reward_status)
VALUES (1, 4, 5, 'pending');



-- MONTH 2 "OPEN"

INSERT INTO months (label, start_date, end_date, publish_date, status)
VALUES ('2026-05', '2026-05-01', '2026-05-05', '2026-05-31', 'open');

INSERT INTO monthly_players (month_id, fullname, position, team_name, pts, ast, reb, photo_url)
VALUES
(2, 'Luka Doncic', 'PG', 'Dallas Mavericks', 33.1, 9.2, 8.4, "http://localhost:3000/public/basket-player.png"),
(2, 'Stephen Curry', 'PG', 'Golden State Warriors', 28.4, 6.1, 4.5, "http://localhost:3000/public/basket-player.png"),
(2, 'Jayson Tatum', 'SF', 'Boston Celtics', 30.0, 4.8, 8.2, "http://localhost:3000/public/basket-player.png"),
(2, 'Giannis Antetokounmpo', 'PF', 'Milwaukee Bucks', 31.2, 6.0, 12.1, "http://localhost:3000/public/basket-player.png"),
(2, 'Nikola Jokic', 'C', 'Denver Nuggets', 26.7, 9.8, 12.3, "http://localhost:3000/public/basket-player.png"),
(2, 'Shai Gilgeous-Alexander', 'PG', 'Oklahoma City Thunder', 27.5, 4.4, 5.6, "http://localhost:3000/public/basket-player.png"),
(2, 'Kevin Durant', 'SG', 'Phoenix Suns', 27.9, 5.4, 6.8, "http://localhost:3000/public/basket-player.png"),
(2, 'Devin Booker', 'SG', 'Phoenix Suns', 27.2, 7.3, 4.1, "http://localhost:3000/public/basket-player.png"),
(2, 'Joel Embiid', 'C', 'Philadelphia 76ers', 30.3, 4.9, 10.8, "http://localhost:3000/public/basket-player.png"),
(2, 'Anthony Edwards', 'SG', 'Minnesota Timberwolves', 26.4, 5.1, 5.7, "http://localhost:3000/public/basket-player.png"),
(2, 'LeBron James', 'SF', 'Los Angeles Lakers', 25.8, 7.2, 7.9, "http://localhost:3000/public/basket-player.png"),
(2, 'Anthony Davis', 'PF', 'Los Angeles Lakers', 24.0, 3.1, 12.2, "http://localhost:3000/public/basket-player.png" ),
(2, 'Kawhi Leonard', 'SF', 'LA Clippers', 24.6, 3.9, 6.3, "http://localhost:3000/public/basket-player.png"),
(2, 'Victor Wembanyama', 'C', 'San Antonio Spurs', 24.4, 4.9, 8.6, "http://localhost:3000/public/basket-player.png"),
(2, 'Bam Adebayo', 'C', 'Miami Heat', 21.2, 4.1, 10.4, "http://localhost:3000/public/basket-player.png"),
(2, 'Jimmy Butler', 'SF', 'Miami Heat', 20.5, 5.6, 5.1, "http://localhost:3000/public/basket-player.png"),
(2, 'Damian Lillard', 'PG', 'Milwaukee Bucks', 26.0, 7.0, 4.2, "http://localhost:3000/public/basket-player.png"),
(2, 'Jaylen Brown', 'SG', 'Boston Celtics', 23.1, 3.6, 5.4, "http://localhost:3000/public/basket-player.png"),
(2, 'Kristaps Porzingis', 'PF', 'Boston Celtics', 20.4, 2.1, 7.1, "http://localhost:3000/public/basket-player.png"),
(2, 'Domantas Sabonis', 'PF', 'Sacramento Kings', 19.8, 7.9, 13.0, "http://localhost:3000/public/basket-player.png");

INSERT INTO lineups (user_id, month_id) VALUES (2, 2), (4, 2);

INSERT INTO lineup_players (lineup_id, monthly_player_id, predicted_pts, predicted_ast, predicted_reb)
VALUES
(4, 21, 33.0, 9.0, 8.0),(4, 23, 28.0, 6.0, 4.0),(4, 24, 30.0, 5.0, 8.0),(4, 25, 31.0, 6.0, 12.0),(4, 27, 27.0, 10.0, 12.0),
(5, 22, 26.0, 7.0, 4.0),(5, 34, 27.0, 4.0, 5.0),(5, 27, 28.0, 5.0, 6.0),(5, 33, 31.0, 6.0, 12.0),(5, 24, 30.0, 5.0, 10.0);
