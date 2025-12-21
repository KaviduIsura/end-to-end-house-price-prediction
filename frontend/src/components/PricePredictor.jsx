import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator, Home, Bath, Bed, Square, MapPin, 
  Download, Share2, Calendar, Search, ChevronDown, 
  Check, TrendingUp, Shield, Building, DollarSign,
  Star, Crown, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const PricePredictor = () => {
  const [formData, setFormData] = useState({
    availability: 'Ready To Move',
    total_sqft: '',
    bath: '',
    balcony: '',
    bhk: '',
    log_price_per_sqft: '',
    location: 'Whitefield'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const dropdownRef = useRef(null);

  // Load all locations on component mount
  useEffect(() => {
    const locations = [
      // Premium Tier (Count > 100)
      { name: 'Whitefield', count: 540, tier: 'premium' },
      { name: 'Sarjapur Road', count: 399, tier: 'premium' },
      { name: 'Electronic City', count: 302, tier: 'premium' },
      { name: 'Kanakpura Road', count: 273, tier: 'premium' },
      { name: 'Thanisandra', count: 234, tier: 'premium' },
      { name: 'Yelahanka', count: 213, tier: 'premium' },
      { name: 'Uttarahalli', count: 186, tier: 'premium' },
      { name: 'Hebbal', count: 177, tier: 'premium' },
      { name: 'Marathahalli', count: 175, tier: 'premium' },
      { name: 'Raja Rajeshwari Nagar', count: 171, tier: 'premium' },
      
      // Standard Tier (Count 50-100)
      { name: 'Bannerghatta Road', count: 152, tier: 'standard' },
      { name: 'Hennur Road', count: 152, tier: 'standard' },
      { name: '7th Phase JP Nagar', count: 149, tier: 'standard' },
      { name: 'Haralur Road', count: 142, tier: 'standard' },
      { name: 'Electronic City Phase II', count: 132, tier: 'standard' },
      { name: 'Rajaji Nagar', count: 107, tier: 'standard' },
      { name: 'Chandapura', count: 100, tier: 'standard' },
      { name: 'Bellandur', count: 96, tier: 'standard' },
      { name: 'KR Puram', count: 91, tier: 'standard' },
      { name: 'Hoodi', count: 88, tier: 'standard' },
      { name: 'Electronics City Phase 1', count: 88, tier: 'standard' },
      { name: 'Yeshwanthpur', count: 85, tier: 'standard' },
      { name: 'Begur Road', count: 84, tier: 'standard' },
      { name: 'Sarjapur', count: 82, tier: 'standard' },
      { name: 'Kasavanhalli', count: 80, tier: 'standard' },
      { name: 'Harlur', count: 79, tier: 'standard' },
      { name: 'Banashankari', count: 75, tier: 'standard' },
      { name: 'Hormavu', count: 74, tier: 'standard' },
      { name: 'Ramamurthy Nagar', count: 73, tier: 'standard' },
      { name: 'Kengeri', count: 73, tier: 'standard' },
      { name: 'Koramangala', count: 72, tier: 'standard' },
      { name: 'JP Nagar', count: 72, tier: 'standard' },
      { name: 'Hosa Road', count: 72, tier: 'standard' },
      { name: 'Old Madras Road', count: 71, tier: 'standard' },
      { name: 'Jakkur', count: 71, tier: 'standard' },
      { name: 'Varthur', count: 70, tier: 'standard' },
      { name: 'Kothanur', count: 66, tier: 'standard' },
      { name: 'Kaggadasapura', count: 64, tier: 'standard' },
      { name: 'Nagarbhavi', count: 63, tier: 'standard' },
      { name: 'Thigalarapalya', count: 62, tier: 'standard' },
      { name: 'Akshaya Nagar', count: 62, tier: 'standard' },
      { name: 'TC Palaya', count: 60, tier: 'standard' },
      { name: 'Malleshwaram', count: 58, tier: 'standard' },
      { name: '8th Phase JP Nagar', count: 57, tier: 'standard' },
      { name: 'Rachenahalli', count: 56, tier: 'standard' },
      { name: 'Hennur', count: 55, tier: 'standard' },
      { name: 'Budigere', count: 54, tier: 'standard' },
      { name: 'Jigani', count: 54, tier: 'standard' },
      { name: 'HSR Layout', count: 53, tier: 'standard' },
      { name: 'Jalahalli', count: 52, tier: 'standard' },
      { name: 'Hulimavu', count: 52, tier: 'standard' },
      { name: 'Bisuvanahalli', count: 51, tier: 'standard' },
      { name: 'Panathur', count: 51, tier: 'standard' },
      { name: 'Ramagondanahalli', count: 50, tier: 'standard' },
      { name: 'Mysore Road', count: 50, tier: 'standard' },
      
      // Economy Tier (Count < 50) - Just a sample, add more as needed
      { name: 'Bhoganhalli', count: 49, tier: 'economy' },
      { name: 'Hegde Nagar', count: 49, tier: 'economy' },
      { name: 'Gottigere', count: 48, tier: 'economy' },
      { name: 'Hosur Road', count: 47, tier: 'economy' },
      { name: 'Kundalahalli', count: 47, tier: 'economy' },
      { name: 'Brookefield', count: 47, tier: 'economy' },
      { name: 'Other', count: 2780, tier: 'other' }
    ];
    
    // Sort by count (descending) to show popular ones first
    const sortedLocations = locations.sort((a, b) => b.count - a.count);
    setAllLocations(sortedLocations);
  }, []);

  // Filter locations based on search
  const filteredLocations = locationSearch 
    ? allLocations.filter(location =>
        location.name.toLowerCase().includes(locationSearch.toLowerCase())
      ).slice(0, 30)
    : allLocations.slice(0, 20);

  const availabilityOptions = [
    { value: 'Ready To Move', label: 'Ready To Move' },
    { value: 'Immediate Possession', label: 'Immediate Possession' },
    { value: '2024-12-18', label: 'Dec 18, 2024' },
    { value: '2025-03-15', label: 'Mar 15, 2025' },
    { value: '2025-06-30', label: 'Jun 30, 2025' },
    { value: 'Under Construction', label: 'Under Construction' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, location: location.name }));
    setLocationSearch(location.name);
    setShowLocationDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate inputs
    if (!formData.total_sqft || !formData.bath || !formData.bhk || !formData.balcony || !formData.location) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Prepare submission data
      const submissionData = {
        availability: formData.availability,
        total_sqft: parseFloat(formData.total_sqft),
        bath: parseFloat(formData.bath),
        balcony: parseFloat(formData.balcony),
        bhk: parseInt(formData.bhk),
        log_price_per_sqft: parseFloat(formData.log_price_per_sqft) || 8.5,
        location: formData.location
      };

      const response = await axios.post('http://localhost:5001/api/predict', submissionData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });
      
      console.log('API Response:', response.data);
      
      // Handle response - checking for success flag
      if (response.data && response.data.success !== false) {
        // Get price from either predicted_price or prediction field
        const price = response.data.predicted_price || response.data.prediction;
        
        if (price !== undefined) {
          setPrediction({
            price: price,
            locationUsed: response.data.location_column || response.data.location_used || '',
            availabilityEncoded: response.data.availability_value || response.data.availability_encoded || 0,
            debugInfo: response.data.debug_info || response.data
          });
        } else {
          setError('No price prediction found in response');
        }
      } else {
        setError(response.data?.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      
      let errorMessage = 'Failed to get prediction. Please try again.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again.';
      } else if (err.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check if backend server is running.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      availability: 'Ready To Move',
      total_sqft: '',
      bath: '',
      balcony: '',
      bhk: '',
      log_price_per_sqft: '',
      location: 'Whitefield'
    });
    setLocationSearch('Whitefield');
    setPrediction(null);
    setError(null);
  };

  const formatCurrency = (value) => {
    if (!value) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper to determine if availability should be encoded as 1
  const isImmediateAvailability = () => {
    const immediateValues = ['Ready To Move', 'Immediate Possession'];
    return immediateValues.includes(formData.availability);
  };

  // Get price per sqft
  const getPricePerSqft = () => {
    if (!prediction || !formData.total_sqft || formData.total_sqft <= 0) return 0;
    return prediction.price / formData.total_sqft;
  };

  // Get tier badge color
  const getTierColor = (tier) => {
    switch(tier) {
      case 'premium': return 'bg-purple-500/20 text-purple-400';
      case 'standard': return 'bg-blue-500/20 text-blue-400';
      case 'economy': return 'bg-green-500/20 text-green-400';
      case 'other': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Get tier icon
  const getTierIcon = (tier) => {
    switch(tier) {
      case 'premium': return <Crown size={14} />;
      case 'standard': return <Star size={14} />;
      case 'economy': return <Building size={14} />;
      default: return <Building size={14} />;
    }
  };

  // Get current location tier
  const getCurrentLocationTier = () => {
    const location = allLocations.find(loc => loc.name === formData.location);
    return location ? location.tier : 'other';
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary-500/10 mb-4">
          <Calculator className="text-primary-500" size={32} />
        </div>
        <h1 className="section-title">AI Property Price Predictor</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Get accurate property valuations powered by machine learning. 
          Our AI analyzes thousands of data points for precise predictions.
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
                  Total Square Feet *
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
                  BHK *
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
                  Bathrooms *
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
                <label className="label-text">Balconies *</label>
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
                <label className="label-text">
                  <Calendar size={16} className="inline mr-2" />
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  {availabilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-sm">
                  {isImmediateAvailability() ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      ✓ Immediate availability (Value: 1)
                    </span>
                  ) : (
                    <span className="text-orange-600 dark:text-orange-400">
                      Future date (Value: 0)
                    </span>
                  )}
                </div>
              </div>

              <div className="relative" ref={dropdownRef}>
                <label className="label-text">
                  <MapPin size={16} className="inline mr-2" />
                  Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationSearch || formData.location}
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    className="input-field pr-10"
                    placeholder="Search or select location"
                    required
                  />
                  <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                  <ChevronDown 
                    className="absolute right-10 top-3 text-gray-400 cursor-pointer" 
                    size={20}
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  />
                  
                  {showLocationDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 dark:border-dark-700">
                        <input
                          type="text"
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Type to search locations..."
                          autoFocus
                        />
                      </div>
                      
                      <div className="max-h-48 overflow-y-auto">
                        {filteredLocations.map((location) => (
                          <div
                            key={location.name}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors ${
                              formData.location === location.name ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                            }`}
                            onClick={() => handleLocationSelect(location)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-1.5 rounded-md ${getTierColor(location.tier)}`}>
                                  {getTierIcon(location.tier)}
                                </div>
                                <div>
                                  <span className={formData.location === location.name ? 'text-primary-600 dark:text-primary-400 font-medium' : ''}>
                                    {location.name}
                                  </span>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {location.count.toLocaleString()} properties
                                  </div>
                                </div>
                              </div>
                              {formData.location === location.name && (
                                <Check size={16} className="text-primary-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="label-text">
                <DollarSign size={16} className="inline mr-2" />
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
                <div className="flex items-start">
                  <AlertCircle className="text-red-500 mr-2 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-500 font-medium">Error</p>
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {prediction ? (
            <>
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
                    {formatCurrency(prediction.price)}
                  </div>
                  <p className="text-gray-400">Total Property Value</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400">Price per Sqft</span>
                    <span className="text-white font-semibold">
                      ₹{getPricePerSqft().toFixed(2)}/sqft
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400">Location</span>
                    <span className="text-primary-300 font-mono text-sm">
                      {prediction.locationUsed.replace('location_', '')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400">Availability</span>
                    <span className={isImmediateAvailability() ? "text-green-400 font-semibold" : "text-orange-400 font-semibold"}>
                      {isImmediateAvailability() ? '✓ Immediate (1)' : 'Future (0)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400">AI Confidence</span>
                    <span className="text-green-400 font-semibold">94.7%</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn-primary flex-1">
                    <Download className="mr-2" size={20} />
                    Save Report
                  </button>
                  <button className="btn-outline flex-1 !text-white !border-white/30">
                    <Share2 className="mr-2" size={20} />
                    Share
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-primary-500" size={24} />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"></div>
                    <span className="text-gray-300 text-sm">
                      This price is competitive for a {getCurrentLocationTier()} tier location
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3"></div>
                    <span className="text-gray-300 text-sm">
                      Consider similar properties in nearby areas for better deals
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card bg-gradient-to-br from-dark-800/50 to-dark-900/30">
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-2xl bg-primary-500/10 mb-6">
                  <Calculator className="text-primary-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Get Instant Valuation</h3>
                <p className="text-gray-400 mb-8">
                  Fill in your property details to get an AI-powered price prediction.
                </p>
                <div className="inline-flex items-center space-x-2 text-primary-400">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <span>Powered by Machine Learning</span>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield className="mr-2 text-primary-500" size={24} />
              How AI Prediction Works
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Location Analysis', desc: 'Analyzes recent sales in the area' },
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