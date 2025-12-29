# NutTracker Project Context

## Project Overview
**NutTracker** is a mobile-first nutrition and fitness tracking application. It allows users to monitor daily food intake, log workouts, and visualize nutritional trends through an interactive, native-feeling web interface.

The project has evolved from a CLI logic core into a feature-rich Progressive Web App (PWA).

## Architecture

### Backend (Python/Flask)
*   **Server:** Flask running on port `5050`.
*   **Logic:** Core nutrient calculations and day-tracking logic in `app.py`.
*   **Data:** 
    *   `food.csv`: Master nutritional database (per 100g).
    *   `currentDay.json`: Tracks daily consumption.
    *   `avg.json`: Stores historical averages.

### Frontend (Modern Mobile UI)
*   **Layout:** Fixed header/footer with a scrollable central content area.
*   **Navigation:**
    *   **Bottom Nav:** Quick access to Workout, Add Meal (+), and Stats.
    *   **Side Drawer:** Hamburger menu containing Profile, Goals, and Settings.
*   **Interactivity:**
    *   **Modals:** All major features (Add Meal, Stats, Workouts, Meal Details) use full-screen or card-based overlays.
    *   **Search:** Real-time client-side food filtering.
    *   **Stepper:** Minimalist quantity adjustment (+/- buttons).
    *   **Expandable Lists:** "Today's Meals" items expand to show full nutrient breakdowns.
*   **Animations:**
    *   Smooth transitions for modals and sidebars.
    *   Counting-up numbers for nutrient totals.
    *   Animated loading bars and chart trends.
    *   Typewriter effect for AI-driven "Smart Insights".

### PWA & Offline Support
*   **Manifest:** `static/manifest.json` configures the app for standalone mobile installation (hides browser UI).
*   **Service Worker:** `static/sw.js` handles basic caching for performance and installation requirements.

## Key Files
*   **`app.py`**: Flask server and backend logic.
*   **`templates/index.html`**: Single-page application structure with multiple hidden views (modals).
*   **`static/css/style.css`**: Comprehensive styling including theme colors, animations, and PWA layout.
*   **`static/js/script.js`**: Frontend engine handling state, search, animations, and UI toggles.
*   **`static/sw.js`**: Service worker for PWA functionality.

## Usage
### Running the App
1. Ensure Flask is installed.
2. Run the server:
   ```bash
   python app.py
   ```
3. Access at `http://localhost:5050`.

### Mobile Installation
To view without browser bars:
1. Open the URL in a mobile browser (Chrome/Safari).
2. Select "Add to Home Screen" or "Install App".
3. Launch from the home screen icon.

## Development Status
*   **Frontend:** Structurally complete and polished.
*   **Backend Integration:** Frontend currently uses mock data for some features (Stats, Search, Workouts). Next steps involve connecting these UI components to the Python logic via Flask API endpoints and implementing a real database.