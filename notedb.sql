-- language: SQL



-- Create the 'notesdb' schema
CREATE DATABASE notesDB;
USE notesdb;

-- Create the 'Note' table
CREATE TABLE Note (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    note_title VARCHAR(255) NOT NULL,
    note_content TEXT,
    note_status VARCHAR(50),
    note_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'Category' table
CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    category_descr TEXT,
    category_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'Reminder' table
CREATE TABLE Reminder (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    reminder_name VARCHAR(255) NOT NULL,
    reminder_descr TEXT,
    reminder_type VARCHAR(50),
    reminder_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'NoteCategory' table
CREATE TABLE NoteCategory (
    notecategory_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT,
    category_id INT,
    FOREIGN KEY (note_id) REFERENCES Note (note_id),
    FOREIGN KEY (category_id) REFERENCES Category (category_id)
);

-- Create the 'NoteReminder' table
CREATE TABLE NoteReminder (
    notereminder_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT,
    reminder_id INT,
    FOREIGN KEY (note_id) REFERENCES Note (note_id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder (reminder_id)
);
