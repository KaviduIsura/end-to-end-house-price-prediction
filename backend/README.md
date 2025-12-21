# Backend

Simple backend for the End-to-End House Price Prediction project.

## Overview

This service exposes an API that accepts property features and returns a price prediction. The backend is a Node.js app (entry: `app.js`) and uses a Python prediction script located at `src/model/predict.py`.

## Prerequisites

- Node.js (recommended v16+)
- npm or yarn
- Python 3.8+ and any required Python packages for the prediction model (see `src/model/predict.py`).

Note: A `.env` file is expected at the backend root for configuration (see Environment).

## Setup

1. Install Node dependencies:

```bash
cd backend
npm install
```

2. Ensure Python dependencies for the model are installed. You can create a venv and install packages listed by the project maintainer. Example:

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt  # if a requirements file exists for the model
```

If the project already provides an ML environment (e.g., `ML/env`), you may reuse it and point the backend to the correct Python executable via environment variables.

## Environment

Create a `.env` file in the `backend/` folder. Common variables:

- `PORT` - port to run the server (default: 5000)
- `MODEL_PATH` - path to any saved model files used by `predict.py` (optional)
- `PYTHON_BIN` - path to the Python interpreter to run `predict.py` (optional)

Example `.env`:

```
PORT=5000
MODEL_PATH=src/model/artifacts/model.pkl
PYTHON_BIN=/full/path/to/python
```

## Run

Start the server:

```bash
cd backend
npm start    # or `node app.js` if no start script
```

If the backend invokes the Python script directly, ensure `PYTHON_BIN` points to the correct interpreter with required packages installed.

## API

Base path: `/api` (confirm in `src/routes`)

- POST `/api/predict` — Accepts JSON with property features and returns a price prediction.

Request example (JSON):

```json
{
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 1500,
  "location": "Some Neighborhood"
}
```

Response example:

```json
{
  "predicted_price": 425000
}
```

Adjust field names to match what `src/model/predict.py` expects.

## Key files

- `app.js` — server entry point
- `src/routes/predict.routes.js` — route(s) for prediction
- `src/model/predict.py` — Python script that performs prediction

## Troubleshooting

- If predictions fail, check the logs for the Python process and confirm `PYTHON_BIN` is correct and dependencies are installed.
- If the server does not start, confirm dependencies were installed with `npm install` and the `PORT` variable is set correctly.

## Next steps / Notes

- Add a `requirements.txt` or `pyproject.toml` for the prediction model to simplify Python dependency management.
- Consider adding health-check and validation for incoming requests.

---

If you want, I can also add a sample `.env.example` or verify the start script in `package.json`.
