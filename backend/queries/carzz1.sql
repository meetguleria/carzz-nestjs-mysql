CREATE TABLE Locations (
  LocationID INT PRIMARY KEY AUTO_INCREMENT,
  Address VARCHAR(255),
  City VARCHAR(50),
  State VARCHAR(50),
  ZipCode VARCHAR(10)
);

CREATE TABLE Vehicles (
  VehicleID INT PRIMARY KEY AUTO_INCREMENT,
  Model VARCHAR(100),
  Make VARCHAR(100),
  Year INT,
  LocationID INT,
  Price DECIMAL(10, 2),
  Status ENUM('available', 'rented'),
  FOREIGN KEY (LocationID) REFERENCES Locations(LocationID)
);

CREATE TABLE Customers (
  CustomerID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100),
  Email VARCHAR(100),
  Phone VARCHAR(15),
  Password VARCHAR(255)
);

CREATE TABLE Rentals (
  RentalID INT PRIMARY KEY AUTO_INCREMENT,
  CustomerID INT,
  VehicleID INT,
  StartDate DATE,
  EndDate DATE,
  TotalPrice DECIMAL(10, 2),
  Status ENUM('active', 'completed', 'cancelled'),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
  FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
);

CREATE TABLE Reviews (
  ReviewID INT PRIMARY KEY AUTO_INCREMENT,
  CustomerID INT,
  VehicleID INT,
  Rating INT,
  Comment TEXT,
  Date DATE,
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
  FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
);
