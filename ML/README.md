# End-to-End House Price Prediction System

A full-stack machine learning web application that predicts house prices in Bangalore
based on user inputs using React, Node.js, and Python.

---

## 📌 Problem Statement
Buying a house in Bangalore is challenging due to fluctuating prices influenced by
multiple factors such as location, area, number of bedrooms, and bathrooms.
This project aims to build an end-to-end machine learning system that predicts
house prices based on these features.

---

## 🎯 Project Objectives
- Build a reliable house price prediction model
- Perform real-world data cleaning and feature engineering
- Analyze correlations between features and price
- Develop a full-stack web application
- Deploy the system for public use

---

## 🗂 Dataset
- **Source:** Bangalore House Prices Dataset (Kaggle)
- **Records:** ~13,000+
- **Features Used:**
  - Location
  - Total Square Feet
  - Number of Bedrooms (BHK)
  - Number of Bathrooms
  - Price (target variable)

---

## 🧹 Data Cleaning & Preprocessing
The dataset contained missing values, textual and ranged numerical values, and
outliers. The following steps were applied:

- Removed unnecessary columns (`area_type`, `society`, `balcony`)
- Handled missing values by removing incomplete records
- Converted `size` column into numerical BHK values
- Converted ranged and textual `total_sqft` values into numerical format
- Engineered `price_per_sqft` feature
- Reduced rare locations to a single `other` category
- Removed outliers based on domain knowledge and statistical analysis
- One-hot encoded categorical features

---

## 📊 Exploratory Data Analysis (EDA)
- Correlation analysis between numerical features and price
- Mean price analysis for categorical features such as location
- Identified strong positive correlation between price and total square feet
- Observed significant price variation across locations

---

## 🧠 Machine Learning Model
- **Models Tested:**
  - Linear Regression
  - Random Forest Regressor
- **Final Model:** Random Forest Regressor
- **Evaluation Metric:** R² Score (0.965)


The final model was selected based on performance, simplicity, and interpretability.

---

## 🏗 System Architecture
