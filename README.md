# End-to-End House Price Prediction

A full-stack web application that predicts house prices in Bangalore using machine learning. The system combines a Python ML model, a Node.js backend API, and a React frontend UI.

## 🏠 Project Overview

This project helps users predict house prices in Bangalore based on property features like location, area, number of bedrooms, and bathrooms. It demonstrates the complete machine learning pipeline from data cleaning to model deployment with a user-friendly web interface.

## 📂 Project Structure

```
├── ML/                  # Machine Learning pipeline and model training
├── backend/             # Node.js API server
├── frontend/            # React + Vite web application
└── project.json         # Project configuration
```

## 🛠 Technology Stack

- **Backend:** Node.js + Express.js
- **Frontend:** React + Vite + Tailwind CSS
- **ML/Model:** Python (scikit-learn, pandas, numpy)
- **Database/Artifacts:** CSV dataset and trained model files

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- npm or yarn

### Setup Instructions

#### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env file if needed
npm start
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### 3. ML Environment (Optional - already configured)
```bash
cd ML
source env/bin/activate
pip install -r requirements.txt
```

## 📊 Dataset

- **Source:** Bangalore House Prices (Kaggle)
- **Size:** 13,000+ records
- **Features:** Location, area (sqft), bedrooms (BHK), bathrooms, price

## 🤖 Machine Learning Pipeline

1. **Data Cleaning:** Removed missing values, outliers, and unnecessary columns
2. **Feature Engineering:** Created `price_per_sqft`, encoded categorical features
3. **Model Training:** Used regression algorithms to predict prices
4. **Model Serialization:** Saved trained model for API predictions

The Python prediction script (`ML/src/model/predict.py`) accepts property features and returns price predictions.

## 🌐 API Endpoint

**POST** `/api/predict`

Accepts property features and returns predicted house price.

Example request:
```json
{
  "location": "Bangalore",
  "total_sqft": 1200,
  "bhk": 2,
  "bathrooms": 1
}
```

## 🎨 Frontend Features

- **Home Page:** Project overview and introduction
- **Listings Page:** Browse property listings
- **Predict Page:** Interactive form to enter property details and get price predictions
- **About & Contact Pages:** Additional information and contact

## 📝 Key Files

- `backend/app.js` — Express server entry point
- `backend/src/routes/predict.routes.js` — API route for predictions
- `frontend/src/App.jsx` — React app main component
- `frontend/src/components/PricePredictor.jsx` — Price prediction form component
- `ML/notebooks/` — Jupyter notebooks for model development and analysis

## 🔧 Configuration

### Backend Environment Variables (`.env`)
```
PORT=5000
VITE_API_BASE_URL=http://localhost:5000/api
PYTHON_BIN=/path/to/python
```

### Frontend Environment Variables (`.env.local`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📖 Project Goals

✅ Build a reliable house price prediction model  
✅ Perform real-world data cleaning and feature engineering  
✅ Develop a full-stack web application  
✅ Create a user-friendly interface for predictions  

## 📧 Support

For detailed information about specific components:
- See `backend/README.md` for API documentation
- See `frontend/README.md` for frontend setup
- See `ML/README.md` for ML pipeline details

---

# Project Name

## 📱 Live Deployment

| Platform | Status | URL |
|----------|--------|-----|
| **Vercel** | ✅ Live | [https://end-to-end-house-price-prediction.vercel.app](https://end-to-end-house-price-prediction.vercel.app) |

### Quick Access
- 🌐 **Live Website:** [end-to-end-house-price-prediction.vercel.app](https://end-to-end-house-price-prediction.vercel.app)
- 📁 **Source Code:** [GitHub Repository](https://github.com/KaviduIsura/end-to-end-house-price-prediction.git)

### Deployment Details
- **Platform:** Vercel
- **Status:** Production
- **URL:** https://end-to-end-house-price-prediction.vercel.app


**Built with ❤️ for house price prediction in Bangalore**
