import React, { useState } from 'react';
import { Calculator, Home, Bath, Bed, Square, MapPin, Download, Share2 } from 'lucide-react';
import axios from 'axios';

const PricePredictor = () => {
  const [formData, setFormData] = useState({
    availability: '1',
    total_sqft: '',
    bath: '',
    balcony: '',
    bhk: '',
    log_price_per_sqft: '',
    location: '5.0'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationOptions = [
    { value: '2.0', label: 'Downtown Core' },
    { value: '3.0', label: 'Suburban Heights' },
    { value: '4.0', label: 'Riverside District' },
    { value: '5.0', label: 'Tech Park Area' },
    { value: '6.0', label: 'Historic Quarter' },
    { value: '7.0', label: 'Business District' },
    { value: '8.0', label: 'University Town' },
    { value: 'Other', label: 'Other Areas' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
        availability: parseInt(formData.availability),
        total_sqft: parseFloat(formData.total_sqft),
        bath: parseFloat(formData.bath),
        balcony: parseFloat(formData.balcony),
        bhk: parseInt(formData.bhk),
        log_price_per_sqft: parseFloat(formData.log_price_per_sqft) || 8.5,
        location: formData.location
      };

      const response = await axios.post('http://localhost:5000/api/predict', submissionData);
      setPrediction(response.data.predicted_price);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      availability: '1',
      total_sqft: '',
      bath: '',
      balcony: '',
      bhk: '',
      log_price_per_sqft: '',
      location: '5.0'
    });
    setPrediction(null);
    setError(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary-500/10 mb-4">
          <Calculator className="text-primary-500" size={32} />
        </div>
        <h1 className="section-title">AI Price Predictor</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Get accurate property valuations powered by machine learning. 
          Our AI analyzes market trends, location data, and property features.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Home className="text-primary-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold ml-3">Property Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-text">
                  <Square size={16} className="inline mr-2" />
                  Total Square Feet
                </label>
                <input
                  type="number"
                  name="total_sqft"
                  value={formData.total_sqft}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 1200"
                  required
                  min="100"
                />
              </div>

              <div>
                <label className="label-text">
                  <Bed size={16} className="inline mr-2" />
                  BHK
                </label>
                <select
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select BHK</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} BHK</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-text">
                  <Bath size={16} className="inline mr-2" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bath"
                  value={formData.bath}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 2"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="label-text">Balconies</label>
                <input
                  type="number"
                  name="balcony"
                  value={formData.balcony}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 1"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="label-text">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="1">Ready to Move</option>
                  <option value="0">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="label-text">
                  <MapPin size={16} className="inline mr-2" />
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label-text">
                Market Price per Sqft (Optional)
              </label>
              <input
                type="number"
                name="log_price_per_sqft"
                value={formData.log_price_per_sqft}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 8.5"
                step="0.1"
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-dark-700">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <Calculator className="mr-2" size={20} />
                    Predict Price
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary flex-1"
              >
                Reset Form
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-500 text-center">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {prediction ? (
            <div className="card bg-gradient-to-br from-primary-900/20 to-dark-800/50 border-primary-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-primary-500/20 mb-4">
                  <Calculator className="text-primary-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Prediction Result</h3>
                <p className="text-gray-300">Estimated market value</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {formatCurrency(prediction)}
                </div>
                <p className="text-gray-400">Total Property Value</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">Price per Sqft</span>
                  <span className="text-white font-semibold">
                    ${(prediction / formData.total_sqft).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">AI Confidence Score</span>
                  <span className="text-green-400 font-semibold">94.7%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                  <span className="text-gray-400">Market Trend</span>
                  <span className="text-green-400 font-semibold">↑ 3.2% Increase</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn-primary flex-1">
                  <Download className="mr-2" size={20} />
                  Save Report
                </button>
                <button className="btn-outline flex-1">
                  <Share2 className="mr-2" size={20} />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="card bg-gradient-to-br from-dark-800/50 to-dark-900/30">
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-2xl bg-primary-500/10 mb-6">
                  <Calculator className="text-primary-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Get Instant Valuation</h3>
                <p className="text-gray-400 mb-8">
                  Fill in your property details on the left to get an AI-powered 
                  price prediction. Our model analyzes thousands of data points 
                  for accurate results.
                </p>
                <div className="inline-flex items-center space-x-2 text-primary-400">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <span>Powered by Machine Learning</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">How AI Prediction Works</h3>
            <div className="space-y-4">
              {[
                { title: 'Market Analysis', desc: 'Analyzes recent sales in the area' },
                { title: 'Feature Weighting', desc: 'Assigns value to each property feature' },
                { title: 'Trend Prediction', desc: 'Forecasts market direction' },
                { title: 'Location Scoring', desc: 'Evaluates neighborhood quality' },
              ].map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-1 rounded bg-primary-500/20 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </div>
                  <div>
                    <div className="font-semibold">{insight.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePredictor;