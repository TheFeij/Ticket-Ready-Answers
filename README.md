# Ticket-Ready-Answers: A Ticketing and Support System
## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
    - [Template Routes](#template-routes)
    - [Category Routes](#category-routes)
- [Database Setup](#database-setup)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Testing](#testing)

## Project Overview
Ticket-Ready-Answers is a robust ticketing and support system built on Node.js,Express.js, and MongoDB. The system enables users to communicate with system administrators (admins) and raise their concerns or questions. As the user base grows, it becomes evident that many queries are repetitive, leading to inefficiencies in admin responses and fatigue due to dealing with repetitive questions. To address this, the system introduces the concept of "templates," which allows admins to store and reuse common responses for frequently asked questions. Templates have a name and associated text for easy reference and reuse.

To enhance organization and manageability, the system also incorporates the concept of "template categories," enabling admins to categorize templates effectively. Template categories can be hierarchical, allowing subcategories within categories.

## Features
- Create, edit, and delete templates.
- Organize templates using template categories with hierarchical subcategories.
- Associate templates with specific categories for efficient access.
- Manage categories, including creating, editing, and listing all categories.
- Get a list of templates for a specific category and optionally for all the subcategories of that category too

## Getting Started
### Installation
#### Clone the repository:
```
git clone https://gitfront.io/r/user-5222990/GBGFy98qAsCp/Ticket-Ready-Answers.git
cd Ticket-Ready-Answers
```

#### Install dependencies:
```
npm install
```

#### Environment Variables:
Create a .env file in the root directory with the following content:
```
DB=<your_mongodb_connection_string>
DB_TESTS=<your_test_mongodb_connection_string>
PORT=<port_number>
HTTPS=true   # set to 'true' if you have SSL key and certificate in the 'ssl' folder
```

#### Running the Application
Start the application:
```
node index.js
```
The application will run on the specified port, accessible via HTTP or HTTPS based on the HTTPS environment variable.

## API Documentation
The API provides endpoints for managing templates and categories. You can use tools like Postman to send HTTP/HTTPS requests and use these APIs. Below are the available routes and their functionalities:

### Template Routes
#### POST /template: Create a new template.
- Request body:
```
{
  "title": "Template Title",
  "description": "Template Description",
  "category": "Category ID"
}
```
- Response: The newly created template object.

#### PUT /template: Edit an existing template.
- Query parameters:
```
id=<template_id>
```
- Request body:
```
{
  "title": "Updated Template Title",
  "description": "Updated Template Description",
  "category": "Updated Category ID"
}
```
- Response: The updated template object.

#### DELETE /template/?id=<template_id>: Delete a template.
- Query parameters:
```
id=<template_id>
```
- Response: The deleted template object.

#### GET /template/?id=<category_id>&children=<boolean>: Retrieve templates for a specific category.
- Query parameters:
```
id=<category_id>
children=<boolean>   // if set to true, templates from the children of that
                     // category will also be returend
```
- Response: An array of templates that belong to the specified category 
and optionally its subcategories(children).

### Category Routes
#### POST /category: Create a new category.
- Request body:
```
{
"name": "Category Name",
"parent": "Parent Category ID"
}
// or:
{
"name": "Category Name"
}
```
- Response: The newly created category object.

#### PUT /category: Edit an existing category.
- Query parameters:
```
id=<category_id>
```
- Request body:
```
{
"name": "Updated Category Name",
"parent": "Updated Parent Category ID"
}
// or:
{
"name": "Updated Category Name"
}
```
- Response: The updated category object.

#### GET /category: Retrieve a list of all categories and their hierarchical structure.
- Response: An array representing the hierarchical tree of categories with their nested subcategories.

## Database Setup
The application uses MongoDB as its database. To set up the database, make sure you have MongoDB installed and running on your system.

- For development, set the MongoDB connection string in the .env file under the DB environment variable.
- For testing, set the test database connection string in the .env file under the DB_TESTS environment variable.

## Error Handling
The application handles both uncaught exceptions and unhandled promise rejections. Route-specific errors are also handled, returning appropriate HTTP status codes and error messages to clients.

## Logging
Application logs are captured using the winston logger. Logs are written to the console, log files, and a MongoDB database for easy monitoring and debugging.

## Testing
Automated tests are included in the test folder. Unit and integration tests are located in separate folders.
Note that these tests does not cover all functionalities in the project, instead
they are added as a sample to show my ability in writing unit and integration tests. there are only unit tests for two functions in the models folder files:
validateCategory and validateTemplate. and also integration tests for the POST method of the template file in the routers folder

## Other Projects:
You can also check my other project with express.js with concentration on authentication and authorization in the link below:
https://github.com/TheFeij/Simple-Shop