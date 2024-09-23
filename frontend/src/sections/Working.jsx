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
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Set loading state to true
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      // Convert features object to an array of feature values (0 or 1)

      const featureValues = Object.values(features);

      // Send a POST request to the Django API
      const response = await axios.post('https://baymax-deploy.onrender.com/predict', {
        features: featureValues,
      });

      // Set the prediction result from the API response
      setLoading(false); // Set loading state to false
      setPrediction(response.data.prediction);
    } catch (error) {
      setLoading(false); // Set loading state to false
      setError('An error occurred while predicting. Please try again.');
    }
  };

  const deleteItem = (feature) => {
    setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    setFeatures({
      ...features,
      [feature]: 0, 
    });
  }

  return (
    <div className="min-h-max bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 py-16" id='working'>
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
        <div className="bg-gray-800 rounded-md shadow-md w-full">
          {filteredFeatures.length > 0 && (
            <ul className="max-h-60 overflow-y-auto">
              {filteredFeatures.map((feature, index) => (
                <li
                  key={index}
                  onClick={() => handleFeatureSelect(feature)}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                >
                  {feature.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} {/* Capitalize first letter of each word */}
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
                <div>
                  <li key={index} className="p-2 bg-gray-700 rounded mb-2 flex justify-between">
                  {feature.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                  <svg className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" 
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" 
                  height="24" fill="currentColor" viewBox="0 0 24 24" onClick={() => deleteItem(feature)}>
  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
</svg>

                </li>

                </div>
              ))}
            </ul>
          </div>
          <button
            onClick={handlePredict}
            className="mt-6 w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Predict
          </button>
          {loading && 
      <div className="flex justify-center mt-4 transiton-all ease-in-out duration-500">
      <button disabled type="button" className="text-white bg-blue-700 h-max hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button>
</div>
}
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
