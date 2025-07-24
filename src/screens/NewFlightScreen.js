import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Platform,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView, // Добавлено для лучшей работы с клавиатурой
} from 'react-native';

import SwitchToggle from 'react-native-switch-toggle';
import { useDispatch } from 'react-redux';
import { addFlight } from "../redux/slices/flightsSlice";

import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarIcon from 'react-native-vector-icons/FontAwesome';

const NewFlightScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    // State for all input fields
    const [date, setDate] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [airline, setAirline] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightClass, setFlightClass] = useState('');
    const [aircraft, setAircraft] = useState('');
    const [duration, setDuration] = useState('');
    const [note, setNote] = useState('');

    // State for interactive elements
    const [impression, setImpression] = useState(0); // 0-5 star rating
    const [pics, setPics] = useState([]); // Array to store URIs of selected images

    // State for toggle switches
    const [isNightFlight, setIsNightFlight] = useState(false);
    const [isAlarming, setIsAlarming] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddPic = async () => {
        if (pics.length >= 3) {
            Alert.alert('Фотографий слишком много', 'Вы можете добавить максимум 3 фотографии.');
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 0.7, // Slightly reduced quality for faster loading
            selectionLimit: 1,
        };

        try {
            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorCode, result.errorMessage);
                Alert.alert('Ошибка выбора фото', result.errorMessage || 'Произошла ошибка при выборе изображения.');
            } else if (result.assets && result.assets.length > 0) {
                const newPhotoUri = result.assets[0].uri;
                setPics(prevPics => [...prevPics, newPhotoUri]);
            } else {
                console.log("No assets found in response:", result);
                Alert.alert("Ошибка", "Не удалось получить URI изображения.");
            }
        } catch (error) {
            console.error("Error launching image library:", error);
            Alert.alert("Ошибка", "Не удалось открыть библиотеку изображений.");
        }
    };

    const handleSaveFlight = () => {
        // Validate inputs
        if (!date || !from || !to || !airline || !flightNumber) {
            Alert.alert('Пожалуйста, заполните все обязательные поля', 'Дата, Откуда, Куда, Авиакомпания, Номер рейса.');
            return;
        }

        const newFlightData = {
            id: Date.now().toString(), // Simple unique ID
            date,
            from,
            to,
            airline,
            flightNumber,
            class: flightClass || 'Economy', // Default if empty
            aircraft: aircraft || 'Unknown', // Default if empty
            duration: duration || 'N/A', // Default if empty
            impression,
            note: note || '',
            pics,
            isNightFlight,
            isAlarming,
            isFavorite,
        };

        console.log('New Flight Data:', newFlightData);
        dispatch(addFlight(newFlightData));
        navigation.goBack();
    };

    const renderStar = (index) => {
        const filled = index < impression;
        return (
            <TouchableOpacity key={index} onPress={() => setImpression(index + 1)}>
                <StarIcon
                    name={filled ? 'star' : 'star-o'}
                    size={30} // Slightly larger stars
                    color={filled ? '#FFD700' : '#d8bfd8'} // Gold for filled, soft purple for empty
                    style={styles.starIcon}
                />
            </TouchableOpacity>
        );
    };

    const renderPicPlaceholder = (index) => {
        if (pics[index]) {
            return (
                <View key={index} style={styles.thumbnailContainer}>
                    <Image source={{ uri: pics[index] }} style={styles.thumbnail} />
                    <TouchableOpacity
                        style={styles.removePicButton}
                        onPress={() => setPics(prev => prev.filter((_, i) => i !== index))}
                    >
                        <Icon name="close" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <TouchableOpacity key={index} style={styles.picPlaceholder} onPress={handleAddPic}>
                <Icon name="add-photo-alternate" size={35} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} style={styles.background}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.overlay}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Text style={{        fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#ff41a2', // Мягкий розово-белый
                                    fontStyle: 'italic',
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 3,
                                    letterSpacing: 0.8,}}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>New Flight</Text>
                            <View style={styles.headerPlaceholder} />
                        </View>

                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            {/* Flight Details Input Card */}
                            <View style={styles.card}>
                                {[
                                    { label: 'Date', state: date, setState: setDate, keyboardType: 'default', autoCapitalize: 'none' },
                                    { label: 'From', state: from, setState: setFrom, keyboardType: 'default', autoCapitalize: 'words' },
                                    { label: 'To', state: to, setState: setTo, keyboardType: 'default', autoCapitalize: 'words' },
                                    { label: 'Airline', state: airline, setState: setAirline, keyboardType: 'default', autoCapitalize: 'words' },
                                    { label: 'Flight Number', state: flightNumber, setState: setFlightNumber, keyboardType: 'default', autoCapitalize: 'none' },
                                    { label: 'Class', state: flightClass, setState: setFlightClass, keyboardType: 'default', autoCapitalize: 'words' },
                                    { label: 'Aircraft', state: aircraft, setState: setAircraft, keyboardType: 'default', autoCapitalize: 'words' },
                                    { label: 'Duration', state: duration, setState: setDuration, keyboardType: 'numeric', autoCapitalize: 'none' },
                                ].map((item, index) => (
                                    <View style={styles.inputRow} key={index}>
                                        <Text style={styles.inputLabel}>{item.label}</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder={`Enter ${item.label.toLowerCase()}`}
                                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                            value={item.state}
                                            onChangeText={item.setState}
                                            keyboardType={item.keyboardType}
                                            autoCapitalize={item.autoCapitalize}
                                        />
                                    </View>
                                ))}
                            </View>

                            {/* Impression Section */}
                            <View style={styles.card}>
                                <Text style={styles.sectionTitle}>Your Impression</Text>
                                <View style={styles.starsContainer}>
                                    {[...Array(5)].map((_, i) => renderStar(i))}
                                </View>

                                <Text style={styles.sectionTitle}>Photos</Text>
                                <View style={styles.picsContainer}>
                                    {renderPicPlaceholder(0)}
                                    {renderPicPlaceholder(1)}
                                    {renderPicPlaceholder(2)}
                                </View>

                                <Text style={styles.sectionTitle}>Notes</Text>
                                <View style={styles.noteInputContainer}>
                                    <TextInput
                                        style={styles.noteTextInput}
                                        placeholder="Add any notes about your flight here..."
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        multiline
                                        value={note}
                                        onChangeText={setNote}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>

                            {/* Toggle Switches Section */}
                            <View style={styles.card}>
                                <View style={styles.toggleRow}>
                                    <Text style={styles.toggleLabel}>Night Flight</Text>
                                    <SwitchToggle
                                        switchOn={isNightFlight}
                                        onPress={() => setIsNightFlight(!isNightFlight)}
                                        circleColorOff="#fff"
                                        circleColorOn="#fff"
                                        backgroundColorOn="#FF69B4" // Hot pink for 'on'
                                        backgroundColorOff="#DDA0DD" // Plum/Thistle for 'off'
                                        containerStyle={styles.switchContainer}
                                        circleStyle={styles.switchCircle}
                                        duration={200}
                                    />
                                </View>
                                <View style={styles.toggleRow}>
                                    <Text style={styles.toggleLabel}>Alarming Flight</Text>
                                    <SwitchToggle
                                        switchOn={isAlarming}
                                        onPress={() => setIsAlarming(!isAlarming)}
                                        circleColorOff="#fff"
                                        circleColorOn="#fff"
                                        backgroundColorOn="#FF69B4"
                                        backgroundColorOff="#DDA0DD"
                                        containerStyle={styles.switchContainer}
                                        circleStyle={styles.switchCircle}
                                        duration={200}
                                    />
                                </View>
                                <View style={styles.toggleRow}>
                                    <Text style={styles.toggleLabel}>Favorite Flight</Text>
                                    <SwitchToggle
                                        switchOn={isFavorite}
                                        onPress={() => setIsFavorite(!isFavorite)}
                                        circleColorOff="#fff"
                                        circleColorOn="#fff"
                                        backgroundColorOn="#FF69B4"
                                        backgroundColorOff="#DDA0DD"
                                        containerStyle={styles.switchContainer}
                                        circleStyle={styles.switchCircle}
                                        duration={200}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveFlight}>
                            <Text style={styles.saveButtonText}>Save Flight</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Темный фон для SafeAreaView
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#1a1a2e',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)', // Полупрозрачный темный оверлей
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingTop: Platform.OS === 'android' ? 15 : 0, // Доп. отступ сверху для Android
    },
    backButton: {
        padding: 5,
        width: 40,
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffe0f0', // Мягкий розово-белый
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
    card: {
        backgroundColor: 'rgba(255, 192, 203, 0.15)', // Светло-розовый с высокой прозрачностью
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.3)', // Тонкая розовая рамка
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
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15, // Увеличенный отступ
        borderBottomWidth: StyleSheet.hairlineWidth, // Тонкая линия разделителя
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 10, // Отступ от линии
    },
    inputLabel: {
        color: '#f0e6fa', // Светлая лаванда для меток
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
    },
    textInput: {
        color: '#fff', // Белый для введенного текста
        fontSize: 16,
        flex: 2,
        textAlign: 'right',
        paddingVertical: Platform.OS === 'ios' ? 4 : 0,
        backgroundColor: 'transparent', // Убедимся, что фон прозрачный
    },
    sectionTitle: {
        color: '#ffe0f0',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    starIcon: {
        marginHorizontal: 4,
    },
    picsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center', // Выравнивание по центру
        alignItems: 'center',
        minHeight: 100, // Увеличена мин. высота
    },
    picPlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Более прозрачный фон
        marginHorizontal: 8, // Отступы между заглушками
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)', // Розовая рамка
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
    thumbnailContainer: {
        position: 'relative',
        width: 90,
        height: 90,
        marginHorizontal: 8,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#ffc0cb',
    },
    removePicButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#FF0033', // Красный для кнопки удаления
        borderRadius: 15,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    noteInputContainer: {
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Темно-розовый с прозрачностью
        borderRadius: 15,
        padding: 15,
        minHeight: 120, // Увеличена мин. высота
        borderWidth: 1,
        borderColor: 'rgba(255, 105, 180, 0.5)',
    },
    noteTextInput: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 22,
        textAlignVertical: 'top',
        height: '100%',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    toggleLabel: {
        color: '#f0e6fa',
        fontSize: 16,
        fontWeight: '600',
    },
    switchContainer: {
        width: 65,
        height: 35,
        borderRadius: 35 / 2,
        padding: 3,
    },
    switchCircle: {
        width: 29,
        height: 29,
        borderRadius: 29 / 2,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#ff3366', // Яркий розово-красный
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

export default NewFlightScreen;
