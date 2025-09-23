import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EmergencyCard from '../../components/EmergenceCart';
import LoadingAnime from '../../components/LoadingAnime';

const ReportAccidentForm = () => {
  const [reporterName, setReporterName] = useState('');
  const [accidentDetails, setAccidentDetails] = useState('');
  const [userNumber, setUserNumber] = useState('')
  const [busNumber, setBusNumber] = useState('')
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(`https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`);
      setLatitude(loc.coords.latitude.toString())
      setLongitude(loc.coords.longitude.toString())
    })();
  }, []);

  const handleSubmit = async () => {
    if (!reporterName || !accidentDetails) {
      Alert.alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://10.73.213.97:3000/reportaccident/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: reporterName,
          latitude: latitude,
          longitude: longitude,
          bus_number: busNumber,
          phone: userNumber,
          description: accidentDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("✅ Success", "Accident reported successfully!");
        console.log("Success:", data);
      } else {
        Alert.alert("❌ Failed", data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("⚠️ Error", "Unable to connect to server!");
    } finally {
      setLoading(false);
    }
    setReporterName('');
    setAccidentDetails('');
    setUserNumber('')
    setBusNumber('')
  };

  return (
    <View className="flex-1 justify-center py-5 px-5">
      <EmergencyCard />
      <View className="flex-1 px-5 py-8">
        <Text className="text-2xl font-bold text-gray-800 mt-10 mb-6">Report an Accident</Text>

        <TextInput
          placeholder="Your Name"
          value={reporterName}
          onChangeText={setReporterName}
          className="border border-gray-300 rounded-md p-3 mb-4"
        />
        <TextInput
          placeholder="Your Number"
          value={userNumber}
          onChangeText={setUserNumber}
          className="border border-gray-300 rounded-md p-3 mb-4"
        />
        <TextInput
          placeholder="Bus Number"
          value={busNumber}
          onChangeText={setBusNumber}
          className="border border-gray-300 rounded-md p-3 mb-4"
        />

        <TextInput
          placeholder="Provide Accident details"
          value={accidentDetails}
          onChangeText={setAccidentDetails}
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-md p-3 mb-4 h-24"
        />

        <TouchableOpacity
          className="bg-red-600 rounded-md py-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Submit Report</Text>
        </TouchableOpacity>

        {location && (
          <Text className="text-xs text-gray-500 mt-4">
            📍 Location: {location}
          </Text>
        )}
      </View>
      {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingAnime />
          </View>
        )}
    </View>
  );
};

export default ReportAccidentForm;
