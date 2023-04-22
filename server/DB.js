const mysql = require("mysql");

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: "35.200.182.124",
      user: "Admin",
      password: "4123",
      database: "Poco-Loco-db",
      connectTimeout: 30000,
    });
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting: " + err.stack);
        return;
      }
      console.log("Connected as id " + connection.threadId);
    });
  }

  GetUserPlayList(userid) {
    /*
     @param userid: the id of the user
     @return: the playlist of the user
     @description: this function will return the playlist of the user
    */
    const sql = `SELECT user_login.user_name, playlist_table.playlist_id, COUNT(*) AS num_songs
    FROM user_login
    INNER JOIN playlist_table ON user_login.user_id = ?
    GROUP BY user_login.user_name, playlist_table.playlist_id;
    `;
    connection.query(sql, [userid], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  }

  GetSongsInPlaylist(playlistid, userid) {
    /*
     @param playlistid: the id of the playlist
     @return: the songs in the playlist
     @description: this function will return the songs in the playlist
    */
    const sql = `SELECT *
    FROM user_login
    INNER JOIN playlist_table ON user_login.user_id = playlist_table.user_id
    INNER JOIN songs_table ON playlist_table.song_id = songs_table.song_id
    INNER JOIN artist_table ON songs_table.artist_id = artist_table.artist_id
    WHERE user_login.user_id = ? AND playlist_table.playlist_id = ?;
    ;`;
    connection.query(sql, [userid, playlistid], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  }

  GetLyrics(Lyricsid) {
    /*
     @param lyricsid: the id of the lyrics
     @return: the lyrics of the song
     @description: this function will return the lyrics of the song
    */
    const sql = `SELECT lyrics
    FROM lyrics_table
    WHERE lyrics_id = ?;`;
    connection.query(sql, [Lyricsid], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  }

  InsertSongIntoSongTable(songid, songname,songurl, artistid,imageid, lyricsid,description,length) {
    /*
     @param songid: the id of the song
     @param songname: the name of the song
     @param songurl: the url of the song
     @param artistid: the id of the artist
     @param imageid: the id of the image
     @param lyricsid: the id of the lyrics
     @param description: the description of the song
     @param length: the length of the song
     @return: the song that was inserted
     @description: this function will insert the song into the song table
    */
    const sqlInsert = `INSERT INTO songs_table (song_id, song_name, song_url, artist_id, image_id, lyrics_id, description, length) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    connection.query(
      sqlInsert,
      [songid, songname,songurl, artistid,imageid, lyricsid,description,length],
      (err, result) => {
        if (err) throw err;
        resolve(result);
      }
    );
  }

  InsertPlaylistIntoPlaylistTable(userid, songid) {
    /*
     @param userid: the id of the user
     @param songid: the id of the song
     @return: the playlist that was inserted
     @description: this function will insert the playlist into the playlist table
    */
    const sqlInsert = `INSERT INTO playlist_table (user_id, song_id) VALUES (?, ?);`;
    connection.query(sqlInsert, [userid, songid], (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  }


}
