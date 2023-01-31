# Introduction

This is a music player written in Javascript, CSS, HTML, supported by MariaDB and NodeJS. It is a project for the course "Web Application Development" at MITWPU.

# Features

1. Users must be able to login and signup. Application must be able to save their login data in the database.
2. Users must be able to reset their passwords via an OTP sent to their email id. 
3. Users will be able to see their liked songs.
4. Upon signup, user must be able to choose a language between English, Hindi and Marathi, and will get a playlist of 30 songs which will be selected on random from the top 100 songs, which will be downloaded on the local machine so it works offline. 
5. The user will be able to search for any song, and the program will download it temporarily via api. If they user likes, or adds to a playlist, itll add it to the database of the user. 
6. It will have a simple and nice Coco themed UI and UX.
7. User will be able to see the Lyrics of each song. 
8. Users will be able to change the output device of the song that is playing. 
9. It will be cross platform and work on all devices. 

# Windows and html pages
1. Login Page
2. Home Page
3. Song Playing Page
4. Users Home Page


# Design 
Theme will have coco colors: 
Refer to design folder. 

# DataBase
Entities: 
1. Login table:
   1. *UserName*
   2. Password
   3. EmailID
   4. OTP=0    
2. Songs Table for English, Hindi and Marathi, local and downloaded.
   1. *SongID*
   2. Song Title
   3. Song Artist
   4. Song Album
   5. **Song Thubnail ID**
3. Song Thumbnails
   1. *Thumbnail ID* 
   2. File Path of Stored Image
4. Each User Table
   1. *UserName*
   2. SongID


# Research
1. Can we stream songs via apis. 
2. Best api for our app. which is free. 
3. How to send and manage otps. 
4. Cryptographic technique for sending otps. 
5. How to change audio output device using javascript. 
6. How to integrate javacript and MariaDB

# TODO
1. Research
2. Make the CSS and designs
3. Finalize Color Theme and look. 