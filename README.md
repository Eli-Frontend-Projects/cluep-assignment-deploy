# Setting Up the Project

## Cloning the Repository

First, clone the repository from [https://github.com/Buerkem/cluep-assignment](https://github.com/Buerkem/cluep-assignment):

```bash
git clone https://github.com/Buerkem/cluep-assignment
```

This will create a directory named `cluep-assignment` with the project's files.

## Backend Setup

1. Navigate to the project directory:

   ```bash
   cd cluep-assignment
   ```
2. Install backend modules:

   Make sure you are in the base folder (`cluep-assignment`) and run:

   ```bash
   npm install
   ```
3. Start the backend server:

   Ensure you are still in the base folder and run:

   ```bash
   node ./backend/server.js
   ```

## Frontend Setup

1. Open a new terminal and navigate to the base path:

   ```bash
   cd cluep-assignment
   ```
2. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```
3. Install frontend components:

   ```bash
   npm install
   ```
4. Start the frontend application:

   ```bash
   npm start
   ```

## Running Backend Tests

1. Ensure the backend server is not **running**.
2. In the base folder, run the tests:

   ```bash
   npm test
   ```

   This command will automatically set up the test environment and execute the tests.

## Running Frontend Tests

1. Ensure the backend server is **running**.
2. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```
3. Run the frontend tests using Cypress:

   ```bash
   npx cypress run
   ```

## Debugging the Application

- **Changing Ports**: To change the port numbers used by the application, update the `.env` file in the base directory, and adjust the `proxy` settings in both the `package.json` files:

  - In the base directory's `package.json`, update the `proxy` field.
  - In the `frontend/package.json`, also update the `proxy` field to match the new port if needed.

These steps ensure that both the backend and frontend are correctly set up and can communicate with each other. Make sure to follow each step carefully to avoid configuration issues. Note that a port of 5000 is used for the backend and a port of 3000 for the frontend.