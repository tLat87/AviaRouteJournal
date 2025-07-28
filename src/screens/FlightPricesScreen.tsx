import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';

type Flight = {
    id: string;
    from: string;
    to: string;
    airline: string;
    flightNumber: string;
    date: string;
    price: string;
};

const dummyFlights: Flight[] = [
    { id: '1', from: 'Lisbon', to: 'Paris', airline: 'Air France', flightNumber: 'AF123', date: '2025-08-01', price: '€149' },
    { id: '2', from: 'Berlin', to: 'Rome', airline: 'Lufthansa', flightNumber: 'LH456', date: '2025-08-03', price: '€179' },
    { id: '3', from: 'Madrid', to: 'Amsterdam', airline: 'KLM', flightNumber: 'KL789', date: '2025-08-06', price: '€132' },
    { id: '4', from: 'London', to: 'Dublin', airline: 'Ryanair', flightNumber: 'FR112', date: '2025-08-02', price: '€89' },
    { id: '5', from: 'Oslo', to: 'Copenhagen', airline: 'SAS', flightNumber: 'SK221', date: '2025-08-05', price: '€104' },
    { id: '6', from: 'Vienna', to: 'Prague', airline: 'Austrian Airlines', flightNumber: 'OS335', date: '2025-08-07', price: '€122' },
    { id: '7', from: 'Helsinki', to: 'Stockholm', airline: 'Finnair', flightNumber: 'AY556', date: '2025-08-04', price: '€98' },
    { id: '8', from: 'Warsaw', to: 'Zurich', airline: 'SWISS', flightNumber: 'LX701', date: '2025-08-08', price: '€168' },
    { id: '9', from: 'Athens', to: 'Istanbul', airline: 'Turkish Airlines', flightNumber: 'TK932', date: '2025-08-09', price: '€144' },
    { id: '10', from: 'Brussels', to: 'Frankfurt', airline: 'Brussels Airlines', flightNumber: 'SN883', date: '2025-08-10', price: '€119' },
    { id: '11', from: 'Bucharest', to: 'Sofia', airline: 'TAROM', flightNumber: 'RO123', date: '2025-08-11', price: '€85' },
    { id: '12', from: 'Budapest', to: 'Belgrade', airline: 'Air Serbia', flightNumber: 'JU541', date: '2025-08-12', price: '€92' },
    { id: '13', from: 'Reykjavik', to: 'Oslo', airline: 'Norwegian', flightNumber: 'DY318', date: '2025-08-13', price: '€188' },
    { id: '14', from: 'Barcelona', to: 'Nice', airline: 'Vueling', flightNumber: 'VY998', date: '2025-08-14', price: '€109' },
    { id: '15', from: 'Milan', to: 'Munich', airline: 'Eurowings', flightNumber: 'EW667', date: '2025-08-15', price: '€137' },
];

const FlightPricesScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.headerTime}>{new Date().toLocaleTimeString()}</Text>
                </View>
                <Text style={styles.title}>Flight Price Preview</Text>

                <ScrollView contentContainerStyle={styles.flightList}>
                    {dummyFlights.map((flight) => (
                        <View key={flight.id} style={styles.flightCardContainer}>
                            <View style={styles.flightCardContent}>
                                <Text style={styles.flightDate}>{flight.date}</Text>
                                <View style={styles.flightDetails}>
                                    <Text style={styles.flightRoute}>
                                        {flight.from} → {flight.to}
                                    </Text>
                                </View>
                                <View style={styles.airlineDetails}>
                                    <Text style={styles.flightAirline}>{flight.airline}</Text>
                                    <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                                </View>
                                <Text style={[styles.flightNumber, { marginTop: 10 }]}>
                                    Price: <Text style={{ color: '#ff69b4' }}>{flight.price}</Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
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
        color: '#ffe0f0',
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
        marginBottom: 15,
    },
    flightCardContent: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)',
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)',
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
        color: '#c0c0c0',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '500',
        alignSelf: 'flex-end',
    },
    flightDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10,
    },
    flightRoute: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        flexShrink: 1,
        marginRight: 10,
    },
    airlineDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    flightAirline: {
        color: '#f0e6fa',
        fontSize: 16,
        fontWeight: '600',
    },
    flightNumber: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    addButton: {
        backgroundColor: '#ff3366',
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

export default FlightPricesScreen;
