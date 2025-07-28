import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';
// Removed all react-native-vector-icons imports

// Reusable StarRating Component - now using text characters for stars
const StarRating = ({ rating, onChange }) => {
    return (
        <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onChange(star)}>
                    <Text style={[styles.starText, star <= rating ? styles.filledStar : styles.emptyStar]}>
                        {star <= rating ? '★' : '☆'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

// Reusable TabSelector Component (remains unchanged)
const TabSelector = ({ active }) => {
    const tabs = ['Drinks', 'Meals', 'Snacks'];
    return (
        <View style={styles.tabRow}>
            {tabs.map((tab) => (
                <Text
                    key={tab}
                    style={[
                        styles.tab,
                        active === tab && styles.activeTab,
                    ]}
                >
                    {tab}
                </Text>
            ))}
        </View>
    );
};

// Reusable MealBlock Component (remains unchanged)
const MealBlock = ({ type, imageSource, tasteRating, presentationRating, setTaste, setPresentation }) => {
    return (
        <View style={styles.card}>
            <View style={styles.tabContainer}>
                <TabSelector active={type} />
            </View>
            {imageSource ? (
                <Image source={imageSource} style={styles.image} />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>Add Photo</Text>
                </View>
            )}
            <Text style={styles.label}>Taste</Text>
            <StarRating rating={tasteRating} onChange={setTaste} />
            <Text style={styles.label}>Presentation</Text>
            <StarRating rating={presentationRating} onChange={setPresentation} />
        </View>
    );
};

export default function MealInfoFullScreen({ route, navigation }) {
    const { flightRoute, classType, hasMeals, hasDrinks, hasSnacks, image, impression } = route.params || {};

    const [snackTaste, setSnackTaste] = useState(0);
    const [snackPresentation, setSnackPresentation] = useState(0);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        {/* Using text for back arrow */}
                        <Text style={{ fontSize: 28, color: '#ffe0f0' }}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Meals & Beverages</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {/* Route Info Box */}
                    <View style={styles.routeInfoCard}>
                        <Text style={styles.routeText}>
                            <Text style={styles.routeBold}>{flightRoute || 'Unknown Route'}</Text>
                        </Text>
                        <Text style={styles.routeClassText}>Class: {classType || 'N/A'}</Text>

                        <View style={styles.mealAvailabilityContainer}>
                            {/* Using text characters for check/cross marks */}
                            <Text style={hasMeals ? styles.mealChecked : styles.mealUnchecked}>
                                {hasMeals ? '✓ Meals Available' : '✗ No Meals'}
                            </Text>
                            <Text style={hasDrinks ? styles.mealChecked : styles.mealUnchecked}>
                                {hasDrinks ? '✓ Drinks Available' : '✗ No Drinks'}
                            </Text>
                            <Text style={hasSnacks ? styles.mealChecked : styles.mealUnchecked}>
                                {hasSnacks ? '✓ Snacks Available' : '✗ No Snacks'}
                            </Text>
                        </View>
                    </View>

                    {hasMeals && (
                        <MealBlock
                            type="Meals"
                            imageSource={image}
                            tasteRating={impression || 0}
                            presentationRating={impression || 0}
                            setTaste={() => {}}
                            setPresentation={() => {}}
                        />
                    )}

                    {hasDrinks && (
                        <MealBlock
                            type="Drinks"
                            imageSource={image}
                            tasteRating={impression || 0}
                            presentationRating={impression || 0}
                            setTaste={() => {}}
                            setPresentation={() => {}}
                        />
                    )}

                    {hasSnacks && (
                        <MealBlock
                            type="Snacks"
                            imageSource={null}
                            tasteRating={snackTaste}
                            presentationRating={snackPresentation}
                            setTaste={setSnackTaste}
                            setPresentation={setSnackPresentation}
                        />
                    )}

                    {/* Best Flavour Section */}
                    <View style={styles.bestBox}>
                        <Text style={styles.bestTitle}>Best Flavour</Text>
                        <Text style={styles.bestSub}>🏆 Served ×5 on flight LH 1594</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingHorizontal: 5,
    },
    backButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffe0f0',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    headerPlaceholder: {
        width: 40,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    routeInfoCard: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
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
    routeText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
    },
    routeBold: {
        fontWeight: 'bold',
        color: '#ffe0f0',
    },
    routeClassText: {
        fontSize: 16,
        color: '#f0e6fa',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    mealAvailabilityContainer: {
        marginTop: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingTop: 10,
    },
    mealChecked: {
        color: '#8bc34a', // Green
        fontSize: 15,
        marginBottom: 5,
        fontWeight: '500',
    },
    mealUnchecked: {
        color: '#ff69b4', // Hot pink
        fontSize: 15,
        marginBottom: 5,
        fontWeight: '500',
    },
    card: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
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
    tabContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 105, 180, 0.2)',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'space-around',
        width: '100%',
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        color: '#ffe0f0',
        fontSize: 16,
        fontWeight: '500',
        borderRadius: 15,
    },
    activeTab: {
        backgroundColor: '#ff69b4',
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 15,
        marginBottom: 15,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#ffc0cb',
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
    imagePlaceholder: {
        height: 180,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)',
    },
    placeholderText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontStyle: 'italic',
        fontSize: 16,
    },
    label: {
        fontWeight: '600',
        color: '#f0e6fa',
        marginTop: 5,
        marginBottom: 8,
        fontSize: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'flex-start',
    },
    starText: { // New style for star text
        fontSize: 24,
        marginHorizontal: 3,
    },
    filledStar: {
        color: '#FFD700', // Gold color for filled stars
    },
    emptyStar: {
        color: '#d8bfd8', // Soft purple for empty stars
    },
    bestBox: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
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
    bestTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffe0f0',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    bestSub: {
        color: '#e0b0ff',
        fontSize: 16,
        fontStyle: 'italic',
    },
});
