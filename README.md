📦 Full-Stack Project: Booking Platform
🖥 Front-end:
Framework: Next.js v14.12.18 with TypeScript.

Steps to launch the User Interface (UI):

Install dependencies: npm install

Start the application: npm run dev

Access at: http://localhost:3000

🌐 Back-end:
Framework: Django.

Database: PostgreSQL.

Dockerized Environment: Enables quick and seamless setup using Docker.

🚀 Back-end setup instructions:
Build and start containers:

bash
docker-compose build
docker-compose up
Apply database migrations:

bash
docker-compose exec web python manage.py migrate
Create an admin account for management:

bash
docker-compose exec web python manage.py createsuperuser
Log in to the admin panel at: http://localhost:8000/admin/login

🛠 Technologies used:
Front-end: Next.js + TypeScript.

Back-end: Django.

Database: PostgreSQL.

Containerization tool: Docker & Docker Compose.

📖 Instructions:
Clone the repo: git clone <repo-url>

Follow the steps above to deploy the application.
