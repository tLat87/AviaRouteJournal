// import React from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
//     ImageBackground, // Для фонового изображения самолета
//     SafeAreaView,    // Для учета вырезов экрана
//     Platform,        // Для специфичных стилей платформы
// } from 'react-native';
//
// const MatchAeroplanesScreen = ({ navigation }) => {
//     const handlePlayPress = () => {
//         // Здесь можно добавить навигацию к экрану игры "Match the Aeroplanes"
//         navigation.navigate('MemoryGameScreen');
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ImageBackground
//                 source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} // Замените на путь к вашему фоновому изображению
//                 style={styles.backgroundImage}
//                 resizeMode="cover"
//             >
//                 <View style={styles.overlay}>
//                     {/* Заголовок */}
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.titleLine1}>Make a Match:</Text>
//                         <Text style={styles.titleLine2}>Aeroplanes</Text>
//                     </View>
//
//                     {/* Кнопка Play */}
//                     <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
//                         <Text style={styles.playButtonText}>Play</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: 'black', // Фон всего экрана
//     },
//     backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'flex-end', // Выравнивание содержимого к низу
//         paddingBottom: Platform.OS === 'android' ? 20 : 0, // Дополнительный отступ снизу для Android
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.2)', // Затемнение фона, если нужно
//         justifyContent: 'space-between', // Распределяем пространство между заголовком и кнопкой
//         paddingHorizontal: 20,
//         paddingVertical: 50, // Отступ сверху и снизу
//     },
//     titleContainer: {
//         marginTop: Platform.OS === 'android' ? 40 : 0, // Отступ сверху для Android status bar
//         alignItems: 'flex-start', // Выравнивание текста влево
//     },
//     titleLine1: {
//         fontFamily: 'Cursive', // Примерно соответствует шрифту на скрине, замените на реальный, если есть
//         fontSize: 38,
//         color: 'white',
//         // Возможно, потребуются стили для имитации "курсива", если шрифт не установлен:
//         // fontStyle: 'italic',
//         // fontWeight: 'bold',
//     },
//     titleLine2: {
//         fontFamily: 'Cursive', // Примерно соответствует шрифту на скрине
//         fontSize: 42,
//         color: 'white',
//         // fontStyle: 'italic',
//         // fontWeight: 'bold',
//     },
//     playButton: {
//         backgroundColor: '#dc3545', // Красный цвет кнопки
//         paddingVertical: 18,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: 20, // Отступ от низа
//     },
//     playButtonText: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
// });
//
// export default MatchAeroplanesScreen;

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform,
} from 'react-native';
// No need for Icon here unless adding a back button, which isn't in the original.

const MatchAeroplanesScreen = ({ navigation }) => {
    const handlePlayPress = () => {
        // Here you can add navigation to the "Match the Aeroplanes" game screen
        navigation.navigate('MemoryGameScreen');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} // Use the same background image
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    {/* Title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleLine1}>Make a Match:</Text>
                        <Text style={styles.titleLine2}>Aeroplanes</Text>
                    </View>

                    {/* Play Button */}
                    <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                        <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                </View>
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Consistent semi-transparent overlay
        justifyContent: 'space-between', // Distribute space between title and button
        paddingHorizontal: 20,
        paddingVertical: 50, // Top and bottom padding
        paddingTop: Platform.OS === 'android' ? 70 : 50, // Adjust top padding for Android status bar
    },
    titleContainer: {
        alignItems: 'center', // Center text horizontally
        // No explicit marginTop here, as overlay padding handles it
    },
    titleLine1: {
        fontSize: 40, // Larger font size
        fontWeight: 'bold', // Bold for impact
        color: '#ffe0f0', // Soft pinkish-white
        fontStyle: 'italic', // Italic for style
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Consistent text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        letterSpacing: 1.5, // Consistent letter spacing
        marginBottom: 5, // Space between lines
    },
    titleLine2: {
        fontSize: 48, // Even larger for "Aeroplanes"
        fontWeight: '900', // Extra bold for strong emphasis
        color: '#e0b0ff', // A soft, light purple for the main word
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Stronger text shadow
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        letterSpacing: 2, // More letter spacing
    },
    playButton: {
        backgroundColor: '#ff3366', // Vibrant red/pink, consistent with other buttons
        paddingVertical: 18,
        borderRadius: 30, // Rounded corners
        alignItems: 'center',
        marginBottom: 20, // Space from the bottom
        // Consistent shadow for buttons
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
    playButtonText: {
        color: '#fff', // White text
        fontSize: 22, // Larger font size for button text
        fontWeight: 'bold',
        textTransform: 'uppercase', // Uppercase text
        letterSpacing: 1.5, // Consistent letter spacing
    },
});

export default MatchAeroplanesScreen;
