# VidFlow

VidFlow is a **video streaming application** designed to provide users with a seamless video playback experience. The project utilizes **React.js** for the frontend and integrates APIs for managing video content, user authentication, and interactive features.

## 🚀 Features

- 🎥 **Video Streaming** - Watch videos with smooth playback.
- 🔄 **Redux for State Management** - Efficiently manage global states.
- 📡 **API Integration** - Fetch video content dynamically using Axios.
- 📑 **Playlists & Categories** - Organize videos efficiently.
- 💬 **Comments & Engagement** - Allow users to interact with video content.
- 🎨 **Responsive UI** - Built using Tailwind CSS for a modern look.

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Calls:** Axios
- **State Management:** Redux Toolkit

## 📦 Installation

1. Clone the repository:
   ```bash
   https://github.com/ajais-25/vidflow.git
   cd vidflow
   ```
2. Install dependencies:
   ```bash
   cd client
   npm install
   
   cd server
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

- Create a `.env` file in the server root directory and add necessary environment variables.
- Ensure API endpoints are correctly configured.

```bash
PORT=300
MONGO_URI=YOUR_MONGODB_URI
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=YOUR_SECRET
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=YOUR_SECRET
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET

RENDER_URL=YOUR_RENDER_URL(on deploying the backend)
```

## 📌 Usage

- Visit `http://localhost:5173` in your browser.
- Browse through available videos.
- Click on a video to start streaming.
- Interact through comments and likes.

## 🤝 Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

## 📬 Contact

For any inquiries or collaborations:
- 📧 Email: akshatjaiswal2518@gmail.com
- 🔗 GitHub: [ajais-25](https://github.com/ajais-25)

