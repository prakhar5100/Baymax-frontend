import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const hospitalIcon = new L.Icon({
  iconUrl:
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%23ff0000&icon=hospital&apiKey=6efa22873bb84db2a192e37a4b6bd409",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const HospitalsNearby = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  

  const fetchPlaces = async () => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            const response = await axios.get(
              `https://api.geoapify.com/v2/places?categories=healthcare.hospital,healthcare&filter=circle:${longitude},${latitude},5000&limit=10&apiKey=6efa22873bb84db2a192e37a4b6bd409`
            );
            setPlaces(response.data.features);
            setLoading(false);
            setMapVisible(true);  
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        },
        (error) => {
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-max bg-slate-200 lg:p-16 border max-sm:p-6 md:p-8">
      <h1 className="text-center text-[3rem] max-sm:text-3xl font-bold text-[#263145] lg:mt-4">
        Nearby Hospitals & Doctors
      </h1>

      {!mapVisible && !location.latitude && !location.longitude && !loading && (
      <div className="rounded-lg h-96 w-full mt-8 flex items-center justify-center transiton-all ease-in-out duration-500">
        <div className="bg-[#1f2937] text-white p-8 max-sm:p-4 rounded-lg h-max w-max">
          <h1 className="font-bold text-2xl text-center py-4">Don't wait for AI to solve all the problems!</h1>
          <h2 className="text-gray-300 text-center pt-4 pb-2 ">No matter how accurate AI is, some problems always need professional assistance.</h2>
          <h2 className="text-gray-400 text-center pt-2 pb-4">Search for the nearest doctors and healthcare facilities near you.</h2>
          <div className="flex justify-center">
          <a onClick={fetchPlaces} className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium 
                text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Search
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>

          </div>
        </div>
      </div>
      )}

      {error && <p>Error: {error}</p>}
      {loading && 
      <div className="flex justify-center items-center h-96 transiton-all ease-in-out duration-500">
      <button disabled type="button" className="text-white bg-blue-700 h-max hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
Loading...
</button>
</div>
}

      {mapVisible && location.latitude && location.longitude && (
        <div className="flex max-sm:flex-col border justify-around mx-4 gap-16 lg:mt-8 transiton-all ease-in-out duration-500"
        style={{position: "relative",zIndex:1}}
        >
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: "500px"}}
            className="w-1/2 max-sm:w-full rounded-lg border border-spacing-1 border-[#2b374b]"
          >
            <TileLayer
              url="https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=6efa22873bb84db2a192e37a4b6bd409"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={[location.latitude, location.longitude]}>
              <Popup>You are here!</Popup>
            </Marker>

            {places.map((place) => (
              <Marker
                key={place.properties.place_id}
                position={[place.properties.lat, place.properties.lon]}
                icon={hospitalIcon}
              >
                <Popup>
                  <strong>{place.properties.name}</strong>
                  <p>{place.properties.formatted}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="flex flex-col text-white bg-[#2b374b] rounded-lg p-8 h-[500px] overflow-auto gap-4">
            {places.map((place) => (
              <div key={place.properties.place_id} className="bg-white rounded-lg text-[#2b374b] p-4">
                <strong>{place.properties.name}</strong>
                <p>{place.properties.formatted}</p>
              </div>
            ))}
          </div>
        </div>
      )}
        <h2 className="text-center text-sm font-mono mt-2 font-bold">*Don't forget to allow the location access from your browser to make it work!</h2>

    </div>
  );
};

export default HospitalsNearby;
