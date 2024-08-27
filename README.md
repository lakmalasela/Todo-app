# To-Do List - backend 

This is an Express.js application for server side that provides API endpoints for To-Do List. It uses MongoDB for data storage as well as authentication handle in JSON Web Tokens (JWT)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 18.20 or higher)
- npm (version 6.x or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:

    ```bash
    https://github.com/lakmalasela/Todo-app.git
    cd back-end
    ```

2. Install the dependencies:

    ```bash
    npm install or npm install --force
    ```

## Running the Application

1. Create a `.env` file in the root directory and add your MongoDB URI and other environment variables. See [Environment Variables](#environment-variables) for details.

2. Start the application:

    ```bash
    npm run dev
    ```

    This will start the server with Nodemon for development. The server will automatically restart when you make changes to the source code.

## Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

PORT = 4000

MONGO_URI = 
mongodb+srv://asela:TzJfLeUjVyBaclex@cluster0.9snvyq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
###########################################################################################################################################################################################
# To-Do List Application - frontend

This is a React.js application that provides a user interface for To-Do List Application. It uses Material-UI for styling,State Management,  in React state and Axios for making HTTP requests to the backend API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build for Production](#build-for-production)
- [Features](#Features)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 18.20 or higher)
- npm (version 6.x or higher)

## Installation

1. Clone the repository:

    ```bash
     https://github.com/lakmalasela/Todo-app.git
    cd front-end
    ```

2. Install the dependencies:

    ```bash
  npm install or npm install --force
    ```

## Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

    This will start the development server on `http://localhost:3000/login` and open the application in your default web browser.


## Features
- Register a new user
- Login for relevant users
- Add new tasks
- Update existing tasks
- View tasks with descriptions
- Pagination for task listing








