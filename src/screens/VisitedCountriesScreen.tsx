import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform, ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALL_COUNTRIES: string[] = [
    'Portugal', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands',
    'Belgium', 'Switzerland', 'Austria', 'Poland', 'Czech Republic',
    'Hungary', 'Romania', 'Greece', 'Sweden', 'Norway', 'Finland',
    'Denmark', 'Ireland', 'United Kingdom', 'Turkey', 'Croatia',
    'Slovakia', 'Slovenia', 'Iceland', 'Estonia', 'Latvia', 'Lithuania',
    'Ukraine', 'Serbia', 'Bulgaria',
];

const STORAGE_KEY = '@visited_countries';

const VisitedCountriesScreen: React.FC = () => {
    const [visited, setVisited] = useState<string[]>([]);

    useEffect(() => {
        loadVisited();
    }, []);

    const loadVisited = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                setVisited(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Error loading visited countries', e);
        }
    };

    const toggleCountry = async (country: string) => {
        let updated: string[] = [];
        if (visited.includes(country)) {
            updated = visited.filter(c => c !== country);
        } else {
            updated = [...visited, country];
        }
        setVisited(updated);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error saving visited countries', e);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                style={styles.background}
            >

            <View style={styles.overlay}>
                <Text style={styles.title}>Visited Countries</Text>
                <View style={styles.counterBox}>
                    <Text style={styles.counterText}>
                        {visited.length} of {ALL_COUNTRIES.length} visited
                    </Text>
                </View>
                <ScrollView contentContainerStyle={styles.countryList}>
                    {ALL_COUNTRIES.map((country) => {
                        const isVisited = visited.includes(country);
                        return (
                            <TouchableOpacity
                                key={country}
                                style={[
                                    styles.countryItem,
                                    isVisited && styles.countryItemVisited,
                                ]}
                                onPress={() => toggleCountry(country)}
                            >
                                <Text
                                    style={[
                                        styles.countryText,
                                        isVisited && styles.countryTextVisited,
                                    ]}
                                >
                                    {country}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            </ImageBackground>
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffe0f0',
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#1a1a2e',
    },
    counterBox: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 12,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 105, 180, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.4)',
    },
    counterText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    countryList: {
        paddingBottom: 40,
    },
    countryItem: {
        backgroundColor: 'rgba(255, 192, 203, 0.08)',
        padding: 15,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.2)',
    },
    countryItemVisited: {
        backgroundColor: '#ff69b4',
        borderColor: '#ff69b4',
    },
    countryText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
    countryTextVisited: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default VisitedCountriesScreen;
