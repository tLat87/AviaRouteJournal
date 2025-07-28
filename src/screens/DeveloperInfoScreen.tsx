import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform,
    Linking,
    ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    DeveloperInfo: undefined;
    // Add other screens here if needed
};

type Props = NativeStackScreenProps<RootStackParamList, 'DeveloperInfo'>;

const DeveloperInfoScreen: React.FC<Props> = ({ navigation }) => {
    const handleGoBack = () => {
        navigation.goBack();
    };

    const openLink = (url: string) => {
        Linking.openURL(url).catch(err =>
            console.error("Couldn't load page", err)
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Developer Info</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                <ScrollView style={styles.contentScrollView}>
                    <View style={styles.contentContainer}>
                        {/* App Info */}
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>App Information</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Version:</Text>
                                <Text style={styles.infoValue}>1.0.0</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Build Number:</Text>
                                <Text style={styles.infoValue}>20250724-1</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Last Updated:</Text>
                                <Text style={styles.infoValue}>July 24, 2025</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Environment:</Text>
                                <Text style={styles.infoValue}>Production</Text>
                            </View>
                        </View>

                        {/* Contact */}
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Contact Developer</Text>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={() => openLink('mailto:hugovety@gmail.com')}
                            >
                                <Text style={styles.linkIcon}>📧</Text>
                                <Text style={styles.linkText}>hugovety@gmail.com</Text>
                                <Text style={styles.linkArrowIcon}>↗️</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Credits */}
                        <View style={styles.infoCard}>
                            <Text style={styles.cardTitle}>Credits</Text>
                            <Text style={styles.creditsText}>
                                Icons by Material Design Icons (Google).
                            </Text>
                            <Text style={styles.creditsText}>
                                Background images sourced from Unsplash.
                            </Text>
                            <Text style={styles.creditsText}>
                                Developed with ❤️ in React Native.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(26, 26, 46, 0.45)',
    },
    backButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-start',
    },
    backButtonText: {
        color: '#ffe0f0',
        fontSize: 28,
        fontWeight: '300',
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
    contentScrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: 'rgba(26, 26, 46, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    infoCard: {
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
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffe0f0',
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f0e6fa',
    },
    infoValue: {
        fontSize: 16,
        color: '#fff',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    linkIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    linkText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    linkArrowIcon: {
        fontSize: 18,
        color: '#ffc0cb',
        marginLeft: 5,
    },
    creditsText: {
        fontSize: 15,
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default DeveloperInfoScreen;
