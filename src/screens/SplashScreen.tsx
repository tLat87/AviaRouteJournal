import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Platform,
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const NEXT_SCREEN = 'MainTab';

const SplashScreen = ({ navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [planeAnim] = useState(new Animated.Value(-100));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();

        Animated.timing(
            planeAnim,
            {
                toValue: screenWidth + 100,
                duration: 3500,
                useNativeDriver: true,
            }
        ).start();

        const timer = setTimeout(() => {
            navigation.replace(NEXT_SCREEN);
        }, 4000);

        return () => {
            clearTimeout(timer);
            planeAnim.stopAnimation();
            fadeAnim.stopAnimation();
        };
    }, [fadeAnim, planeAnim, navigation]);

    return (
        <View style={styles.background}>
            <StatusBar barStyle="light-content" />

            <Animated.View style={[
                styles.planeContainer,
                { transform: [{ translateX: planeAnim }] }
            ]}>
                <Image
                    source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')}
                    style={styles.planeImage}
                    resizeMode="contain"
                />
            </Animated.View>

            <View style={styles.overlay}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    {/* Контейнер-рамка для текста */}
                    <View style={styles.textFrame}>
                        <Text style={styles.title}>AviaRouteJournal</Text>
                        <Text style={styles.subtitleText}>Your Personal Flight Log</Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    planeContainer: {
        position: 'absolute',
        top: '20%',
        left: -200, // Adjusted starting position to account for new width
        zIndex: 0,
    },
    planeImage: {
        width: 200,
        height: 200,
        // transform: [{ rotate: '15deg' }], // Uncomment if you want rotation
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Новый стиль для рамки текста
    textFrame: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Прозрачно-белый фон
        borderRadius: 20, // Скругленные углы
        borderWidth: 1, // Тонкая рамка
        borderColor: 'rgba(255, 255, 255, 0.3)', // Полупрозрачный белый цвет рамки
        paddingHorizontal: 30, // Внутренний отступ по горизонтали
        paddingVertical: 20, // Внутренний отступ по вертикали
        alignItems: 'center',
        // Тень для объема
        ...Platform.select({
            ios: {
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 5,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#ffe0f0',
        textAlign: 'center',
        marginBottom: 10, // Уменьшил отступ, чтобы он был внутри рамки
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 0.8,
        fontFamily: 'Helvetica Neue',
    },
    subtitleText: {
        fontSize: 20,
        color: '#c0c0c0',
        marginTop: 5, // Уменьшил отступ
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        fontFamily: 'Helvetica Neue',
    },
});

export default SplashScreen;
