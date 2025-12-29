# NutTracker Project Context

## Project Overview
**NutTracker** is a nutrition tracking application designed to monitor daily food intake and calculate nutritional values (calories, protein, carbs, fat, fiber).

The project currently exists in a hybrid state:
1.  **Logic Core:** A set of Python functions in `app.py` that handle data reading (`food.csv`), user input (CLI-based), and data persistence (`currentDay.json`, `avg.json`). **Note:** This logic is currently encapsulated in a `main()` function that is *not* called during standard execution.
2.  **Web Interface:** A basic Flask application that serves a static HTML dashboard. The frontend is currently non-functional (hardcoded HTML, empty JavaScript) and does not yet communicate with the backend logic.

## Architecture

### Backend (Python/Flask)
*   **Entry Point:** `app.py`
*   **Framework:** Flask
*   **Data Source:** `food.csv` (Reads nutritional info per 100g).
    *   *Schema:* `name, calories, protein, carbs, fat, fiber`
*   **Persistence:**
    *   `currentDay.json`: Stores the current date and running totals for the day.
    *   `avg.json`: Intended to store historical averages (weekly/monthly).

### Frontend
*   **Structure:** `templates/index.html` (Simple dashboard with "Home", "Add", and "Stats" navigation).
*   **Styling:** `static/css/style.css`
*   **Logic:** `static/js/script.js` (Currently **empty**).

## Key Files
*   **`app.py`**: Contains both the Flask server setup and the core application logic (functions like `getData`, `getInput`, `updateToday`, `newDay`).
*   **`food.csv`**: The "database" of known foods and their nutritional content.
*   **`currentDay.json`**: JSON file tracking the current day's date and accumulated macro-nutrients.
*   **`templates/index.html`**: The main view for the web application.

## Usage
### Running the Web Server
To start the Flask server:
```bash
python app.py
```
*   Access the app at `http://localhost:5000` (or `http://0.0.0.0:5000`).
*   *Current Behavior:* Displays a static HTML page with hardcoded values.

### Running the CLI Logic
The CLI logic (interactive input loop) is contained in the `main()` function within `app.py`. To run it, you currently need to modify the file to call `main()` instead of `app.run()`, or import and run it from a Python shell.

## Development Status & Conventions
*   **Status:** Prototype/Transition. The CLI logic needs to be exposed via API endpoints to be usable by the frontend.
*   **Coding Style:** Python standard (PEP 8 mostly observed).
*   **Data Handling:**
    *   Food data is read into a dictionary.
    *   Daily updates read/write to local JSON files.
    *   Nutrient values are stored as lists of floats `[calories, protein, carbs, fat, fiber]`.
