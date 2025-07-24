import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Alert,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { addMeal } from "../redux/slices/mealsSlice";

// Custom Checkbox Component - no MaterialIcons
const CustomCheckbox = ({ label, checked, onChange, style = {}, labelStyle = {} }) => (
    <TouchableOpacity onPress={onChange} style={[styles.customCheckboxContainer, style]}>
        <View style={[styles.customCheckboxBox, checked && styles.customCheckboxBoxChecked]}>
            {/* Display checkmark as text character */}
            {checked && <Text style={styles.customCheckboxCheckmark}>✓</Text>}
        </View>
        <Text style={[styles.checkboxLabel, labelStyle]}>{label}</Text>
    </TouchableOpacity>
);

// Star Rating Component - now using text characters for stars
const StarRating = ({ rating, onChange }) => {
    return (
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onChange(star)}>
                    <Text
                        style={[
                            styles.star,
                            { color: star <= rating ? '#FFD700' : '#d8bfd8' }, // Gold for filled, soft purple for empty
                        ]}
                    >
                        ★
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

// Component for "Add Drink", "Add Meal", "Add Snacks" sections
const ItemInputSection = ({ itemType, onSave }) => {
    const [taste, setTaste] = useState(0);
    const [presentation, setPresentation] = useState(0);
    const [photo, setPhoto] = useState(null); // To store image URI

    const handleTasteChange = (rating) => {
        setTaste(rating);
    };

    const handlePresentationChange = (rating) => {
        setPresentation(rating);
    };

    const pickImage = async () => {
        const options = {
            mediaType: 'photo',
            quality: 0.7,
            selectionLimit: 1,
        };

        try {
            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorCode, result.errorMessage);
                Alert.alert('Image Picker Error', result.errorMessage || 'An error occurred.');
            } else if (result.assets && result.assets.length > 0) {
                const source = result.assets[0].uri;
                setPhoto(source);
            } else {
                console.log("No assets found in response:", result);
                Alert.alert("Image Error", "Could not get image URI.");
            }
        } catch (error) {
            console.error("Error launching image library:", error);
            Alert.alert("Error", "Failed to open image library.");
        }
    };

    const memoizedOnSave = useCallback(() => {
        onSave({ taste, presentation, photo });
    }, [taste, presentation, photo, onSave]);

    useEffect(() => {
        memoizedOnSave();
    }, [memoizedOnSave]);

    return (
        <View style={styles.sectionContainer}> {/* Changed to View as ScrollView is parent */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Add {itemType}</Text>
                {/* Removed Edit button as it had no functionality */}
            </View>
            {/* Category buttons - simplified to match the type of item being added */}
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.categoryButton, styles.activeCategoryButton]}
                >
                    <Text style={[styles.categoryButtonText, styles.activeCategoryButtonText]}>
                        {itemType}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addPhotoContainer} onPress={pickImage}>
                {photo ? (
                    <Image source={{ uri: photo }} style={styles.imagePreview} />
                ) : (
                    // Using text for "Add Photo" icon
                    <Text style={styles.addPhotoIconText}>+</Text>
                )}
            </TouchableOpacity>

            <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Taste</Text>
                <StarRating rating={taste} onChange={handleTasteChange} />
            </View>

            <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>Presentation</Text>
                <StarRating rating={presentation} onChange={handlePresentationChange} />
            </View>
        </View>
    );
};

const MealBeveragesScreen = ({ navigation }) => { // Added navigation prop
    const dispatch = useDispatch();
    const [flightInfo, setFlightInfo] = useState({
        meals: false,
        drinks: false,
        snacks: false,
    });

    const [mealData, setMealData] = useState({});
    const [drinkData, setDrinkData] = useState({});
    const [snackData, setSnackData] = useState({});

    const handleFlightInfoChange = (type) => {
        setFlightInfo((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSaveAll = () => {
        const currentFlightInfo = flightInfo || { meals: false, drinks: false, snacks: false };

        const fullMealEntry = {
            flightInfo: currentFlightInfo,
            drink: drinkData,
            meal: mealData,
            snack: snackData,
            timestamp: new Date().toISOString(),
        };
        dispatch(addMeal(fullMealEntry));
        Alert.alert('Success', 'Meal information saved!');
        console.log('Saved data:', fullMealEntry);
        // Reset states after saving
        setFlightInfo({ meals: false, drinks: false, snacks: false });
        setMealData({});
        setDrinkData({});
        setSnackData({});
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <ImageBackground
                    source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                    style={styles.headerBackground}
                    resizeMode="cover"
                >
                    <View style={styles.headerOverlay}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTextActual}>Meals & Beverages</Text>
                        <View style={styles.headerPlaceholder} />
                    </View>
                </ImageBackground>

                <View style={styles.innerContainer}>
                    {/* Enter Flight Section */}
                    <View style={styles.card}> {/* Using 'card' style for consistency */}
                        <Text style={styles.cardTitle}>Enter Flight Details</Text> {/* Consistent title style */}
                        <View style={styles.checkboxesGroup}>
                            <CustomCheckbox
                                label="Meals"
                                checked={flightInfo.meals}
                                onChange={() => handleFlightInfoChange('meals')}
                            />
                            <CustomCheckbox
                                label="Drinks"
                                checked={flightInfo.drinks}
                                onChange={() => handleFlightInfoChange('drinks')}
                            />
                            <CustomCheckbox
                                label="Snacks"
                                checked={flightInfo.snacks}
                                onChange={() => handleFlightInfoChange('snacks')}
                            />
                        </View>
                    </View>

                    {flightInfo.drinks && <ItemInputSection itemType="Drinks" onSave={setDrinkData} />}
                    {flightInfo.meals && <ItemInputSection itemType="Meals" onSave={setMealData} />}
                    {flightInfo.snacks && <ItemInputSection itemType="Snacks" onSave={setSnackData} />}

                    {/* Best Flavour Section */}
                    <View style={styles.card}> {/* Using 'card' style for consistency */}
                        <Text style={styles.cardTitle}>What it's best for</Text> {/* Consistent title style */}
                        <View style={styles.trophyContainer}>
                            <Text style={styles.trophyIcon}>🏆</Text>
                            <Text style={styles.whatItsBestFor}>Served ×5 on flight LH 1594</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSaveAll} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save All Meal Info</Text>
                    </TouchableOpacity>
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
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Consistent background color
    },
    innerContainer: {
        paddingHorizontal: 20, // Apply horizontal padding here
        paddingTop: 0,
    },
    headerBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
        paddingTop: Platform.OS === 'android' ? 40 : 0, // Adjust for status bar on Android
    },
    headerOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Consistent overlay
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between', // Space between back button, title, and placeholder
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 28,
        color: '#ffe0f0', // Soft pinkish-white
    },
    headerTextActual: {
        fontSize: 28, // Consistent header title size
        fontWeight: 'bold',
        color: '#ffe0f0',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    headerPlaceholder: {
        width: 40, // To balance the back button
    },
    // General Card Style (reused for consistency)
    card: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // More rounded corners
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
    cardTitle: { // Consistent card title style
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white for card titles
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator line
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    // Checkboxes Group
    checkboxesGroup: {
        marginTop: 10,
        alignItems: 'flex-start', // Align checkboxes to the left
    },
    customCheckboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // More space between checkboxes
    },
    customCheckboxBox: {
        width: 24, // Larger checkbox
        height: 24,
        borderRadius: 6, // Slightly more rounded
        borderWidth: 2,
        borderColor: '#ff69b4', // Hot pink border
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white background
    },
    customCheckboxBoxChecked: {
        backgroundColor: '#ff69b4', // Hot pink when checked
        borderColor: '#ff69b4', // Consistent border
    },
    customCheckboxCheckmark: {
        color: 'white',
        fontSize: 18, // Larger checkmark
        fontWeight: 'bold',
    },
    checkboxLabel: {
        color: '#fff', // White label text
        fontSize: 16,
        fontWeight: '500',
    },
    // Item Input Section (Add Drink/Meal/Snack)
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the title
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: { // Renamed from sectionTitle to avoid conflict, using cardTitle style
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffe0f0',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    // Removed editButton
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the category button
        marginBottom: 15,
    },
    categoryButton: { // This will be the single active button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Transparent pink
        borderWidth: 1,
        borderColor: '#ff69b4', // Hot pink border
    },
    activeCategoryButton: { // This will be the only style applied
        backgroundColor: '#ff69b4', // Hot pink
    },
    categoryButtonText: {
        fontWeight: 'bold',
        color: '#fff', // White text
        fontSize: 16,
    },
    activeCategoryButtonText: {
        color: 'white',
    },
    addPhotoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white background
        borderRadius: 15, // More rounded
        padding: 30, // Increased padding
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        minHeight: 150, // Increased min height
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)', // Pink border
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
    addPhotoIconText: { // Style for the "+" text icon
        fontSize: 60, // Large plus sign
        color: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white
        fontWeight: '200', // Lighter weight
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    ratingSection: { // Renamed from ratingContainer to avoid confusion with parent
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 8,
    },
    ratingLabel: {
        marginRight: 10,
        fontSize: 16,
        minWidth: 100, // Increased minWidth for label
        color: '#f0e6fa', // Light lavender
        fontWeight: '600',
    },
    stars: {
        flexDirection: 'row',
        flex: 1, // Allow stars to take up remaining space
        justifyContent: 'flex-end', // Align stars to the right
    },
    star: {
        fontSize: 24, // Consistent star size
        marginHorizontal: 3,
    },
    // Best Flavour Section
    trophyContainer: { // New container for trophy and text
        alignItems: 'center',
        marginTop: 10,
    },
    trophyIcon: {
        fontSize: 40,
        marginBottom: 10,
    },
    whatItsBestFor: {
        fontSize: 16,
        color: '#fff', // White text
        textAlign: 'center',
        lineHeight: 22,
    },
    saveButton: {
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
    saveButtonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default MealBeveragesScreen;
