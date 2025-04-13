📦 Full-Stack Project: Booking Platform

🛠 Technologies used:
Front-end: Next.js + TypeScript.

Back-end: Django.

Database: PostgreSQL.

Containerization tool: Docker & Docker Compose.


📖 Instructions:
Clone the repo: 
git clone https://github.com/kneknew/TravelBooking.git

Follow the steps above to deploy the application.


🖥 Front-end:
- Steps to launch the User Interface (UI):

  1 .Install dependencies:
  ```bash
    npm install
  ```

  2 .Start the application:
    ```bash
    npm run dev
  ```

  3 .Access at:

  http://localhost:3000



🚀 Back-end setup instructions:
- Steps to setup Docker & create admin account:

  1 .Build and start containers:
    ```bash
  docker-compose build
  
  docker-compose up
  
  docker-compose exec web python manage.py migrate
  ```
  2 .Create an admin account for management:

    ```bash
  docker-compose exec web python manage.py createsuperuser
  ```
  3 .Log in to the admin panel at: 
  
  http://localhost:8000/admin/login





