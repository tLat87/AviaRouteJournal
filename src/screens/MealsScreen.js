import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Image,
    Platform, // Import Platform for shadows and header adjustment
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the back arrow icon
import StarIcon from 'react-native-vector-icons/FontAwesome'; // For star icons

const MealsScreen = ({ navigation }) => {
    // Static meal entries - Ensure image paths are correct
    const staticMealEntries = [
        {
            id: 'm1',
            flightRoute: 'London (LUT) - Paris (CDG)',
            class: 'Economy',
            impression: 4,
            mealPic: require('../assets/img/Avi/Pic.png'),
        },
        {
            id: 'm2',
            flightRoute: 'Berlin (BER) - London (LUT)',
            class: 'Business',
            impression: 5,
            mealPic: require('../assets/img/Avi/Pic-1.png'),
        },
        {
            id: 'm3',
            flightRoute: 'Paris (ORY) - Berlin (BER)',
            class: 'Economy',
            impression: 3,
            mealPic: require('../assets/img/Avi/Pic-4.png'),
        },
        {
            id: 'm4',
            flightRoute: 'Amsterdam (AMS) - Rome (FCO)',
            class: 'Premium Economy',
            impression: 4,
            mealPic: require('../assets/img/Avi/Pic-2.png'),
        },
        {
            id: 'm5',
            flightRoute: 'Madrid (MAD) - Vienna (VIE)',
            class: 'Business',
            impression: 5,
            mealPic: require('../assets/img/Avi/Pic.png'),
        },
        {
            id: 'm6',
            flightRoute: 'Zurich (ZRH) - Barcelona (BCN)',
            class: 'Economy',
            impression: 4,
            mealPic: require('../assets/img/Avi/2ab894f82746afecf376a9553938749193c1ed0a.png'),
        },
        {
            id: 'm7',
            flightRoute: 'Lisbon (LIS) - Frankfurt (FRA)',
            class: 'First Class',
            impression: 5,
            mealPic: require('../assets/img/Avi/7ef06dc43ace9f7b87f37a723f23afda2c002b7e.png'),
        },
        {
            id: 'm8',
            flightRoute: 'Prague (PRG) - Copenhagen (CPH)',
            class: 'Economy',
            impression: 3,
            mealPic: require('../assets/img/Avi/e46d9456bbbd19363b3128e95f7ef7e4afd37303.png'),
        },
    ];

    // Get dynamic meal data from Redux
    // Assuming 'state.meals' directly contains an array of meal objects
    // If it's an object with a 'meals' property, adjust to state.meals.meals
    const dynamicMeals = useSelector((state) => state.meals || []);

    // Format dynamic meals to match the structure of static entries
    const formattedDynamicMeals = dynamicMeals.map((meal, index) => ({
        id: `d${meal.id || index}`, // Use existing ID or generate one
        flightRoute: `${meal.flightInfo?.from || 'Unknown'} - ${meal.flightInfo?.to || 'Unknown'}`,
        class: meal.flightInfo?.class || 'Economy',
        impression: meal.rating || 4, // Use actual rating if available, otherwise default to 4
        mealPic: meal.image ? { uri: meal.image } : require('../assets/img/Meal.png'), // Use dynamic image URI or default
    }));

    // Combine all meals
    const allMeals = [...staticMealEntries, ...formattedDynamicMeals];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    name={i < rating ? 'star' : 'star-o'} // 'star' for filled, 'star-o' for empty
                    size={18} // Adjusted size for list item
                    color={i < rating ? '#FFD700' : '#d8bfd8'} // Gold for filled, soft purple for empty
                    style={styles.starIcon}
                />
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    return (
        <ImageBackground
            source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={28} color="#ffe0f0" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Meals & Beverages</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                {/* List of meals */}
                <ScrollView contentContainerStyle={styles.mealList}>
                    {allMeals.map((meal) => (
                        <TouchableOpacity
                            key={meal.id}
                            style={styles.mealCard}
                            onPress={() => navigation.navigate('MealInfoFullScreen', {
                                flightRoute: meal.flightRoute,
                                classType: meal.class,
                                // Assuming these props are derived or constant for display on the next screen
                                hasMeals: true,
                                hasDrinks: true,
                                hasSnacks: false,
                                image: meal.mealPic, // Pass the image
                                impression: meal.impression, // Pass impression
                            })}
                        >
                            <View style={styles.mealTextContent}>
                                <Text style={styles.mealFlightRoute}>{meal.flightRoute}</Text>
                                <Text style={styles.mealClass}>{meal.class}</Text>
                                {renderStars(meal.impression)}
                            </View>
                            <Image source={meal.mealPic} style={styles.mealThumbnail} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* "Add Meal" Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('MealManagerScreen')}
                >
                    <Text style={styles.addButtonText}>+ Add Meal</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 50}}/>
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
        paddingTop: Platform.OS === 'android' ? 50 : 40, // Adjust for status bar on Android
        paddingHorizontal: 20,
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
        width: 40,
        alignItems: 'flex-start',
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
        width: 40, // To balance the back button on the left
    },
    mealList: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingBottom: 20,
    },
    mealCard: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // More rounded corners
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    mealTextContent: {
        flex: 1,
        marginRight: 15, // More space between text and image
    },
    mealFlightRoute: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700', // Bolder route text
        marginBottom: 5,
    },
    mealClass: {
        color: '#e0e0e0', // Slightly lighter color for class
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 8, // More space below class
    },
    starsContainer: {
        flexDirection: 'row',
    },
    starIcon: {
        marginRight: 2, // Tighter spacing for stars in list
    },
    mealThumbnail: {
        width: 90, // Slightly larger thumbnail
        height: 90,
        borderRadius: 15, // More rounded corners
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
    addButton: {
        backgroundColor: '#ff3366', // A vibrant, appealing red/pink for the button
        borderRadius: 30,
        paddingVertical: 18, // More vertical padding
        alignItems: 'center',
        marginTop: 25, // More space above button
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
        fontSize: 19, // Slightly larger text
        fontWeight: 'bold',
        textTransform: 'uppercase', // Uppercase text for impact
        letterSpacing: 1,
    },
});

export default MealsScreen;
