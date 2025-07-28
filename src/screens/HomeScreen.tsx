// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     Platform,
// } from 'react-native';
// import { useSelector } from 'react-redux';
// import LinearGradient from 'react-native-linear-gradient'; // Changed import!
//
// // --- Re-using the provided flightData ---
// const flightData = [
//     {
//         id: 'f1',
//         date: '1 March 2025',
//         from: 'London',
//         to: 'Paris',
//         airline: 'EasyJet',
//         flightNumber: 'LH 1698',
//         class: 'Economy',
//         aircraft: 'Airbus A320',
//         duration: '1h 15m',
//         impression: 4,
//         note: 'Smooth flight, landed earlier than expected.',
//         pics: [],
//         isNightFlight: false,
//         isAlarming: false,
//     },
//     {
//         id: 'f2',
//         date: '21 December 2024',
//         from: 'Berlin',
//         to: 'London',
//         airline: 'WizzAir',
//         flightNumber: 'IR 6769',
//         class: 'Economy',
//         aircraft: 'Airbus A321',
//         duration: '2h',
//         impression: 2,
//         note: 'Very noisy, and there was turbulence.',
//         pics: [],
//         isNightFlight: true,
//         isAlarming: true,
//     },
//     {
//         id: 'f3',
//         date: '1 November 2024',
//         from: 'Paris',
//         to: 'Berlin',
//         airline: 'RyanAir',
//         flightNumber: 'PT 490',
//         class: 'Economy',
//         aircraft: 'Boeing 737',
//         duration: '1h 45m',
//         impression: 3,
//         note: 'Standard experience. Seats a bit cramped.',
//         pics: [],
//         isNightFlight: false,
//         isAlarming: false,
//     },
//     {
//         id: 'f4',
//         date: '22 September 2024',
//         from: 'Berlin',
//         to: 'Paris',
//         airline: 'EasyJet',
//         flightNumber: 'LH 1254',
//         class: 'Economy',
//         aircraft: 'Airbus A321',
//         duration: '2h',
//         impression: 3,
//         note: 'It was a night flight, but I could not sleep properly.',
//         pics: [],
//         isNightFlight: true,
//         isAlarming: false,
//     },
//     {
//         id: 'f5',
//         date: '10 August 2024',
//         from: 'Rome',
//         to: 'Madrid',
//         airline: 'Vueling',
//         flightNumber: 'VU 3421',
//         class: 'Business',
//         aircraft: 'Airbus A320neo',
//         duration: '2h 30m',
//         impression: 5,
//         note: 'Very comfortable seats and good service.',
//         pics: [],
//         isNightFlight: false,
//         isAlarming: false,
//     },
//     {
//         id: 'f6',
//         date: '3 July 2024',
//         from: 'Amsterdam',
//         to: 'Copenhagen',
//         airline: 'KLM',
//         flightNumber: 'KL 1937',
//         class: 'Economy',
//         aircraft: 'Embraer 190',
//         duration: '1h 25m',
//         impression: 4,
//         note: 'Friendly staff and smooth landing.',
//         pics: [],
//         isNightFlight: false,
//         isAlarming: false,
//     },
// ];
//
// // Reusable FlightCard component
// const FlightCard = ({ item, navigation }) => (
//     <TouchableOpacity
//         style={styles.flightCardContainer}
//         onPress={() => navigation.navigate('FlightDetailsScreen', { flight: item })}
//     >
//         <LinearGradient
//             colors={['#4a00e0', '#8e2de2']} // Deep violet to electric violet gradient
//             start={{ x: 0, y: 0 }} // Changed to object for react-native-linear-gradient
//             end={{ x: 1, y: 1 }}   // Changed to object for react-native-linear-gradient
//             style={styles.flightCardGradient}
//         >
//             <Text style={styles.flightDate}>{item.date}</Text>
//             <View style={styles.flightDetails}>
//                 <Text style={styles.flightRoute}>
//                     {item.route || `${item.from} — ${item.to}`}
//                 </Text>
//                 <Image
//                     source={require('../assets/img/aeroplane-plane1.png')} // Ensure this path is correct
//                     style={styles.planeIcon}
//                 />
//             </View>
//
//             <View style={styles.airlineDetails}>
//                 <Text style={styles.flightAirline}>{item.airline}</Text>
//                 <Text style={styles.flightNumber}>{item.flightNumber}</Text>
//             </View>
//         </LinearGradient>
//     </TouchableOpacity>
// );
//
// const FlightLog = ({ navigation }) => {
//     const reduxFlights = useSelector((state) => state.flights.flights);
//
//     return (
//         <ImageBackground
//             source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
//             style={styles.background}
//         >
//             <View style={styles.overlay}>
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <Text style={styles.headerTime}>9:41</Text>
//                 </View>
//
//                 <Text style={styles.title}>Flight Log</Text>
//
//                 <ScrollView contentContainerStyle={styles.flightList}>
//                     {/* Predefined flights */}
//                     {flightData.map((item) => (
//                         <FlightCard key={item.id} item={item} navigation={navigation} />
//                     ))}
//
//                     {/* Custom flights from Redux */}
//                     {reduxFlights.map((item) => (
//                         <FlightCard key={item.id} item={item} navigation={navigation} />
//                     ))}
//                 </ScrollView>
//
//                 {/* Add Button */}
//                 <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => navigation.navigate('NewFlightScreen')}
//                 >
//                     <Text style={styles.addButtonText}>+ Add Flight</Text>
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// };
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         resizeMode: 'cover',
//         backgroundColor: '#1a1a2e',
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         paddingTop: Platform.OS === 'android' ? 50 : 40,
//         paddingHorizontal: 20,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         marginBottom: 20,
//         paddingHorizontal: 5,
//     },
//     headerTime: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     title: {
//         fontSize: 34,
//
//         fontWeight: 'bold',
//         color: '#e0b0ff',
//         textAlign: 'center',
//         marginBottom: 30,
//         fontStyle: 'italic',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//         letterSpacing: 1.5,
//     },
//     flightList: {
//         flexGrow: 1,
//         paddingVertical: 10,
//         paddingBottom: 20,
//     },
//     flightCardContainer: {
//         borderRadius: 15,
//         marginBottom: 15,
//
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 6,
//             },
//             android: {
//                 elevation: 8,
//             },
//         }),
//     },
//     flightCardGradient: {
//         borderRadius: 15,
//         // padding: 18,
//
//         flex: 1, // Important for LinearGradient to fill its parent
//     },
//     flightDate: {
//         color: '#c0c0c0',
//         fontSize: 13,
//         marginTop: 10,
//         marginBottom: 8,
//         marginLeft: 10,
//         fontWeight: '500',
//     },
//     flightDetails: {
//         marginLeft: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     flightRoute: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: '700',
//         flexShrink: 1,
//         marginRight: 10,
//     },
//     airlineDetails: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginLeft: 10,
//         marginBottom: 10,
//         alignItems: 'flex-end',
//         marginTop: 10,
//     },
//     flightAirline: {
//         color: '#e0e0e0',
//         fontSize: 15,
//
//         fontWeight: '600',
//     },
//     flightNumber: {
//         color: '#fff',
//         fontSize: 17,
//         fontWeight: 'bold',        marginRight: 10,
//         letterSpacing: 0.5,
//     },
//     addButton: {
//         backgroundColor: '#ff3366',
//         borderRadius: 30,
//         paddingVertical: 18,
//         alignItems: 'center',
//         marginTop: 25,
//         marginBottom: 20,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#ff3366',
//                 shadowOffset: { width: 0, height: 5 },
//                 shadowOpacity: 0.4,
//                 shadowRadius: 10,
//             },
//             android: {
//                 elevation: 12,
//             },
//         }),
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 19,
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         letterSpacing: 1,
//     },
//     planeIcon: {
//         width: 45,
//         height: 45,
//         tintColor: '#e0b0ff',
//     },
// });
//
// export default FlightLog;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform,
    SafeAreaView, // Added SafeAreaView for proper layout
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the plane icon, if using MaterialIcons

// --- Re-using the provided flightData ---
const flightData = [
    {
        id: 'f1',
        date: '1 March 2025',
        from: 'London',
        to: 'Paris',
        airline: 'EasyJet',
        flightNumber: 'LH 1698',
        class: 'Economy',
        aircraft: 'Airbus A320',
        duration: '1h 15m',
        impression: 4,
        note: 'Smooth flight, landed earlier than expected.',
        pics: [],
        isNightFlight: false,
        isAlarming: false,
    },
    {
        id: 'f2',
        date: '21 December 2024',
        from: 'Berlin',
        to: 'London',
        airline: 'WizzAir',
        flightNumber: 'IR 6769',
        class: 'Economy',
        aircraft: 'Airbus A321',
        duration: '2h',
        impression: 2,
        note: 'Very noisy, and there was turbulence.',
        pics: [],
        isNightFlight: true,
        isAlarming: true,
    },
    {
        id: 'f3',
        date: '1 November 2024',
        from: 'Paris',
        to: 'Berlin',
        airline: 'RyanAir',
        flightNumber: 'PT 490',
        class: 'Economy',
        aircraft: 'Boeing 737',
        duration: '1h 45m',
        impression: 3,
        note: 'Standard experience. Seats a bit cramped.',
        pics: [],
        isNightFlight: false,
        isAlarming: false,
    },
    {
        id: 'f4',
        date: '22 September 2024',
        from: 'Berlin',
        to: 'Paris',
        airline: 'EasyJet',
        flightNumber: 'LH 1254',
        class: 'Economy',
        aircraft: 'Airbus A321',
        duration: '2h',
        impression: 3,
        note: 'It was a night flight, but I could not sleep properly.',
        pics: [],
        isNightFlight: true,
        isAlarming: false,
    },
    {
        id: 'f5',
        date: '10 August 2024',
        from: 'Rome',
        to: 'Madrid',
        airline: 'Vueling',
        flightNumber: 'VU 3421',
        class: 'Business',
        aircraft: 'Airbus A320neo',
        duration: '2h 30m',
        impression: 5,
        note: 'Very comfortable seats and good service.',
        pics: [],
        isNightFlight: false,
        isAlarming: false,
    },
    {
        id: 'f6',
        date: '3 July 2024',
        from: 'Amsterdam',
        to: 'Copenhagen',
        airline: 'KLM',
        flightNumber: 'KL 1937',
        class: 'Economy',
        aircraft: 'Embraer 190',
        duration: '1h 25m',
        impression: 4,
        note: 'Friendly staff and smooth landing.',
        pics: [],
        isNightFlight: false,
        isAlarming: false,
    },
];

// Reusable FlightCard component
const FlightCard = ({ item, navigation }) => (
    <TouchableOpacity
        style={styles.flightCardContainer}
        onPress={() => navigation.navigate('FlightDetailsScreen', { flight: item })}
    >
        {/* Replacing LinearGradient with our standard transparent card style */}
        <View style={styles.flightCardContent}>
            <Text style={styles.flightDate}>{item.date}</Text>
            <View style={styles.flightDetails}>
                <Text style={styles.flightRoute}>
                    {item.from} — {item.to}
                </Text>
                {/* Using a MaterialIcons plane icon for consistency */}
                <Image
                    source={require('../assets/img/aeroplane-plane1.png')} // Ensure this path is correct
                    style={styles.planeIcon}
                />
            </View>

            <View style={styles.airlineDetails}>
                <Text style={styles.flightAirline}>{item.airline}</Text>
                <Text style={styles.flightNumber}>{item.flightNumber}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const FlightLog = ({ navigation }) => {
    const reduxFlights = useSelector((state) => state.flights.flights || []); // Ensure it's an array

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                style={styles.background}
            >
                <View style={styles.overlay}>
                    {/* Header with time aligned top-right */}
                    <View style={styles.header}>
                        <Text style={styles.headerTime}>
                            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </Text>
                    </View>

                    <Text style={styles.title}>Flight Log</Text>

                    <ScrollView contentContainerStyle={styles.flightList}>
                        {/* Predefined flights */}
                        {flightData.map((item) => (
                            <FlightCard key={item.id} item={item} navigation={navigation} />
                        ))}

                        {/* Custom flights from Redux */}
                        {reduxFlights.map((item) => (
                            <FlightCard key={item.id} item={item} navigation={navigation} />
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('NewFlightScreen')}
                    >
                        <Text style={styles.addButtonText}>+ Add Flight</Text>
                    </TouchableOpacity>
                    <View style={{marginBottom: 50}}/>
                </View>
            </ImageBackground>
            {/*<View style={{marginBottom: 50}}/>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,

        backgroundColor: '#1a1a2e', // Dark purple-blue background
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#1a1a2e',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly more opaque overlay
        paddingTop: Platform.OS === 'android' ? 0 : 0, // SafeAreaView handles this
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0, // Explicit top padding for Android status bar
        paddingHorizontal: 5,
    },
    headerTime: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white for title
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    flightList: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingBottom: 20,
    },
    flightCardContainer: {
        // Shadow handled by content view for better appearance
        marginBottom: 15,
    },
    flightCardContent: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // More rounded corners
        padding: 18, // Consistent padding
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)', // Subtle pink border
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    flightDate: {
        color: '#c0c0c0', // Light gray for date
        fontSize: 14, // Slightly smaller
        marginBottom: 10,
        fontWeight: '500',
        alignSelf: 'flex-end', // Align date to the right
    },
    flightDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10,
    },
    flightRoute: {
        color: '#fff', // White for route
        fontSize: 22, // Larger for prominence
        fontWeight: '700',
        flexShrink: 1,
        marginRight: 10,
    },
    planeIcon: {
        width: 40, // Consistent size
        height: 40,
        tintColor: '#e0b0ff', // Purple-pink tint
    },
    airlineDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align vertically
        marginTop: 10,
    },
    flightAirline: {
        color: '#f0e6fa', // Light lavender for airline
        fontSize: 16,
        fontWeight: '600',
    },
    flightNumber: {
        color: '#fff', // White for flight number
        fontSize: 18, // Slightly larger
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    addButton: {
        backgroundColor: '#ff3366', // Vibrant red/pink
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#ff3366',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    addButtonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default FlightLog;
