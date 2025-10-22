# ⚡ AmpLogic

**AmpLogic** is a power load calculator designed for AV and live event professionals. It helps you quickly and safely estimate whether your chosen power cable and connector can handle the total load from multiple devices like TVs, moving lights, and LED processors.

---

## 🔧 Features

- Build an equipment list with per-item wattage, quantity, department, circuit, and phase tags
- Import device lists from CSV or add gear on the fly
- Automatically totals load per device, circuit, department, and phase
- Checks cable size, plug rating, venue supply limits, and voltage drop in real time
- Highlights overload risk and suggests fixes when limits are exceeded
- Offers auto three-phase balancing plus generator sizing guidance
- Exports the full plan (devices, summary, breakdowns) to CSV with one click
- Runs entirely in the browser—nothing to install, mobile-friendly UI

---

## 🚀 Live Demo

👉 [https://domtrotta.github.io/AmpLogic](https://domtrotta.github.io/AmpLogic)

*(Update the link above after deploying to GitHub Pages)*

---

## 🛠️ How to Use

1. Enter the device name, wattage, quantity, department, and circuit, then click **Add Device** (or import a CSV list).
2. Choose the cable size, length, plug/connector rating, and phase configuration (single- or three-phase).
3. Optional: set venue supply limits or a generator capacity to see pass/fail indicators.
4. Click **Calculate** (or adjust any value) to refresh totals, per-phase currents, and safety checks.
5. If you are on three-phase, use **Auto Balance Phases** to redistribute the heaviest loads evenly across L1/L2/L3.
6. Export the device list and summaries with **Export CSV** for show files or sign-off.

---

## 📥 CSV Import Format

The importer expects comma-separated values in the following column order (header row optional):

```
Device Name, Wattage, Quantity, Department, Circuit, Phase
```

- `Device Name` (text) — required  
- `Wattage` (number, watts) — required  
- `Quantity` (integer) — required  
- `Department` (text) — optional (defaults to “Other”)  
- `Circuit` (text) — optional  
- `Phase` (L1/L2/L3) — optional; ignored in single-phase mode

---

## 📁 Project Structure

```
AmpLogic/
├── index.html        # Main app layout
├── style.css         # Dark theme styling
├── script.js         # Legacy logic (current app inlines scripts in index.html)
└── README.md         # You're reading it
```

---

## 🧪 Tech Stack

- HTML / CSS / JavaScript
- No frameworks, no dependencies
- Hosted on GitHub Pages

---

## 🧑‍💻 Author

Built by [Dom Trotta](https://github.com/domtrotta)  
🎚️ Sound | 🎛️ Systems | ⚡ AV Tech

---

## 📘 License

MIT — feel free to use, modify, and share!
