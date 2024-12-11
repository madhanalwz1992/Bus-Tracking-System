# Bus Tracking System

The **Bus Tracking System** is a full-stack application designed to manage buses, routes, and schedules efficiently. It provides a backend built with **Node.js** and **SQLite3** and a frontend implemented with **HTML**, **CSS**, and **JavaScript**.

## Features
- **CRUD Operations**:
  - Add, view, update, and delete buses, routes, and schedules.
- **API Integration**:
  - RESTful APIs for seamless backend communication.
- **Unit and Integration Testing**:
  - Comprehensive tests using **Jest** and **Supertest**.
- **Frontend**:
  - Simple UI for interacting with the system.
  
  
## Technologies Used
### Backend
- **Node.js**
- **Express.js**
- **SQLite3**

### Frontend
- **HTML**
- **CSS**
- **JavaScript**

### Testing
- **Jest**
- **Supertest**

---
---

## Installation
### Prerequisites
- **Node.js** and **Yarn** installed on your system.

### Steps to Install and Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/bus-tracking-system.git
   cd bus-tracking-system
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Start the Server**:
   ```bash
   yarn start
   ```

4. **Open the Frontend**:
   - Navigate to `http://localhost:3000` in your browser.

---

## API Endpoints
### Buses
- **POST** `/buses` - Add a new bus.
- **GET** `/buses` - Retrieve all buses.
- **PUT** `/buses/:id` - Update bus details.
- **DELETE** `/buses/:id` - Delete a bus.

### Routes
- **POST** `/routes` - Add a new route.
- **GET** `/routes` - Retrieve all routes.
- **PUT** `/routes/:id` - Update route details.
- **DELETE** `/routes/:id` - Delete a route.

### Schedules
- **POST** `/schedules` - Add a new schedule.
- **GET** `/schedules` - Retrieve all schedules.
- **PUT** `/schedules/:id` - Update schedule details.
- **DELETE** `/schedules/:id` - Delete a schedule.

---

## Testing
### Run Tests
To run unit and integration tests:
```bash
yarn test
```

### Test Libraries
- **Jest**: For unit testing.
- **Supertest**: For API integration testing.

---

## Project Structure
```
bus-tracking-system/
│
├── server.js         # Backend server
├── bus_system.db     # SQLite database
├── public/           # Frontend files
│   ├── index.html    # HTML file for the UI
│   ├── styles.css    # CSS file for styling
│   └── app.js        # JavaScript for API interactions
├── tests/            # Unit and integration tests
│   ├── unit.test.js  # Unit tests
│   └── integration.test.js # Integration tests
├── package.json      # Project configuration and dependencies
└── README.md         # Project documentation
```

---

## Future Enhancements
- Implement user authentication.
- Add real-time bus tracking using WebSocket or GPS integration.
- Build a mobile app using frameworks like Ionic or React Native.

---