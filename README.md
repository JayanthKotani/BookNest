# 📚 BookNest – Story Haven

**BookNest – Story Haven** is a full-stack web application that serves as a digital library and storytelling platform. It allows users to read, write, and manage stories in a user-friendly environment. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), it provides seamless interaction between readers and writers.

---

## 🚀 Features

- 📝 **Story Creation** – Users can write and publish their own stories.  
- 📖 **Read Stories** – Browse and read stories from various genres.  
- 🧑‍💻 **User Authentication** – Secure login/signup using JWT-based auth.  
- 🔍 **Search & Filter** – Search stories by title, author, or genre.  
- ❤️ **Favorites** – Bookmark stories you love.  
- ✨ **Responsive Design** – Mobile-friendly and fully responsive UI.

---

## 🛠 Tech Stack

### Frontend:
- React.js  
- Tailwind CSS / Bootstrap  
- Axios  

### Backend:
- Node.js  
- Express.js  
- MongoDB + Mongoose  

### Authentication:
- JSON Web Tokens (JWT)  
- Bcrypt for password hashing  

---

## 🗂 Project Structure

booknest-story-haven/
├── client/ # React frontend
│ └── src/
│ └── components/
│ └── pages/
│ └── App.js
├── server/ # Express backend
│ └── models/
│ └── routes/
│ └── controllers/
│ └── server.js
└── README.md

yaml
Copy
Edit

---

## 🧑‍💻 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JayanthKotani/booknest-story-haven.git
   cd booknest-story-haven
Install Dependencies

Backend:

bash
Copy
Edit
cd server
npm install
Frontend:

bash
Copy
Edit
cd ../client
npm install
Set Up Environment Variables

Create a .env file inside the /server directory:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the Application

Backend:

bash
Copy
Edit
npm start
Frontend:

bash
Copy
Edit
npm start
Open: http://localhost:8081

🌐 Deployment
You can deploy the app using platforms like:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

🙌 Acknowledgements
React.js and Express documentation

MongoDB Atlas

Open source libraries used in the project

📧 Contact
Jayanth Kotani
📩 Email: jayanth7227@gmail.com
🔗 GitHub: @JayanthKotani
