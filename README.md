# React.js + Node.js Fresher Technical Assignment

## Objective
Develop a simple full-stack **Student Management Application** using **React.js** for the frontend and **Node.js (Express.js)** for the backend. The objective of this assignment is to evaluate your understanding of React fundamentals, REST APIs, component structure, state management, and basic backend development.

## Requirements

### Frontend (React.js)
Create a user interface with the following features:
* Display a list of students in a table.
* Add a new student using a form.
* Delete a student.
* Display a loading indicator while data is being fetched.
* Display an appropriate message if no records are available.

**Student Fields:**
* Name
* Email
* Course

### Backend (Node.js + Express.js)
Develop the following REST APIs:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/students` | Fetch all students |
| **POST** | `/students` | Add a new student |
| **DELETE** | `/students/:id` | Delete a student |

*Note: Use an in-memory array to store data. A database is not required.*

#### Sample Response
```json
[
  {
    "id": 1,
    "name": "Rahul",
    "email": "rahul@gmail.com",
    "course": "React JS"
  }
]
```

## Validation
The following validations must be implemented:
* Name is mandatory.
* Email must be in a valid format.
* Course is mandatory.
* Do not allow empty submissions.

## Technical Requirements

### Frontend
* React.js
* Functional Components
* React Hooks (`useState`, `useEffect`)
* Axios or Fetch API
* Basic CSS or Bootstrap

### Backend
* Node.js
* Express.js
* CORS
* JSON APIs

## Optional (Bonus)
If time permits, implement any of the following:
* Edit student details
* Search students by name
* Sort students alphabetically
* Responsive UI
* Better error handling
* Clean folder structure

## Important Notes
* Build the application from scratch.
* Write clean, readable, and well-structured code.
* Follow good naming conventions.
* Ensure the application runs without errors.
* Commit your code regularly if using Git.

