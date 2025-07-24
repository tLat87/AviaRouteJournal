import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform, // Import Platform for shadows
} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle'; // Assuming this library is installed

const FlightDetailsScreen = ({ navigation, route }) => {
    const { flight } = route.params;

    if (!flight) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No flight data provided.</Text>
            </View>
        );
    }

    const [isNightFlight, setIsNightFlight] = useState(flight.isNightFlight);
    const [isAlarming, setIsAlarming] = useState(flight.isAlarming);
    const [isFavorite, setIsFavorite] = useState(flight.isFavorite); // Assuming this prop exists
    const [starRating, setStarRating] = useState(flight.impression);

    const renderStar = (index) => (
        <TouchableOpacity key={index} onPress={() => setStarRating(index + 1)}>
            <Text style={[styles.starIcon, { color: index < starRating ? '#FFD700' : '#d8bfd8' }]}>★</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Flight Details</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {/* Flight Info Card */}
                    <View style={styles.card}>
                        {[
                            ['Date', flight.date],
                            ['From', flight.from],
                            ['To', flight.to],
                            ['Airline', flight.airline],
                            ['Flight Number', flight.flightNumber],
                            ['Class', flight.class],
                            ['Aircraft', flight.aircraft],
                            ['Duration', flight.duration],
                        ].map(([label, value], index) => (
                            <View key={index} style={styles.detailRow}>
                                <Text style={styles.detailLabel}>{label}:</Text>
                                <Text style={styles.detailValue}>{value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Impression & Notes Card */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Impression</Text>
                        <View style={styles.starsContainer}>
                            {[...Array(5)].map((_, i) => renderStar(i))}
                        </View>

                        {flight.pics && flight.pics.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Pics</Text>
                                <ScrollView horizontal contentContainerStyle={styles.picsContainer}>
                                    {flight.pics.map((pic, index) => (
                                        <Image key={index} source={pic} style={styles.thumbnail} />
                                    ))}
                                </ScrollView>
                            </>
                        )}


                        <Text style={styles.sectionTitle}>Note</Text>
                        <View style={styles.noteContainer}>
                            <Text style={styles.noteText}>
                                {flight.note || 'No note available for this flight.'}
                            </Text>
                        </View>
                    </View>

                    {/* Toggles Card */}
                    <View style={styles.card}>
                        {[
                            ['Night Flight', isNightFlight, setIsNightFlight],
                            ['Alarming', isAlarming, setIsAlarming],
                            ['Favorite Flight', isFavorite, setIsFavorite],
                        ].map(([label, value, setter], i) => (
                            <View key={i} style={styles.toggleRow}>
                                <Text style={styles.toggleLabel}>{label}</Text>
                                <SwitchToggle
                                    switchOn={value}
                                    onPress={() => setter(!value)}
                                    circleColorOff="#fff"
                                    circleColorOn="#fff"
                                    backgroundColorOn="#FF69B4" // Hot pink for 'on'
                                    backgroundColorOff="#DDA0DD" // Plum/Thistle for 'off'
                                    containerStyle={styles.switchContainer}
                                    circleStyle={styles.switchCircle}
                                    // Additional props for better aesthetics
                                    duration={200}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#1a1a2e', // Dark purple-blue fallback
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly more opaque overlay
        paddingTop: Platform.OS === 'android' ? 50 : 40,
        paddingHorizontal: 20,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
    },
    noDataText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Avenir-Light', // Example font
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    backButton: {
        padding: 5,
        width: 40, // Ensure consistent hit area
        alignItems: 'flex-start',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 28, // Larger arrow
        fontWeight: '300', // Lighter weight for elegance
    },
    headerTitle: {
        fontSize: 28, // Slightly larger title
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    headerPlaceholder: {
        width: 40, // To balance the back button on the left
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // More rounded corners
        padding: 20, // Increased padding
        marginBottom: 20, // More space between cards
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)', // Subtle pink border
        ...Platform.select({ // Add subtle shadow for depth
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
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Vertically align items
        marginBottom: 12, // Increased spacing
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator
        borderBottomColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
        paddingBottom: 8, // Padding above separator
    },
    detailLabel: {
        color: '#f0e6fa', // Light lavender for labels
        fontSize: 15,
        fontWeight: '600', // Semi-bold
        flex: 1, // Allows label to take available space
    },
    detailValue: {
        color: '#fff', // Pure white for values
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'right', // Align value to the right
        flex: 1.5, // Allows value to take more space if needed
    },
    sectionTitle: {
        color: '#ffe0f0', // Soft pinkish-white for section titles
        fontSize: 20, // Larger section title
        fontWeight: 'bold',
        marginBottom: 15, // More space below title
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center stars
        marginBottom: 20,
    },
    starIcon: {
        fontSize: 32, // Larger stars
        marginHorizontal: 4, // Spacing between stars
    },
    picsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 5, // Small padding for scrollview content
    },
    thumbnail: {
        width: 90, // Larger thumbnails
        height: 90, // Larger thumbnails
        borderRadius: 15, // More rounded corners
        marginRight: 15, // More space between thumbnails
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#ffc0cb', // Light pink border for images
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
    noteContainer: {
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Slightly darker pink with transparency
        borderRadius: 15,
        padding: 15, // Increased padding
        minHeight: 80, // Minimum height for notes
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)', // More visible border
    },
    noteText: {
        color: '#fff', // White for note text
        fontSize: 15,
        fontStyle: 'italic',
        lineHeight: 22, // Better line spacing
        textAlign: 'justify', // Justify text for a cleaner block
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15, // More space between toggles
    },
    toggleLabel: {
        color: '#f0e6fa', // Light lavender for toggle labels
        fontSize: 16,
        fontWeight: '600',
    },
    switchContainer: {
        width: 65, // Slightly wider switch
        height: 35, // Slightly taller switch
        borderRadius: 35 / 2, // Perfect pill shape
        padding: 3, // Smaller padding inside for bigger circle
    },
    switchCircle: {
        width: 29, // Bigger circle
        height: 29, // Bigger circle
        borderRadius: 29 / 2, // Perfect circle
        backgroundColor: '#fff', // White circle
    },
});

export default FlightDetailsScreen;
