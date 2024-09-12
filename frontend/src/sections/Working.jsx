import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main App component
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [features, setFeatures] = useState({});
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Fetch features from JSON file on component mount
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('src/sections/features.json');
        const data = await response.json();
        setFeatures(data.features);
      } catch (err) {
        setError('Failed to load features');
      }
    };
    fetchFeatures();
  }, []);

  // Filter features based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = Object.keys(features).filter((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFeatures(filtered);
    } else {
      setFilteredFeatures([]);
    }
  }, [searchTerm, features]);

  // Handle feature selection
  const handleFeatureSelect = (feature) => {
    if (!selectedFeatures.includes(feature)) {
      setSelectedFeatures([...selectedFeatures, feature]);
      setFeatures({
        ...features,
        [feature]: 1, // Set selected feature's value to 1
      });
    }
    setSearchTerm('');
    setFilteredFeatures([]);
  };

  // Handle prediction button click
  const handlePredict = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      // Convert features object to an array of feature values (0 or 1)
      const featureValues = Object.values(features);

      // Send a POST request to the Django API
      console.log(featureValues)
      const response = await axios.post('http://127.0.0.1:8000/api/predictions/predict/', {
        features: featureValues,
      });

      // Set the prediction result from the API response
      setPrediction(response.data.prediction);
    } catch (error) {
      setError('An error occurred while predicting. Please try again.');
    }
  };

  return (
    <div className="min-h-max bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 py-16">
      <h1 className="text-center text-5xl font-bold max-sm:text-2xl py-4 mb-8">
        Symptoms Selection & Prediction
      </h1>
      <h2 className="py-4 text-center text-2xl max-sm:text-lg">
        Enter the symptoms you've been experiencing and select those that match.
      </h2>
      <h2 className="py-4 text-center mb-8 text-slate-400">
        Once you're ready, click "Predict" to see the potential health conditions
        that match your symptoms.
      </h2>
      <div className="w-full max-w-md flex flex-col items-center justify-center mx-auto">
        <input
          type="text"
          placeholder="Search for symptoms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-4 rounded-md text-gray-900"
        />
        <div className="bg-gray-800 rounded-md shadow-md">
          {filteredFeatures.length > 0 && (
            <ul className="max-h-60 overflow-y-auto">
              {filteredFeatures.map((feature, index) => (
                <li
                  key={index}
                  onClick={() => handleFeatureSelect(feature)}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                >
                  {feature.replace(/_/g, ' ')} {/* Replace underscores with spaces for readability */}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 w-full max-w-md">
          <div className="bg-gray-800 rounded-md p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2">Selected Symptoms</h2>
            <ul>
              {selectedFeatures.map((feature, index) => (
                <li key={index} className="p-2 bg-gray-700 rounded mb-2">
                  {feature.replace(/_/g, ' ')}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handlePredict}
            className="mt-6 w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Predict
          </button>
          {prediction && (
            <div className="mt-6 p-4 bg-gray-800 rounded-md shadow-md">
              <h2 className="text-lg font-bold">Prediction</h2>
              <p>{prediction}</p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-500 rounded-md">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
