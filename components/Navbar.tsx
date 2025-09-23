import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Menu, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../app/context/AuthContext';
import LoadingAnime from '../components/LoadingAnime';

const { width } = Dimensions.get('window');

const BottomNavBar = () => {
    const { role, setRole } = useAuth()
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const translateX = useRef(new Animated.Value(-width)).current;
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [Loading, setLoading] = useState(false)

    const minSwipeDistance = 50;

    const onTouchStart = (e: any) => {
        setTouchEnd(null);
        setTouchStart(e.nativeEvent.pageX);
    };

    const onTouchMove = (e: any) => {
        setTouchEnd(e.nativeEvent.pageX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (sidebarOpen && isLeftSwipe) {
            toggleSidebar();
        }
    };

    const toggleSidebar = () => {
        const nextState = !sidebarOpen;
        setSidebarOpen(nextState);
        Animated.timing(translateX, {
            toValue: nextState ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const LogOutHandler = async () => {
        setLoading(true)
        try {
            await AsyncStorage.removeItem('access_token'); // clear token
            // setLogin(null); // reset login state
            router.replace('/Login'); // navigate to login screen
        } catch (error) {
            console.log("Error clearing async storage:", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='z-10 py-2 bg-gray-50'>
            <View className="flex-row items-center justify-between px-4 py-2">
                <TouchableOpacity className="p-2" onPress={toggleSidebar}>
                    <Menu color="black" size={24} />
                </TouchableOpacity>
                <View className='flex-1 flex-row justify-center items-center'>
                    <Text className="text-blue-500 text-3xl font-semibold">Yatra</Text>
                    <Image
                        source={require('../assets/images/btslogo.png')}
                        className="w-10 h-10"
                    />
                </View>
                <TouchableOpacity onPress={() => router.push('../Profile')}>
                    <Image
                        source={require('../assets/images/user.png')}
                        className="w-8 h-8 rounded-full border border-white"
                    />
                </TouchableOpacity>

                {sidebarOpen && (
                    <TouchableWithoutFeedback onPress={toggleSidebar}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                        }}
                        />
                    </TouchableWithoutFeedback>
                )}
                <Animated.View
                    style={{
                        transform: [{ translateX }],
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        zIndex: 10,
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <View className='h-screen px-10 py-5 bg-white'>
                        {/* Swipe indicator */}
                        <View className="absolute top-4 right-2 w-1 h-8 bg-gray-300 rounded-full opacity-50" />

                        <TouchableOpacity onPress={toggleSidebar} className="mb-4 self-end">
                            <X color="black" size={28} />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-black text-4xl font-bold">Menu</Text>
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={() => {
                                    router.push(`../${role === 'passenger' ? 'HomeScreen' : 'DriverHomeScreen'}`);
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/house.png')} className='w-7 h-7' />
                                    <Text className='text-3xl'>Home</Text>
                                </View>
                            </Text>
                            {role === 'passenger' && (
                                <View>
                                    <Text
                                        className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                        onPress={() => {
                                            router.push('../Trips');
                                            toggleSidebar();
                                        }}
                                    >
                                        <View className='flex-1 flex-row gap-2'>
                                            <Image source={require('../assets/images/map.png')} className='w-7 h-7' />
                                            <Text className='text-3xl'>My Trips</Text>
                                        </View>
                                    </Text>
                                    <Text
                                        className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                        onPress={() => {
                                            router.push('../MyFvt');
                                            toggleSidebar();
                                        }}
                                    >
                                        <View className='flex-1 flex-row gap-2'>
                                            <Image source={require('../assets/images/favourite.png')} className='w-7 h-7' />
                                            <Text className='text-3xl'>My fvt</Text>
                                        </View>
                                    </Text>
                                </View>
                            )}
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={() => {
                                    router.push('../Notification')
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/bell.png')} className='w-7 h-7' />
                                    <Text className='text-2xl'>Notification</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={() => {
                                    router.push('../Feedback');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/chat.png')} className='w-8 h-8' />
                                    <Text className='text-2xl'>Feedback</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={() => {
                                    router.push('../TermsConditions');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/conditions.png')} className='w-8 h-8' />
                                    <Text className='text-2xl'>Terms & Conditions</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={() => {
                                    router.push('../AboutUs');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/info.png')} className='w-8 h-8' />
                                    <Text className='text-2xl'>About us</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10 border-b border-gray-300 px-3 py-5"
                                onPress={LogOutHandler}>
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/logout.png')} className='w-8 h-8' />
                                    <Text className='text-2xl'>Log Out</Text>
                                </View>
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
            {Loading && (
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

export default BottomNavBar;