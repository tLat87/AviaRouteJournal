import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    ImageBackground,
    Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// Removed: import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // No more vector icons

// --- AirportCard Component ---
const AirportCard = ({ airportCode, country, city, onPress }) => (
    <TouchableOpacity style={styles.airportCard} onPress={onPress}>
        <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>{city} {airportCode}</Text>
            <Text style={styles.airportCountry}>{country}</Text>
        </View>
        {/* Using a static image for the plane icon */}
        <Image source={require('../assets/img/aeroplane-plane1.png')} style={styles.planeImageOnCard} />
    </TouchableOpacity>
);

// --- AirportsMapScreen Component ---
const AirportsMapScreen = ({ airports, airportCoordinates }) => {
    // Update initialRegion to cover all airports if possible
    const validCoordinates = airports
        .map(a => airportCoordinates[a.airportCode])
        .filter(Boolean);

    let initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100,
    };

    if (validCoordinates.length > 0) {
        let minLat = Infinity, maxLat = -Infinity;
        let minLon = Infinity, maxLon = -Infinity;

        validCoordinates.forEach(coord => {
            minLat = Math.min(minLat, coord.latitude);
            maxLat = Math.max(maxLat, coord.latitude);
            minLon = Math.min(minLon, coord.longitude);
            maxLon = Math.max(maxLon, coord.longitude);
        });

        const latBuffer = (maxLat - minLat) * 0.2; // Add 20% buffer
        const lonBuffer = (maxLon - minLon) * 0.2;

        initialRegion = {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta: Math.max(0.01, (maxLat - minLat) + latBuffer), // Ensure minimum delta
            longitudeDelta: Math.max(0.01, (maxLon - minLon) + lonBuffer), // Ensure minimum delta
        };
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={initialRegion}
            // provider={PROVIDER_GOOGLE} // Optional: 'google' for Google Maps on Android if API Key is configured
        >
            {airports.map((airport) => {
                const coords = airportCoordinates[airport.airportCode];
                if (!coords) return null; // Skip airports without coordinates

                return (
                    <Marker
                        key={airport.id}
                        coordinate={{ latitude: coords.latitude, longitude: coords.longitude }}
                        title={`${airport.city} ${airport.airportCode}`}
                        description={`${airport.country}`}
                    >
                        <View style={styles.mapMarker}>
                            {/* Using text emoji for plane icon on map markers */}
                            <Text style={styles.mapMarkerIcon}>✈</Text>
                            <Text style={styles.mapMarkerText}>{airport.airportCode}</Text>
                        </View>
                    </Marker>
                );
            })}
        </MapView>
    );
};


const WorldAirScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('By Country'); // 'By Country', 'Map'

    // Enlarged list of airports with additional fields
    const airports = [
        { id: '1', city: 'Lisbon', airportCode: 'LIS', country: 'Portugal', coordinates: "38°45'06\"N 9°07'22\"W", backgroundImg: require('../assets/img/air/914a37ccc482b638f88aee55667cc8994d2daf1c.png'), notes: 'Major international hub, very busy. Modern, good for connections.', flightStatus: 'Departed' },
        { id: '2', city: 'London', airportCode: 'LHR', country: 'United Kingdom', coordinates: "51°28'39\"N 0°27'41\"W", backgroundImg: require('../assets/img/lis/Pic.png'), notes: 'One of the busiest airports globally. Multiple terminals, excellent shopping.', flightStatus: 'Arrived' },
        { id: '3', city: 'Los Angeles', airportCode: 'LAX', country: 'United States', coordinates: "33°56'33\"N 118°24'29\"W", backgroundImg: require('../assets/img/lis/Pic-2.png'), notes: 'Large, spread-out airport. Famous for its Theme Building. Often crowded.', flightStatus: 'In transit' },
        { id: '4', city: 'Montreal', airportCode: 'YUL', country: 'Canada', coordinates: "45°28'14\"N 73°44'28\"W", backgroundImg: require('../assets/img/lis/Pic-1.png'), notes: 'Well-organized and easy to navigate. Good public transport links.', flightStatus: 'Departed' },
        { id: '5', city: 'Paris', airportCode: 'ORY', country: 'France', coordinates: "48°43'27\"N 2°22'47\"E", backgroundImg: require('../assets/img/lis/Pic-4.png'), notes: 'Closer to Paris city center than CDG. Primarily serves domestic and European flights.', flightStatus: 'Departed' },
        { id: '6', city: 'Berlin', airportCode: 'BER', country: 'Germany', coordinates: "52°29'08\"N 13°30'03\"E", backgroundImg: require('../assets/img/lis/Pic-3.png'), notes: 'Brand new, modern and efficient. Still expanding its routes.', flightStatus: 'Departed' },
        { id: '7', city: 'Miami', airportCode: 'MIA', country: 'USA', coordinates: "25°47'54\"N 80°16'32\"W", backgroundImg: require('../assets/img/lis/Pic-5.png'), notes: 'Gateway to Latin America. Very lively, can be chaotic.', flightStatus: 'Arrived' },
    ];

    // Example coordinates for some airports.
    // In a real application, you would need to get them from an API or database.
    const airportCoordinates = {
        'LIS': { latitude: 38.775594, longitude: -9.135366, name: 'Lisbon' },
        'LHR': { latitude: 51.470020, longitude: -0.454295, name: 'London Heathrow' },
        'LAX': { latitude: 33.941589, longitude: -118.408530, name: 'Los Angeles' },
        'YUL': { latitude: 45.4706, longitude: -73.7436, name: 'Montréal' },
        'ORY': { latitude: 48.72622, longitude: 2.36528, name: 'Paris Orly' },
        'BER': { latitude: 52.3683, longitude: 13.5009, name: 'Berlin Brandenburg' },
        'MIA': { latitude: 25.795865, longitude: -80.287046, name: 'Miami' },
        'DXB': { latitude: 25.253174, longitude: 55.365673, name: 'Dubai Intl' },
        'HND': { latitude: 35.549397, longitude: 139.779836, name: 'Tokyo Haneda' },
        'SYD': { latitude: -33.939924, longitude: 151.175276, name: 'Sydney Intl' },
        'FRA': { latitude: 50.037912, longitude: 8.562153, name: 'Frankfurt Intl' },
        'SIN': { latitude: 1.364420, longitude: 103.991539, name: 'Singapore Changi' },
    };

    const handleAirportPress = (airportId) => {
        // Find the full airport object by its ID
        const selectedAirport = airports.find(airport => airport.id === airportId);
        if (selectedAirport) {
            // Pass the entire airport object as a parameter
            navigation.navigate('AirportInfoScreen', { airport: selectedAirport });
        } else {
            console.warn(`Airport with ID ${airportId} not found.`);
        }
    };

    const handleAddAirport = () => {
        console.log('Add Airport button pressed!');
        // navigation.navigate('AddAirportScreen'); // Example: navigate to add airport screen
    };

    return (
        <ImageBackground source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} style={styles.fullBackground}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Header with Title */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>World Airports</Text>
                    </View>

                    {/* Navigation/Filter Buttons */}
                    <View style={styles.navButtonsContainer}>
                        <TouchableOpacity
                            style={activeTab === 'By Country' ? styles.navButtonActive : styles.navButton}
                            onPress={() => setActiveTab('By Country')}
                        >
                            <Text style={activeTab === 'By Country' ? styles.navButtonTextActive : styles.navButtonText}>By Country</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={activeTab === 'Map' ? styles.navButtonActive : styles.navButton}
                            onPress={() => setActiveTab('Map')}
                        >
                            <Text style={activeTab === 'Map' ? styles.navButtonTextActive : styles.navButtonText}>Map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Conditional Rendering based on activeTab */}
                    {activeTab === 'Map' ? (
                        <AirportsMapScreen airports={airports} airportCoordinates={airportCoordinates} />
                    ) : (
                        <ScrollView style={styles.scrollViewContent}>
                            {airports.map((airport) => (
                                <AirportCard
                                    key={airport.id}
                                    airportCode={airport.airportCode}
                                    country={airport.country}
                                    city={airport.city}
                                    onPress={() => handleAirportPress(airport.id)}
                                />
                            ))}
                        </ScrollView>
                    )}

                    {/* Add Airport Button (Optional, re-enable if needed) */}
                    {/* <TouchableOpacity style={styles.addAirportButton} onPress={handleAddAirport}>
                        <Text style={styles.plusIconText}>+</Text>
                        <Text style={styles.addAirportButtonText}>Add Airport</Text>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
            <View style={{marginBottom: 50}}/>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#1a1a2e', // Dark purple-blue background
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(26,26,46,0.6)', // Semi-transparent overlay for content (darker than background for contrast)
    },
    container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: Platform.OS === 'android' ? 0 : 0, // Adjusted padding for Android status bar
        // Removed specific background here, handled by safeArea
        // borderBottomLeftRadius: 30, // Removed for cleaner full screen map/list
        // borderBottomRightRadius: 30,
        overflow: 'hidden', // Ensure content within stays inside rounded corners if applied
    },
    header: {
        backgroundColor: 'rgba(255, 105, 180, 0.45)', // Semi-transparent hot pink for header
        paddingVertical: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 15, // Padding for status bar
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        marginBottom: 20, // Space below header
        marginHorizontal: 10, // Small horizontal margin for header to match nav buttons
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
    headerText: {
        fontSize: 28, // Consistent header title size
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    navButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Transparent pink for tab background
        borderRadius: 25,
        padding: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ff69b4', // Hot pink border
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    navButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    navButtonActive: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#ff69b4', // Hot pink when active
        alignItems: 'center',
    },
    navButtonText: {
        color: '#ffe0f0', // Soft pinkish-white for inactive
        fontWeight: 'bold',
        fontSize: 16,
    },
    navButtonTextActive: {
        color: '#fff', // White for active
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollViewContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    airportCard: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // Increased border radius for cards
        padding: 20, // Increased padding
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    airportInfo: {
        flex: 1,
    },
    airportCode: {
        fontSize: 22, // Larger font size
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white text for better contrast
        marginBottom: 5,
    },
    airportCountry: {
        fontSize: 18, // Larger font size
        color: '#f0e6fa', // Light lavender color for country
    },
    planeImageOnCard: { // New style for the plane image on cards
        width: 40,
        height: 40,
        tintColor: '#ffc0cb', // Light pink tint for the plane image
        marginLeft: 15,
        opacity: 0.8,
    },
    addAirportButton: {
        backgroundColor: '#ff3366', // Vibrant red/pink
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 30,
        marginHorizontal: 20,
        marginTop: 20,
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
    plusIconText: { // Style for the "+" text icon
        fontSize: 24,
        color: 'white',
        marginRight: 10,
        fontWeight: 'bold',
    },
    addAirportButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    // --- Styles for the map ---
    map: {
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 20, // Consistent border radius with cards
        overflow: 'hidden',
        borderWidth: 2, // Add a border for definition
        borderColor: '#ff69b4', // Hot pink border
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    mapMarker: {
        backgroundColor: 'rgba(255, 192, 203, 0.9)', // Pink with less transparency
        borderRadius: 25, // More rounded for marker
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ff69b4', // Hot pink border for marker
        borderWidth: 2,
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    mapMarkerIcon: { // Style for the text emoji plane icon
        fontSize: 18,
        color: '#8e2de2', // Darker purple for the icon
        marginRight: 5,
    },
    mapMarkerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#300030', // Very dark purple/black for text on marker
    },
});

export default WorldAirScreen;
