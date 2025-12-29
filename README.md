# NutTracker 🥑💪

**NutTracker** is a modern, mobile-first Progressive Web App (PWA) designed to help you track your nutrition and fitness goals with ease. Built with a lightweight Flask backend and a native-feeling vanilla JavaScript frontend, it offers a seamless experience on both mobile and desktop.

## 📱 App Preview

| Home Screen | Today's Log | Statistics |
| :---: | :---: | :---: |
| ![Home](images/home.png) | ![Today's Log](images/todayLog.png) | ![Statistics](images/statistics.png) |

## ✨ Features

*   **📱 Mobile-First Design:** Optimized for touch interactions with a bottom navigation bar, side drawer, and modal overlays.
*   **🌗 Dark Mode:** Premium dark mode by default with a smooth toggle switch and persistent user preference.
*   **⚡ Progressive Web App (PWA):** Installable on mobile devices (Add to Home Screen) for a full-screen, native-app experience with offline capabilities.
*   **🥗 Nutrition Tracking:** Log meals, track calories, protein, carbs, fat, and fiber against your daily goals.
*   **🏋️ Workout Log:** Record your exercises, sets, reps, and weights.
*   **📊 Interactive Stats:** Visualize your weekly/monthly trends with animated charts and progress bars.
*   **🤖 Smart Insights:** "AI-powered" insights (simulated) that analyze your habits and offer suggestions.
*   **🔎 Instant Search:** Fast, client-side filtering for adding foods.

## 🛠️ Tech Stack

*   **Backend:** Python 3, Flask
*   **Frontend:** HTML5, CSS3 (Variables + Flexbox/Grid), Vanilla JavaScript (ES6+)
*   **Data:** JSON (for daily logs), CSV (food database)
*   **PWA:** Service Workers, Web App Manifest

## 🚀 Getting Started

### Prerequisites

*   Python 3.x installed on your system.
*   A modern web browser (Chrome, Safari, Firefox).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/nutTracker.git
    cd nutTracker
    ```

2.  **Set up a Virtual Environment:**
    It is recommended to use a virtual environment to manage dependencies.
    
    *   **Linux/macOS:**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
    *   **Windows:**
        ```bash
        python -m venv venv
        venv\Scripts\activate
        ```

3.  **Install Dependencies:**
    Install the required modules from `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the Application:**
    ```bash
    python app.py
    ```

5.  **Access the App:**
    Open your browser and navigate to: `http://localhost:5050`

## 📱 Mobile Installation (PWA)

To get the full native experience without browser bars:

1.  **Ensure your phone and computer are on the same Wi-Fi.**
2.  **Find your computer's local IP address** (e.g., `192.168.1.X`).
3.  **Open the app on your phone** using that IP: `http://192.168.1.X:5050`.
4.  **Add to Home Screen:**
    *   **iOS (Safari):** Tap 'Share' icon → 'Add to Home Screen'.
    *   **Android (Chrome):** Tap menu (⋮) → 'Install App' or 'Add to Home Screen'.
5.  Launch **NutTracker** from your home screen!

## 📂 Project Structure

```
nutTracker/
├── app.py              # Flask server & backend logic
├── food.csv            # Nutritional database
├── currentDay.json     # Daily log persistence
├── templates/
│   └── index.html      # Main SPA view
├── static/
│   ├── css/
│   │   └── style.css   # Styling (Themes, Animations)
│   ├── js/
│   │   └── script.js   # Frontend logic (Modals, State)
│   ├── sw.js           # Service Worker (PWA)
│   └── manifest.json   # PWA Configuration
└── README.md           # Documentation
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## ⚠️ Note on Development

This project utilizes a **Large Language Model (LLM)** to assist in the design and implementation of the **Frontend UI only** (HTML, CSS, JavaScript). The **Backend logic** (Python/Flask) is developed manually to ensure deep control and understanding. However, LLMs are employed to generate high-quality **code comments and documentation** across the entire codebase.
