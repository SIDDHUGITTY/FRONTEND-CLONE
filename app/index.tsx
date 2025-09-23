import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
// import 'nativewind/types';
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [login, setLogin] = useState(null)

  type MyJwtPayload = {
    role: any;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken) {
        const decoded = jwtDecode<MyJwtPayload>(storedToken);
        setLogin(decoded.role)
        console.log("Decoded JWT:", decoded);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (login == 'ADMIN') {
        router.replace('/HomeScreen')
      } else if (login == 'DRIVER') {
        router.replace('/DriverHomeScreen')
      } else {
        router.replace('/Login');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [login, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}>
      <View className="flex-1 flex-col justify-center items-center">
        <View className="flex flex-row items-center">
          <Text className="text-3xl font-bold text-gray-100">Yatra</Text>
          <Image source={require('../assets/images/btslogo.png')} className="w-10 h-10" />
        </View>
        <View>
          <Text className="text-base text-gray-400 text-center mb-5">Quick Track. Smart Travel.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
