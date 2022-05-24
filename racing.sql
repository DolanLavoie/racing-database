CREATE DATABASE Racing
GO
USE Racing;

CREATE TABLE Cars(id INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(56),
	topSpeed INT,
	breaking INT,
	turning INT
);

CREATE TABLE Tracks(id INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(56),
	topSpeed INT,
	breaking INT,
	turning INT
);

CREATE TABLE Season(id INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(56)
);

CREATE TABLE Race(id INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(56),
	racedAt VARCHAR(56),
	winner VARCHAR(56),
	season VARCHAR(56)
);

SELECT * FROM Cars;
SELECT * FROM Tracks;
SELECT * FROM Season;
SELECT * FROM Race;

DROP TABLE Race;
DROP TABLE Season;
DROP TABLE Tracks;
DROP TABLE Cars;