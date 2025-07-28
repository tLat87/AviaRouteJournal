import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform,
    Switch,
    ScrollView,
    Linking,
} from 'react-native';
// Removed: import Icon from 'react-native-vector-icons/MaterialIcons'; // No more MaterialIcons

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleMeasurementsPress = () => {
        console.log('Measurements pressed');
        // navigation.navigate('MeasurementsScreen'); // Navigation to measurements screen
    };

    const handlePrivacySecurityPress = () => {
        Linking.openURL('https://www.termsfeed.com/live/36a45711-604d-4ca6-a6c4-aaabe4d5eeb3');
    };

    const handleDeveloperInfoPress = () => {
        navigation.navigate('DeveloperInfoScreen'); // Navigation to developer info screen
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.headerOverlay}>
                    {/* Back button using text character */}
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Settings</Text>
                    {/* Placeholder to balance the back button */}
                    <View style={styles.backButtonPlaceholder} />
                </View>

                <ScrollView style={styles.contentScrollView} contentContainerStyle={styles.contentContainer}>
                    {/* Notification Setting */}
                    {/*<View style={styles.settingItem}>*/}
                    {/*    <Text style={styles.settingText}>Notifications</Text>*/}
                    {/*    <Switch*/}
                    {/*        trackColor={{ false: "#767577", true: "#ff69b4" }} // Pink when active*/}
                    {/*        thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}*/}
                    {/*        ios_backgroundColor="#3e3e3e"*/}
                    {/*        onValueChange={() => setNotificationsEnabled(previousState => !previousState)}*/}
                    {/*        value={notificationsEnabled}*/}
                    {/*        style={Platform.OS === 'ios' ? null : { transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} // Scale for Android to match iOS size better*/}
                    {/*    />*/}
                    {/*</View>*/}

                    {/*/!* Measurements (Example - uncomment and use if screen exists) *!/*/}
                    {/*<TouchableOpacity style={styles.settingItem} onPress={handleMeasurementsPress}>*/}
                    {/*    <Text style={styles.settingText}>Measurements</Text>*/}
                    {/*    <Text style={styles.arrowIcon}>›</Text> /!* Using text character for arrow *!/*/}
                    {/*</TouchableOpacity>*/}

                    {/* Privacy & Security */}
                    <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySecurityPress}>
                        <Text style={styles.settingText}>Privacy & Security</Text>
                        <Text style={styles.arrowIcon}>›</Text>
                    </TouchableOpacity>

                    {/* Developer Info */}
                    <TouchableOpacity style={styles.settingItem} onPress={handleDeveloperInfoPress}>
                        <Text style={styles.settingText}>Developer Info</Text>
                        <Text style={styles.arrowIcon}>›</Text>
                    </TouchableOpacity>

                    {/* Technology Stack and Tips Section */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoBlockTitle}>Technology Stack</Text>
                        <Text style={styles.infoBlockText}>
                            This application is built using the following core technologies:
                        </Text>
                        <Text style={styles.infoBlockListItem}>• **React Native** (for cross-platform UI)</Text>
                        <Text style={styles.infoBlockListItem}>• **Redux Toolkit** (for state management)</Text>
                        <Text style={styles.infoBlockListItem}>• **React Navigation** (for screen navigation)</Text>
                        <Text style={styles.infoBlockListItem}>• **react-native-image-picker** (for photo selection)</Text>
                        <Text style={styles.infoBlockListItem}>• **react-native-maps** (for map functionalities)</Text>
                        {/* Note: react-native-vector-icons and react-native-switch-toggle removed as per request */}

                        <View style={styles.infoBlockSeparator} />

                        <Text style={styles.infoBlockTitle}>Tips for Building Mobile Apps</Text>
                        <Text style={styles.infoBlockText}>
                            When developing mobile applications, consider these best practices:
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **Component Reusability:** Design small, focused components that can be reused across different parts of your app.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **State Management:** For complex apps, use a predictable state management library like Redux to handle data flow.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **Performance Optimization:** Optimize images, use FlatList/SectionList for long lists, and avoid unnecessary re-renders.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **Cross-Platform Compatibility:** Test your app thoroughly on both iOS and Android devices to ensure consistent behavior and UI.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **User Experience (UX):** Focus on intuitive navigation, clear feedback, and a visually appealing interface.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **Error Handling:** Implement robust error handling and provide clear messages to users.
                        </Text>
                        <Text style={styles.infoBlockListItem}>
                            • **Native Modules:** For platform-specific features (like maps, camera), use well-maintained native modules.
                        </Text>
                    </View>
                </ScrollView>
            </ImageBackground>
            <View style={{marginBottom: 50}}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Dark purple-blue background
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0, // Adjust for status bar on Android
        justifyContent: 'space-between', // Space between back button, title, and placeholder
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Dark transparent overlay for header
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        padding: 5,
        width: 40, // Fixed width for consistent spacing
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 28,
        color: '#ffe0f0', // Soft pinkish-white
    },
    backButtonPlaceholder: { // To balance the back button on the right side
        width: 40,
    },
    headerText: {
        fontSize: 28, // Consistent header title size
        fontWeight: 'bold',
        color: '#ffe0f0',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
    },
    contentScrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1, // Allows content to expand within ScrollView
        backgroundColor: 'rgba(26, 26, 46, 0.7)', // Slightly more transparent dark purple-blue
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30, // Add bottom padding for scrollable content
        borderTopLeftRadius: 20, // Rounded top corners for the content area
        borderTopRightRadius: 20,
    },
    // Setting Item Card
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light pink with high transparency
        borderRadius: 20, // More rounded corners
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 15,
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
    settingText: {
        fontSize: 18, // Slightly smaller font for settings text
        color: '#ffe0f0', // Soft pinkish-white
        fontWeight: '600',
    },
    arrowIcon: { // Style for the text arrow icon
        fontSize: 24, // Consistent icon size
        color: '#ffc0cb', // Light pink color
        fontWeight: 'bold', // Make it stand out
    },
    // Info Block Section
    infoBlock: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Light transparent pink
        borderRadius: 20, // Consistent rounded corners
        padding: 20,
        marginTop: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)', // Consistent border
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
    infoBlockTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffe0f0', // Soft pinkish-white
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    infoBlockText: {
        fontSize: 15,
        color: '#f0e6fa', // Light lavender
        marginBottom: 5,
        lineHeight: 22,
    },
    infoBlockListItem: {
        fontSize: 14,
        color: '#e0b0ff', // A slightly deeper lavender for list items
        marginLeft: 10,
        marginBottom: 3,
        lineHeight: 20,
    },
    infoBlockSeparator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Thin white separator
        marginVertical: 15,
    },
});

export default SettingsScreen;
