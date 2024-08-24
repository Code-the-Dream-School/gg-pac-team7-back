# Project Overview:

    1. Project Overview
    2. Technology Stack
    3. API Routes
    4. Database Schema
    5. Setup Instructions
    6. Running the Server

### Project Overview

    Name: Node/React Practicum Back-End
    Description: This is the back-end server for a practicum project using Node.js and Express to create a RESTful API. The server communicates with a MongoDB database and provides endpoints for the front-end React application.

#### Technology Stack

    ~ Node.js: JavaScript runtime environment
    ~ Express: Node.js web application framework for building RESTful APIs
    ~ MongoDB: NoSQL database used for storing data
    ~ Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
    ~ Dotenv: Module to load environment variables from a .env file
    ~ Nodemon: Tool for automatically restarting the server during development
    ~ JWT: JSON Web Tokens for authentication
    ~ Bcrypt: Library for hashing passwords
    ~ Cors: Middleware for enabling Cross-Origin Resource Sharing
    ~ Morgan: HTTP request logger middleware
    ~ Body-Parser: Middleware for parsing incoming request bodies

#### API Routes

~~ Authentication Routes (/api/v1/auth)
| Route | HTTP Method | Description |
|-------------|-------------|-----------------------------------------------|
| `/register` | POST | Register a new user |
| `/login` | POST | Authenticate user and return a JWT |
| `/me` | GET | Check current user based on token |

~~ Bookmark Routes (/api/v1/bookmarks)
| Route | HTTP Method | Description |
|--------|-------------|----------------------------------------------|
| `/` | GET | Get all bookmarks for the authenticated user |
| `/:id` | GET | Get a bookmark by ID |
| `/` | POST | Create a new bookmark |
| `/:id` | DELETE | Delete a bookmark by ID |

~~ Event Routes (/api/v1/events)
| Route | HTTP Method | Description |
|--------|-------------|-----------------------|
| `/` | GET | Get all events |
| `/:id` | GET | Get event details by ID |
| `/` | POST | Create a new event |
| `/:id` | PUT | Update an event by ID |
| `/:id` | DELETE | Delete an event by ID |

~~Search Routes (/api/v1/search)

| Route | HTTP Method | Description      |
| ----- | ----------- | ---------------- |
| `/`   | GET         | Search for items |

#### Database Schema

{
"\_id": "ObjectId",
"firstName": "String",
"lastName": "String",
"email": "String",
"password": "String",
"createdAt": "Date",
"updatedAt": "Date"
}

#### Setup Instructions

    1. Create a Folder: Create a folder to contain both the front-end and back-end repositories.

    2. Clone the Repository: Clone this repository into your newly created folder.
                git clone <repository-url>

    3. Install Dependencies: Navigate to the project directory and run the following command to install all necessary dependencies.

                npm install

    4. Environment Variables: Create a .env file in the root directory and add the following environment variables:

        GOOGLE_MAPS_API_KEY=<GoogleApiKey>
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/practicum
        JWT_SECRET=<your_jwt_secret>
        JWT_EXPIRES=1d
        PORT=8000

        Replace <username>, <password>, <cluster-url>, <GoogleApiKey> and <your_jwt_secret> with your actual MongoDB credentials and JWT secret.

    5. Pull the Latest Version: Always ensure you are on the latest version of the main branch.

                git pull origin main

#### Running the Server

                npm run dev
