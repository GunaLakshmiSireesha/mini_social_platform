** FunnyHub – A Mini Social Media Platform **

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) social media application where users can create posts, upload images, chat with other users, follow people, and manage their profiles.

This project is built to mimic essential features of platforms like Instagram, including a clean login UI, feed system, messages page, and profile management.

# Features:
  --> User Authentication
      - Login & Register using JWT
      - Secure password hashing
      - Protects private routes
      - Auto-login using saved token

 --> Feed System
      - Users can upload image posts with captions
      - Posts display author info & timestamp
      - Posts shown in a clean card layout
      - Real-time updates after posting

 --> Create Post
      - Modern popup modal for uploading images
      - Preview selected image
      - Add caption
      - Submit creates a live post

 --> Chat / Messaging
      - One-to-one messaging system
      - Clean UI with left messages & right messages
      - Auto-scroll to bottom

--> Follow System
      - Discover users
      - Follow/unfollow people
      - View following & followers list

--> User Profile
      - View any user profile by email
      - See their posts
      - Shows follower count & following count

--> Tech Stack

* Frontend (React)
    . React.js
    . React Router
    . CSS3 custom UI
    . File upload with FormData
* Backend (Node & Express)
    . Express.js
    . MongoDB + Mongoose
    . JWT Authentication


⚙️ Installation & Setup
1. Clone the repository
   git clone https://https://github.com/GunaLakshmiSireesha/mini_social_platform.git

Backend Setup
2. Install backend dependencies
   cd backend
   npm install

3. Create .env file
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/social_media_db
   JWT_SECRET=replace_this_with_a_strong_secret

4. Start backend
   node server.js
   
Backend runs at: http://localhost:5000

Frontend Setup
5. Install frontend dependencies
   cd frontend
   npm install

6. Start frontend
   npm start
   
Frontend runs at: http://localhost:3000

# Login Ui
<img width="2872" height="1608" alt="image" src="https://github.com/user-attachments/assets/8737d53c-8ebb-4c36-9a0f-5cdb957376e8" />

# Feed Ui
<img width="2825" height="1470" alt="image" src="https://github.com/user-attachments/assets/0f6457e4-8adb-4c5e-8e20-89ffcb7ea6af" />



