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
	name VARCHAR(56),
	winner INT,
	FOREIGN KEY(winner) REFERENCES Cars(id)
);

CREATE TABLE Race(id INT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(56),
	racedAt INT,
	winner INT,
	season INT,
	FOREIGN KEY(racedAt) REFERENCES Tracks(id),
	FOREIGN KEY(winner) REFERENCES Cars(id),
	FOREIGN KEY(season) REFERENCES Season(id)
);

SELECT * FROM Cars;
SELECT * FROM Tracks;
SELECT * FROM Season;
SELECT * FROM Race;