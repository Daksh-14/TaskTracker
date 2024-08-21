# TaskTracker

TaskTracker is a robust tool designed to streamline project management by ensuring seamless task assignment and tracking across teams, especially those spread across different time zones. Built to enhance productivity, it enables team leaders to manage tasks efficiently, track progress, and ensure timely completion, all while minimizing the impact of varying time zones on team collaboration.

## Tech Stack

**Client:** React, Redux

**Server:** Node, Express

**Database:** PostgreSQL

**Cloud Storage:** Cloudinary

## Installation and Run Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Daksh-14/TaskTracker.git
    ```

2. **Install NPM packages:**
    ```bash
    cd TaskTracker
    ```
    **Frontend**
   ```bash
   cd frontend
   npm install
   ```
   **Backend**
  ```bash
   cd backend
   npm install
   ```

4. **Configure the environment:**
   - Create a `.env` file in the root directory.
   - Copy the contents of `.env.example` into `.env` and update the variables as needed.

5. **Start the server:**

   **Frontend**
    ```bash
    npm run dev
    ```
   **Backend**
   ```bash
   npm start
   ```

## Environment Variables

To run this project, you need to set up the following environment variables in your `.env` file:

- `DATABASE_URL`: Your PostgreSQL database URL
- `CLOUDINARY_URL`: Your Cloudinary account URL for file storage
- `JWT_SECRET`: A secret key for JWT authentication

## Features

- **Task Assignment & Tracking:** Efficiently manage tasks with the ability to assign them to team members, ensuring deadlines are met regardless of time zone differences.
- **File Upload & Management:** Easily upload and manage files associated with each task using Cloudinary.
- **Team Collaboration:** Facilitates seamless communication and collaboration among team members.
- **Progress Monitoring:** Real-time tracking of task progress, helping leaders to stay on top of project timelines.
- **Timezone-Friendly Scheduling:** Specially designed to handle teams across different time zones without affecting productivity.
