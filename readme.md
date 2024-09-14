# Baymax

Baymax is an AI-powered healthcare application designed to predict potential diseases based on user-reported symptoms. It also helps users locate nearby hospitals using a map feature and includes an AI chatbot for support and guidance.

## Features
- Disease Prediction: Utilizes machine learning to analyze user symptoms and suggest possible diseases.
- Nearby Hospital Locator: Integrates Geoapify to show hospitals near the user's location.
- AI Chatbot: Uses Gemini API to assist users with questions and support.

## Technologies
- Frontend: React
- Backend: Django
- Database: PostgreSQL
- Machine Learning: Scikit-Learn
- Map Integration: Geoapify

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MohdAmaan07/Baymax.git
    ```

2. Navigate to the project directory:
    ```bash
    cd baymax
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Set up the backend by installing the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

5. Set up the database (PostgreSQL) and apply migrations:
    ```bash
    python manage.py migrate
    ```

6. Start the development server:
    ```bash
    npm run dev
    python manage.py runserver
    ```

7. Visit `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend API.

## Packages 
```json
"packages": {
    "": {
      "name": "baymax",
      "version": "0.0.0",
      "dependencies": {
        "@heroicons/react": "^2.1.5",
        "axios": "^1.7.7",
        "confetti": "^2.0.3",
        "emailjs": "^4.0.3",
        "emailjs-com": "^3.2.0",
        "hamburger-react": "^2.5.1",
        "leaflet": "^1.9.4",
        "meta": "^2.2.25",
        "react": "^18.3.1",
        "react-confetti": "^6.1.0",
        "react-dom": "^18.3.1",
        "react-leaflet": "^4.2.1",
        "react-router-dom": "^6.26.2"
      }
    }
}
```

## Dev Dependencies

```json
"devDependencies": {
     "@eslint/js": "^9.9.0",
     "@types/react": "^18.3.3",
     "@types/react-dom": "^18.3.0",
     "@vitejs/plugin-react": "^4.3.1",
     "autoprefixer": "^10.4.20",
     "eslint": "^9.9.0",
     "eslint-plugin-react": "^7.35.0",
     "eslint-plugin-react-hooks": "^5.1.0-rc.0",
     "eslint-plugin-react-refresh": "^0.4.9",
     "globals": "^15.9.0",
     "postcss": "^8.4.45",
     "tailwindcss": "^3.4.10",
     "vite": "^5.4.5"
}
```

## Python Dependencies

```bash
asgiref==3.8.1
Django==5.1.1
django-cors-headers==4.4.0
djangorestframework==3.15.2
joblib==1.4.2
numpy==2.1.1
pandas==2.2.2
python-dateutil==2.9.0.post0
python-decouple==3.8
pytz==2024.2
scikit-learn==1.5.2
scipy==1.14.1
six==1.16.0
sqlparse==0.5.1
threadpoolctl==3.5.0
typing_extensions==4.12.2
tzdata==2024.1
psycopg2==2.9.9
```

## How It Works

1. Symptom Input: Users input their symptoms.
2. Disease Prediction: The machine learning model analyzes symptoms and predicts potential diseases.
3. Map Feature: Users can locate nearby hospitals using the integrated map feature.
4. AI Chatbot: Provides quick answers to health-related questions using Gemini.

## Contribution

Feel free to contribute by submitting a pull request or reporting an issue.

