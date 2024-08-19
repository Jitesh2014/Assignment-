Help Center Cards - Full Stack Application

This is a full-stack application that allows users to manage "Help Center" cards. The application consists of a React frontend and an Express.js backend.
Users can create, retrieve, and view Help Center cards, with each card representing a different section of a help center (e.g., "Branches", "Manage Your Account", etc.).

Features
Create Card: Users can create new Help Center cards by submitting a form.
View Cards: Users can view all cards displayed on the main page.
Search Cards: Users can search for specific cards by title.
Responsive Design: The application is fully responsive and mobile-friendly.
Backend API: A RESTful API built with Express.js to manage cards.

Technologies Used
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (via Mongoose)
Other Tools: Axios (for API requests), UUID (for unique IDs)

1. Clone the Repository
git clone https://github.com/yourusername/assignment-.git
cd assignment-

3. Set Up the Backend
Navigate to the backend directory:
cd backend
Install dependencies:

npm install
Create a .env file in the backend directory and add your MongoDB connection string:

MONGODB_URI= your_mongodb_connection_string
Start the backend server:

npm start
The server should now be running on http://localhost:4000. You can verify this by visiting http://localhost:4000/ping in your browser or using curl to check the response.

3. Set Up the Frontend
Navigate to the frontend directory:
cd frontend
Install dependencies:

npm install
Start the frontend development server:
npm start
The frontend should now be running on http://localhost:3000.

4. Running the Application
With both servers running, you can visit http://localhost:3000 in your browser to see the application in action. You should be able to:

View existing Help Center cards.
Search for specific cards by title.
Submit a new Help Center request by clicking on "Submit a request".
