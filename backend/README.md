# EcoSphere Backend

This is the Django backend for the EcoSphere ESG Platform.

## Prerequisites

- Python 3.10+
- PostgreSQL

## Setup Instructions

1. **Create and activate a virtual environment:**

   On Windows:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   On macOS/Linux:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and fill in your database credentials:
   ```bash
   cp .env.example .env
   ```
   Ensure PostgreSQL is running and you have created a database matching your `.env` configuration.

4. **Run Migrations (when models are added):**
   ```bash
   python manage.py migrate
   ```

5. **Run the Development Server:**
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`. CORS is configured to allow requests from the local React frontend (`http://localhost:5173`).
