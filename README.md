# Squadify — Draft template

A single-page draft flow: pick a formation, then draft players per position from a CSV, and view your final team (scoring to be added later).

## How to run

1. Put your `players.csv` in this folder (or use the included `players.csv`).
2. Open `index.html` in a browser.

To avoid CORS issues when loading the CSV, serve the folder with a local server, for example:

- **Node:** `npx serve .` then open http://localhost:3000  
- **Python 3:** `python -m http.server 8000` then open http://localhost:8000  

## CSV format

Your CSV must have at least these columns (names matter):

| Column   | Description                    |
|----------|--------------------------------|
| `name`   | Player name                    |
| `position` | Position (see below)        |
| `club`   | Club / team name               |
| `year`   | Season year                    |

Any extra columns (e.g. `goals`, `assists`, `minutes`) are treated as statistics and shown on the draft cards and can be used later for scoring.

### Position values

Positions are matched case-insensitively. Use values that align with the formations:

- **GK** — Goalkeeper  
- **DEF / CB / RB / LB / RWB / LWB** — Defence  
- **MID / CM / RM / LM** — Midfield  
- **FWD / ST / RW / LW** — Forwards  

Formations map slots to these tags (e.g. a slot “CB” will accept rows with `position` = `CB` or `DEF`). Add more mappings in `app.js` in `FORMATIONS` if your CSV uses different labels.

## Flow

1. **Formation** — User selects one of 4-4-2, 4-3-3, 3-5-2, 3-4-3, 5-3-2.
2. **Draft** — For each position in that formation, four random players (from the CSV for that position) are shown. User picks one (or “Reroll” for new options, or “Skip” to take the first).
3. **Team** — Final XI is shown on a formation pitch. A “Team overview” section is reserved for scoring metrics.

## Next steps

- **Scoring:** Implement metrics in the “Team overview” section using `state.selectedTeam` and each player’s stats from the CSV.
- **Persistence:** Optionally save formation choice and drafted team (e.g. `localStorage` or backend).
- **CSV path:** Change `CSV_PATH` in `app.js` if your file lives elsewhere.
