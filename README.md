# Vaccination Slot Booking System

The Vaccination Slot Booking System is a web application that allows users to book vaccination slots and administrators to manage user data. Users can register, log in, book vaccination slots, and view available slots. Administrators can log in, view the total number of registered users, and filter users by age, pincode, and vaccination status.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure MongoDB server is running)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vaccination-slot-booking.git
   cd vaccination-slot-booking
Install dependencies:

bash
Copy code
npm install
Create a .env file in the project root and set your environment variables:

env
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vaccine_app
SECRET_KEY=your-secret-key
Start the application:

bash
Copy code
npm start
The server should start on port 3000 or the port you specified in your .env file.

Usage
User Features
Registration: Users can register by providing their name, phone number, age, Aadhar card number, pincode, and password.

Login: Registered users can log in with their phone number and password.

Slot Booking: Users can book vaccination slots by providing their name, age, phone number, desired slot time, vaccination day, and date. The system checks for eligibility and availability.

View Available Slots: Users can view available vaccination slots for a specific day.

Admin Features
Admin Login: Administrators can log in with their credentials (manually created in the database).

Total Registered Users: Admins can check the total number of registered users.

Filter Users: Admins can filter users by age, pincode, and vaccination status (none, first dose completed, or all completed).

API Endpoints
/api/user/register: User registration endpoint.

/api/user/login: User login endpoint.

/api/user/check-days: Check available vaccination days endpoint.

/api/user/check-time-slot: Check available time slots for a day endpoint.

/api/user/slot-book: Slot booking endpoint.

/api/admin/login: Admin login endpoint.

/api/admin/total-users: Get the total number of registered users endpoint.

/api/admin/filter-users: Filter users by age, pincode, and vaccination status (Optional) endpoint.

Contributing
Feel free to contribute to this project by creating issues, suggesting improvements, or sending pull requests. Contributions are welcome!
