🔬 Problem-Solving Documentation

🧩 Hypothesis

We hypothesized that:

Users prioritize different aspects of neighborhoods — such as safety, affordability, and nearby cafes — and these priorities vary by individual.A simple, personalized scoring system can help recommend better-fit neighborhoods.

🧪 Algorithm Design

We implemented a weighted scoring algorithm based on user input:

score = (safety × weight1 + affordability × weight2 + cafes × weight3) / totalWeight

The weights are provided in real-time by the user through slider inputs (0–10)

The algorithm scores each neighborhood from the database

The top 3 neighborhoods are returned as best matches

⚙️ Design Rationale

Simplicity & Clarity: Easy for users to understand and adjust preferences

Scalable: More factors (e.g., schools, traffic, greenery) can be added later

Real-time: All calculations happen server-side with a live database and REST API

❗ Limitations Identified

Despite working well for demo purposes, this MVP has limitations:

⚠️ Static Data: Neighborhood data is mocked and stored manually; no live updates

⚠️ No User Profiles: Preferences are not saved per user or session

⚠️ Single Metric Match: Only uses 3 parameters (safety, affordability, cafes)

⚠️ No Geo-awareness: No mapping, distance, or location services yet

⚠️ Hardcoded Scoring Logic: Doesn’t learn or adapt over time

📈 Future Improvements

To improve and expand this project:

🔐 Add User Profiles

Allow users to sign in, save preferences, and track history

📍 Map Integration

Display results on a map with pins and directions (e.g., Google Maps API)

📊 Better Data

Pull real data from APIs like OpenStreetMap, government datasets, or Yelp

🧠 AI Matching

Use ML-based scoring instead of static weights (e.g., clustering or ranking models)

🗃️ Admin Dashboard

Allow admins to add/edit neighborhood data dynamically
