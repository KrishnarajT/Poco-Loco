create DATABASE pocoloco;
use pocoloco;
CREATE TABLE `user_login` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`user_name` VARCHAR(255) NOT NULL,
	`user_email` VARCHAR(255) NOT NULL,
	`user_pass_hash` VARCHAR(255) NOT NULL UNIQUE,
	`user_salt` VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (`user_id`)
);
CREATE TABLE `user_id_playlist` (
	`song_id` VARCHAR(255) NOT NULL,
	`playlist_id` INT NOT NULL,
	PRIMARY KEY (`song_id`)
);
CREATE TABLE `songs_table` (
	`song_id` VARCHAR(255) NOT NULL,
	`song_name` VARCHAR(255) NOT NULL,
	`song_url` VARCHAR(500) NOT NULL UNIQUE,
	`artist_id` VARCHAR(255) NOT NULL,
	`image_id` VARCHAR(255) NOT NULL,
	`genre` VARCHAR(255) NOT NULL,
	`length` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`song_id`)
);
CREATE TABLE `playlist_table` (
	`playlist_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`playlist_id`)
);
CREATE TABLE `artist_table` (
	`artist_id` VARCHAR(255) NOT NULL,
	`artist_name` VARCHAR(255) NOT NULL DEFAULT 'null',
	`artist_description` VARCHAR(2000) NOT NULL DEFAULT 'This is one of the artists featured on our website. ',
	`birth_date` DATE NOT NULL,
	PRIMARY KEY (`artist_id`)
);
CREATE TABLE `image_table` (
	`image_id` VARCHAR(255) NOT NULL,
	`image_url` VARCHAR(500) NOT NULL,
	`song_id` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`image_id`, `image_url`)
);
CREATE TABLE `lyrics_table` (
	`song_id` VARCHAR(255) NOT NULL,
	`lyrics` VARCHAR(500) NOT NULL,
	PRIMARY KEY (`lyrics`)
);
ALTER TABLE `user_id_playlist`
ADD CONSTRAINT `user_id_playlist_fk0` FOREIGN KEY (`song_id`) REFERENCES `songs_table`(`song_id`);
ALTER TABLE `user_id_playlist`
ADD CONSTRAINT `user_id_playlist_fk1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist_table`(`playlist_id`);
ALTER TABLE `songs_table`
ADD CONSTRAINT `songs_table_fk0` FOREIGN KEY (`artist_id`) REFERENCES `artist_table`(`artist_id`);
ALTER TABLE `songs_table`
ADD CONSTRAINT `songs_table_fk1` FOREIGN KEY (`image_id`) REFERENCES `image_table`(`image_id`);
ALTER TABLE `playlist_table`
ADD CONSTRAINT `playlist_table_fk0` FOREIGN KEY (`user_id`) REFERENCES `user_login`(`user_id`);
ALTER TABLE `image_table`
ADD CONSTRAINT `image_table_fk0` FOREIGN KEY (`song_id`) REFERENCES `songs_table`(`song_id`);
ALTER TABLE `lyrics_table`
ADD CONSTRAINT `lyrics_table_fk0` FOREIGN KEY (`song_id`) REFERENCES `songs_table`(`song_id`);