INSERT INTO users (username, email, password, role, favorite_player)
VALUES
('admin', 'admin@top5league.test', '$2y$10$EXAMPLEHASHCHANGEINAPP', 'admin', NULL),
('lukaFan', 'lukafan@top5league.test', 'luka123', 'user', 'Luka Doncic'),
('giannisFan', 'giannisfan@top5league.test', 'giannis123', 'user', 'Giannis Antetokounmpo');
('curryNation', 'currynation@top5league.test', 'curry123', 'user', 'Stephen Curry'),
('jokicMVP', 'jokicmvp@top5league.test', 'jokic123', 'user', 'Nikola Jokic'),
('kdSniper', 'kdsniper@top5league.test', 'kd123', 'user', 'Kevin Durant'),
('tatumTime', 'tatumtime@top5league.test', 'tatum123', 'user', NULL),
('bronLegacy', 'bronlegacy@top5league.test', 'bron123', 'user', 'LeBron James'),
('anonymousHooper', 'anonymoushooper@top5league.test', 'anonymous123', 'user', NULL);


INSERT INTO months (label, start_date, end_date, status)
VALUES ('2026-04', '2026-04-01', '2026-04-05', 'open');

INSERT INTO monthly_players (month_id, fullname, position, team_name, pts, ast, reb)
VALUES
(1, 'Luka Doncic', 'PG', 'Dallas Mavericks', 33.1, 9.2, 8.4),
(1, 'Stephen Curry', 'PG', 'Golden State Warriors', 28.4, 6.1, 4.5),
(1, 'Jayson Tatum', 'SF', 'Boston Celtics', 30.0, 4.8, 8.2),
(1, 'Giannis Antetokounmpo', 'PF', 'Milwaukee Bucks', 31.2, 6.0, 12.1),
(1, 'Nikola Jokic', 'C', 'Denver Nuggets', 26.7, 9.8, 12.3, 59.0),
(1, 'Shai Gilgeous-Alexander', 'PG', 'Oklahoma City Thunder', 27.5, 4.4, 5.6),
(1, 'Kevin Durant', 'SG', 'Phoenix Suns', 27.9, 5.4, 6.8),
(1, 'Devin Booker', 'SG', 'Phoenix Suns', 27.2, 7.3, 4.1),
(1, 'Joel Embiid', 'C', 'Philadelphia 76ers', 30.3, 4.9, 10.8),
(1, 'Anthony Edwards', 'SG', 'Minnesota Timberwolves', 26.4, 5.1, 5.7),
(1, 'LeBron James', 'SF', 'Los Angeles Lakers', 25.8, 7.2, 7.9),
(1, 'Anthony Davis', 'PF', 'Los Angeles Lakers', 24.0, 3.1, 12.2),
(1, 'Kawhi Leonard', 'SF', 'LA Clippers', 24.6, 3.9, 6.3, 49.4),
(1, 'Victor Wembanyama', 'C', 'San Antonio Spurs', 24.4, 4.9, 8.6),
(1, 'Bam Adebayo', 'C', 'Miami Heat', 21.2, 4.1, 10.4),
(1, 'Jimmy Butler', 'SF', 'Miami Heat', 20.5, 5.6, 5.1),
(1, 'Damian Lillard', 'PG', 'Milwaukee Bucks', 26.0, 7.0, 4.2),
(1, 'Jaylen Brown', 'SG', 'Boston Celtics', 23.1, 3.6, 5.4),
(1, 'Kristaps Porzingis', 'PF', 'Boston Celtics', 20.4, 2.1, 7.1),
(1, 'Domantas Sabonis', 'PF', 'Sacramento Kings', 19.8, 7.9, 13.0);

INSERT INTO lineups (user_id, month_id) VALUES (2, 1), (3, 1);

INSERT INTO lineup_players (lineup_id, monthly_player_id)
VALUES
(1, 1),(1, 2),(1, 3),(1, 4),(1, 5);

INSERT INTO lineup_players (lineup_id, monthly_player_id)
VALUES
(2, 17),(2, 6),(2, 7),(2, 4),(2, 9);

INSERT INTO official_lineups (month_id, method) VALUES (1, 'manual');

INSERT INTO official_lineup_players (official_lineup_id, monthly_player_id)
VALUES
(1, 1),(1, 2),(1, 3),(1, 4),(1, 5);

INSERT INTO winners (month_id, user_id, score, reward_status)
VALUES (1, 2, 5, 'pending');