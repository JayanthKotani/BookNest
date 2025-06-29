📚 BookNest – Story Haven

BookNest – Story Haven is a full-stack web application that serves as a digital library and storytelling platform. It allows users to read, write, and manage stories in a user-friendly environment. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides seamless interaction between readers and writers.

---

🚀 Features

📝 Story Creation – Users can write and publish their own stories.

📖 Read Stories – Browse and read stories from various genres.

🧑‍💻 User Authentication – Secure login/signup using JWT-based auth.

🔍 Search & Filter – Search stories by title, author, or genre.

❤ Favorites – Bookmark stories you love.

✨ Responsive Design – Mobile-friendly and fully responsive UI.

---

🛠 Tech Stack

Frontend:

React.js

Tailwind CSS / Bootstrap (based on your styling choice)

Axios


Backend:

Node.js

Express.js

MongoDB + Mongoose


Authentication:

JSON Web Tokens (JWT)

Bcrypt for password hashing



---

🗂 Project Structure

booknest-story-haven/
├── client/               # React frontend
│   └── src/
│       └── components/
│       └── pages/
│       └── App.js
├── server/               # Express backend
│   └── models/
│   └── routes/
│   └── controllers/
│   └── server.js
└── README.md


---

🧑‍💻 How to Run Locally

1. Clone the Repository

cd booknest-story-haven

2. Install Dependencies

Backend:

cd server
npm install

Frontend:

cd ../client
npm install

3. Set Up Environment Variables

Create a .env file inside the /server directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


4. Run the Application

Backend:

npm start

Frontend:

npm start


Navigate to: http://localhost:8081/

---

🌐 Deployment

You can deploy the app using platforms like:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

---

🙌 Acknowledgements

React.js and Express documentation

MongoDB Atlas

Open Source libraries used in the project

---

📧 Contact
Jayanth Kotani 📩 Email: [jayanth7227@gmail.com] 🔗 GitHub: https://github.com/JayanthKotani

