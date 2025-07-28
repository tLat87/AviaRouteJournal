import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    Platform,
    ImageSourcePropType,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    AirportInfo: { airport: Airport } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AirportInfo'>;

type Airport = {
    id: string;
    city: string;
    airportCode: string;
    country: string;
    coordinates: string;
    backgroundImg: ImageSourcePropType;
    notes?: string;
    flightStatus?: 'Departed' | 'Arrived' | 'In transit' | null;
};

const AirportInfoScreen: React.FC<Props> = ({ navigation, route }) => {
    const airport: Airport = route?.params?.airport || {
        id: '1',
        city: 'Lisbon',
        airportCode: 'LIS',
        country: 'Portugal',
        coordinates: "38°34'06.1\"N 9°07'22.0\"W",
        backgroundImg: require('../assets/img/air/914a37ccc482b638f88aee55667cc8994d2daf1c.png'),
        notes: 'Beautiful airport with easy access to the city center. Modern facilities and good signage. Can get busy during peak hours, but overall a pleasant experience. Enjoyed the modern architecture and efficient check-in process. Plenty of shops and dining options available.',
        flightStatus: 'Departed',
    };

    const notes: string = airport.notes || 'No detailed notes available for this airport at this time.';
    const flightStatus: string | null = airport.flightStatus || null;

    const handleGoBack = (): void => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ImageBackground
                    source={airport.backgroundImg}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Airport Info</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>
                    <View style={styles.airportTitleContainer}>
                        <Text style={styles.airportBigName}>{airport.city}</Text>
                        <Text style={styles.airportBigCode}>{airport.airportCode}</Text>
                        <Text style={styles.airportBigLocation}>{airport.country}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.infoPanel}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Airport Details</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>🏙️</Text>
                            <Text style={styles.detailText}>{airport.city}, {airport.country}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>📍</Text>
                            <Text style={styles.detailText}>{airport.coordinates}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Notes</Text>
                        <View style={styles.notesContainer}>
                            <Text style={styles.notesText}>{notes}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Current Status</Text>
                        <View style={styles.statusButtonsContainer}>
                            {['Departed', 'Arrived', 'In transit'].map((status) => (
                                <View
                                    key={status}
                                    style={[
                                        styles.statusButton,
                                        flightStatus === status && styles.statusButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusButtonText,
                                            flightStatus === status && styles.statusButtonTextActive,
                                        ]}
                                    >
                                        {status}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Dark purple-blue background
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#1a1a2e', // Consistent background color
    },
    backgroundImage: {
        width: '100%',
        height: 320, // Slightly taller for more visual impact
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 0 : 0, // Handled by SafeAreaView already
    },
    headerContainer: {
        backgroundColor: 'rgba(26, 26, 46, 0.45)', // Darker transparent overlay for header
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: Platform.OS === 'android' ? 40 : 0, // Add top padding for Android status bar
    },
    backButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-start',
    },
    backButtonText: {
        color: '#ffe0f0', // Soft pinkish-white
        fontSize: 28,
        fontWeight: '300', // Lighter weight for elegance
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    headerPlaceholder: {
        width: 40, // To balance the back button
    },
    airportTitleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 25, // More vertical padding
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 105, 180, 0.1)', // Very subtle transparent pink for the title section
        // No explicit border radius here, handled by infoPanel overlapping
    },
    airportBigName: {
        fontSize: 42, // Even larger for prominence
        fontWeight: '900', // Extra bold
        color: '#fff', // Pure white
        textShadowColor: 'rgba(0, 0, 0, 0.7)', // Stronger shadow
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 8, // More space
    },
    airportBigCode: {
        fontSize: 32, // Larger
        fontWeight: 'bold',
        color: '#E0FFFF', // Light cyan
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 4,
        marginBottom: 8,
    },
    airportBigLocation: {
        fontSize: 22, // Larger
        color: '#ffe0f0', // Soft pinkish-white
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    infoPanel: {
        backgroundColor: '#1a1a2e', // Dark purple-blue to match safeArea and background base
        borderTopLeftRadius: 30, // Large rounded corners
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -40, // Overlap more for a seamless transition
        flex: 1,
        // Stronger shadow to make it appear lifted
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 15,
    },
    card: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
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
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white for card titles
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator line
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10,
        textAlign: 'center', // Center card titles
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailIcon: {
        fontSize: 22, // Size for emoji/text icons
        marginRight: 10,
        color: '#ffc0cb', // Soft pink for icons
    },
    detailText: {
        fontSize: 16,
        color: '#fff', // White for detail text
    },
    notesContainer: {
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Deeper transparent pink
        borderRadius: 15,
        padding: 15,
        minHeight: 120,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)',
    },
    notesText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#fff', // White text for notes
        textAlign: 'justify',
    },
    statusButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 192, 203, 0.1)', // Very light transparent pink for the container
        borderRadius: 30,
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)', // Pink border
    },
    statusButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 3,
        // Transition properties are commented out as they are CSS properties, not directly supported in RN StyleSheet
        // transitionProperty: 'background-color',
        // transitionDuration: '0.3s',
    },
    statusButtonActive: {
        backgroundColor: '#ff69b4', // Hot pink for active status
    },
    statusButtonText: {
        color: '#ff69b4', // Hot pink for inactive text
        fontWeight: 'bold',
        fontSize: 16,
    },
    statusButtonTextActive: {
        color: 'white', // White for active text
    },
});

export default AirportInfoScreen;
