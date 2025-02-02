# Food Delivery System

## Full-Stack React and Node.js Developer Project

### Overview

This project is a Full-Stack Food Delivery System with a backend API built using Node.js and Express, and a frontend dashboard developed using React.js. It includes user authentication, menu management, order placement, and state management using Redux.

---

## Backend (Node.js + Express)

### Express Server Setup

- The Express server runs on port `3001` (or any preferred port).
- Optionally, a local JSON database can be used for data storage.

### Models

#### User Model:

- `username`: A string (required).
- `password`: A hashed string (required).

#### Menu Model:

- `name`: A string (required).
- `category`: A string (e.g., Appetizers, Main Course, Desserts).
- `price`: A number (required).
- `availability`: A boolean (default: `true`).

#### Order Model:

- `userId`: Reference to the User who placed the order.
- `items`: Array of menu items (menu item ID and quantity).
- `totalAmount`: Calculated total price.
- `status`: String (e.g., "Pending", "Completed").

### API Endpoints

#### Authentication:

- `POST /register`: Register a new user.
- `POST /login`: Login a user and return a JWT token.

#### Menu Management:

- `GET /menu`: Fetch all menu items.

#### Order Management:

- `POST /orders`: Place an order with selected menu items and quantities.
- `GET /orders`: Fetch all orders of a logged-in user.

---

## Frontend (React.js)

#### Login Email:  
-  email:- admin@craftmyplate.com
   password:- password,

### React Application Setup

- Use Create React App (CRA) or an alternative setup to initialize the project.

### Pages and Components

#### Login Page:

- A login form that accepts username and password.
- On successful login, store the JWT token locally.

#### Menu Page:

- Display all menu items in a table layout.
- menu tabs (Appetizers Tab , Main Course Tab , Desserts Tab).
- Desserts Name , Price  , Quantity  ,  Total in Table View

#### Order Page:

- Order View (Order Id , Total Amount, Status )
- After placing the order, show the user their order history.

### State Management

- Redux is used to manage application state, such as user sessions and menu items.

### API Integration

- Axios is used for making HTTP requests to the backend.

### Styling

- Material-UI is used for a modern and responsive UI design.

---

## Installation & Setup

### Backend Setup

1. Clone the repository.
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend application:
   ```bash
   npm start
   ```

---

## Technologies Used

- **Backend:** Node.js, Express, JWT Authentication
- **Frontend:** React.js, Redux, Axios, Material-UI
- **Database:** JSON file or MongoDB (for scalability)

---

## Future Enhancements

- Implement real-time order status updates using WebSockets.
- Add a payment gateway integration.
- Enhance UI with animations and better user experience.

---

###

