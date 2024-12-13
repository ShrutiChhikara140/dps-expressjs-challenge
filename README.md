# DPS Backend Coding Challenge

## Overview

This repository contains a CRUD web application based on Typescript and Express.js. Main application file is `index.ts`. Node and npm are required.

## Environment Setup and Application Start

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run init-db
npm run build
npm start
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will develop a backend system for managing data about a company's projects and their associated reports. Each project may have multiple reports linked to it, though having reports is not mandatory. Start your implementation using the provided SQLite database([db/db.sqlite3](./db/db.sqlite3)).

Refer to the database schema provided for understanding the data structure 👇

![Database schema](images/database_schema.png)

NOTE: You can use ([db.service.ts](./src/services/db.service.ts)) to handle SQL queries to the database.

## Challenge Submission 

This project is a RESTful API built with ExpressJS and SQLite, providing functionality to manage and process reports in a database. The project contains various endpoints to fetch, filter, and process reports based on different criteria.

## API Documentation
This section outlines the CRUD operations for managing projects and reports, including detailed descriptions of each API call, input parameters, output responses, and database changes.

### Project APIs

#### Create a New Project
- **Endpoint**: `POST /api/projects`
- **Description**: Creates a new project.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the project.
  - `name` (string): The name of the project.
  - `description` (string, optional): A brief description of the project.
- **Output**:
  - `201 Created`: Project created successfully.
  - `400 Bad Request`: Project ID and name are required.
  - `500 Internal Server Error`: Error creating project.
- **Database Changes**: Inserts a new record into the `projects` table.

#### Get All Projects
- **Endpoint**: `GET /api/projects`
- **Description**: Retrieves all projects.
- **Headers**:
  - `Authorization`: `Password123`
- **Output**:
  - `200 OK`: List of all projects.
  - `500 Internal Server Error`: Error fetching projects.
- **Database Changes**: None.

#### Get a Project by ID
- **Endpoint**: `GET /api/projects/:id`
- **Description**: Retrieves a project by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the project.
- **Output**:
  - `200 OK`: Project details.
  - `400 Bad Request`: Project ID is required.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Error fetching project.
- **Database Changes**: None.

#### Update a Project by ID
- **Endpoint**: `PUT /api/projects/:id`
- **Description**: Updates a project by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the project.
  - `name` (string): The updated name of the project.
  - `description` (string): The updated description of the project.
- **Output**:
  - `200 OK`: Project updated successfully.
  - `400 Bad Request`: Project ID, name, and description are required.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Error updating project.
- **Database Changes**: Updates the record in the `projects` table.

#### Delete a Project by ID
- **Endpoint**: `DELETE /api/projects/:id`
- **Description**: Deletes a project by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the project.
- **Output**:
  - `200 OK`: Project deleted successfully.
  - `400 Bad Request`: Project ID is required.
  - `404 Not Found`: Project not found.
  - `500 Internal Server Error`: Error deleting project.
- **Database Changes**: Deletes the record from the `projects` table.

### Reports APIs

#### Create Reports for a Project
- **Endpoint**: `POST /api/projects/:projectid/reports`
- **Description**: Creates multiple reports for a project.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `projectid` (string): The unique identifier for the project.
  - `reports` (array): An array of reports, each containing:
    - `id` (string): The report ID.
    - `text` (string): The report content.
- **Output**:
  - `201 Created`: Reports created successfully.
  - `400 Bad Request`: Project ID and at least one report are required.
  - `500 Internal Server Error`: Error creating reports.
- **Database Changes**: Inserts new records into the `reports` table.

#### Get Reports for a Project
- **Endpoint**: `GET /api/projects/:projectid/reports`
- **Description**: Retrieves all reports for a project.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `projectid` (string): The unique identifier for the project.
- **Output**:
  - `200 OK`: List of reports for the project.
  - `400 Bad Request`: Project ID is required.
  - `500 Internal Server Error`: Error fetching reports.
- **Database Changes**: None.

#### Get All Reports
- **Endpoint**: `GET /api/reports`
- **Description**: Retrieves all reports.
- **Headers**:
  - `Authorization`: `Password123`
- **Output**:
  - `200 OK`: List of all reports.
  - `500 Internal Server Error`: Error fetching reports.
- **Database Changes**: None.

#### Get a Report by ID
- **Endpoint**: `GET /api/reports/:id`
- **Description**: Retrieves a report by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the report.
- **Output**:
  - `200 OK`: Report details.
  - `404 Not Found`: Report not found.
  - `500 Internal Server Error`: Error fetching report.
- **Database Changes**: None.

#### Update a Report by ID
- **Endpoint**: `PUT /api/reports/:id`
- **Description**: Updates a report by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the report.
  - `text` (string): The updated text of the report.
- **Output**:
  - `200 OK`: Report updated successfully.
  - `400 Bad Request`: Report ID and text are required.
  - `404 Not Found`: Report not found.
  - `500 Internal Server Error`: Error updating report.
- **Database Changes**: Updates the record in the `reports` table.

#### Delete a Report by ID
- **Endpoint**: `DELETE /api/reports/:id`
- **Description**: Deletes a report by its ID.
- **Headers**:
  - `Authorization`: `Password123`
- **Input**:
  - `id` (string): The unique identifier for the report.
- **Output**:
  - `200 OK`: Report deleted successfully.
  - `400 Bad Request`: Report ID is required.
  - `404 Not Found`: Report not found.
  - `500 Internal Server Error`: Error deleting report.
- **Database Changes**: Deletes the record from the `reports` table.

#### Get Special Reports
- **Endpoint**: `GET /api/special-reports`
- **Description**: Retrieves all reports where the same word appears at least three times.
- **Headers**:
  - `Authorization`: `Password123`
- **Output**:
  - `200 OK`: List of special reports.
  - `404 Not Found`: No reports found with the required word frequency.
  - `500 Internal Server Error`: Error fetching or processing reports.
- **Database Changes**: None.


## Additional Notes
- Added `dist/` to `.eslintignore` to avoid linting compiled files, as they are auto-generated from source code.
- Added `dist/` to `.gitignore` to exclude build artifacts from version control, keeping the repository clean and focused on source files.
