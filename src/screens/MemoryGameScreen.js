// import React, { useState, useEffect, useRef } from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     SafeAreaView,
//     Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5'; // Для иконки трофея
//
// // Массив изображений самолетов (должны быть 6 уникальных пар)
// const gameImages = [
//     require('../assets/img/game/4cff1fe4e33a86bbb4c035e496e18e0019081191.png'),
//     require('../assets/img/game/5c6c0a5e6e22f7446ca28b4963be2f35bf07394f.png'),
//     require('../assets/img/game/99210e2e2ad9ae87135c8c622bd63de945354bf4.png'),
//     require('../assets/img/game/b7132f498e4bc6a5c3e0866af4790713579b6afb.png'),
//     require('../assets/img/game/ba07a3c789498f5fc2659f430cb5224fab8013b0.png'),
//     require('../assets/img/game/bb2a2b9bd55672c59851af3ddcce8b289702f477.png'),
// ];
//
// // Изображение для закрытой карточки (облака)
// const cloudsImage = require('../assets/img/6f959c3c71810afdb9cca6683dd15185dbfcf3a2.png');
//
// // Функция для перемешивания массива
// const shuffleArray = (array) => {
//     const newArray = [...array];
//     for (let i = newArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }
//     return newArray;
// };
//
// const MemoryGameScreen = () => {
//     const [board, setBoard] = useState([]); // Состояние игрового поля
//     const [flippedCards, setFlippedCards] = useState([]); // Открытые карточки
//     const [matchedCards, setMatchedCards] = useState([]); // Найденные пары
//     const [moves, setMoves] = useState(0); // Количество ходов (можно использовать для подсчета)
//     const [time, setTime] = useState(0); // Время игры
//     const [isRunning, setIsRunning] = useState(false); // Запущен ли таймер
//     const timerRef = useRef(null); // Ссылка на интервал таймера
//     const [trophies, setTrophies] = useState(0); // Количество трофеев (найденных пар)
//
//     // Инициализация игры
//     useEffect(() => {
//         initializeGame();
//         return () => clearInterval(timerRef.current); // Очистка таймера при размонтировании
//     }, []);
//
//     // Таймер игры
//     useEffect(() => {
//         if (isRunning) {
//             timerRef.current = setInterval(() => {
//                 setTime((prevTime) => prevTime + 1);
//             }, 1000);
//         } else if (!isRunning && timerRef.current) {
//             clearInterval(timerRef.current);
//         }
//         return () => clearInterval(timerRef.current);
//     }, [isRunning]);
//
//     // Проверка на конец игры
//     useEffect(() => {
//         if (matchedCards.length === gameImages.length * 2) {
//             setIsRunning(false);
//             console.log('Game Over! All pairs found.');
//         }
//     }, [matchedCards]);
//
//     const initializeGame = () => {
//         // Создаем пары изображений
//         const pairs = [...gameImages, ...gameImages];
//         // Добавляем уникальный id и статус к каждой карточке
//         const initialBoard = shuffleArray(pairs).map((image, index) => ({
//             id: index,
//             image: image,
//             isFlipped: false,
//             isMatched: false,
//         }));
//         setBoard(initialBoard);
//         setFlippedCards([]);
//         setMatchedCards([]);
//         setMoves(0);
//         setTime(0);
//         setIsRunning(false); // Запускаем таймер при первом клике, или через кнопку Start
//         setTrophies(0);
//     };
//
//     const handleCardPress = (clickedCard) => {
//         if (!isRunning) {
//             setIsRunning(true); // Запускаем таймер при первом клике
//         }
//
//         if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
//             return; // Нельзя кликать по открытым, найденным или когда уже 2 открыты
//         }
//
//         const newBoard = board.map((card) =>
//             card.id === clickedCard.id ? { ...card, isFlipped: true } : card
//         );
//         setBoard(newBoard);
//
//         const newFlippedCards = [...flippedCards, clickedCard];
//         setFlippedCards(newFlippedCards);
//
//         // Проверяем совпадение, если открыто 2 карточки
//         if (newFlippedCards.length === 2) {
//             const [card1, card2] = newFlippedCards;
//             setMoves((prevMoves) => prevMoves + 1); // Увеличиваем счетчик ходов
//
//             if (card1.image === card2.image) {
//                 // Совпадение найдено
//                 setMatchedCards((prevMatched) => [...prevMatched, card1.id, card2.id]);
//                 setTrophies((prevTrophies) => prevTrophies + 1); // Увеличиваем количество трофеев
//                 setFlippedCards([]); // Сбрасываем открытые карточки
//             } else {
//                 // Нет совпадения, закрываем карточки через секунду
//                 setTimeout(() => {
//                     setBoard(
//                         newBoard.map((card) =>
//                             card.id === card1.id || card.id === card2.id
//                                 ? { ...card, isFlipped: false }
//                                 : card
//                         )
//                     );
//                     setFlippedCards([]);
//                 }, 1000);
//             }
//         }
//     };
//
//     const formatTime = (totalSeconds) => {
//         const minutes = Math.floor(totalSeconds / 60);
//         const seconds = totalSeconds % 60;
//         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.container}>
//                 {/* Верхняя часть с временем */}
//                 <View style={styles.topBar}>
//                     <Text style={styles.timeText}>{formatTime(time)}</Text>
//                     {/* Можно добавить второй таймер, как на скрине, если это важно */}
//                     {/* <Text style={styles.timeText}>0:02</Text> */}
//                 </View>
//
//                 {/* Игровое поле */}
//                 <View style={styles.gameBoard}>
//                     {board.map((card) => (
//                         <TouchableOpacity
//                             key={card.id}
//                             style={styles.cardContainer}
//                             onPress={() => handleCardPress(card)}
//                             activeOpacity={0.7}
//                         >
//                             <View
//                                 style={[
//                                     styles.card,
//                                     (card.isFlipped || card.isMatched) && styles.cardFlipped,
//                                     card.isMatched && styles.cardMatched, // Дополнительный стиль для найденных пар
//                                 ]}
//                             >
//                                 <Image
//                                     source={(card.isFlipped || card.isMatched) ? card.image : cloudsImage}
//                                     style={styles.cardImage}
//                                     resizeMode="contain"
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//
//                 {/* Нижняя часть с самолетом и кнопкой/трофеями */}
//                 <View style={styles.bottomSection}>
//                     <Image
//                         source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} // Большая картинка самолета снизу
//                         style={styles.largePlaneImage}
//                         resizeMode="contain"
//                     />
//
//                     {/* Кнопка Start/Reset или Трофеи */}
//                     {matchedCards.length === gameImages.length * 2 ? (
//                         <View style={styles.trophyContainer}>
//                             <Icon name="trophy" size={24} color="#FFD700" />
//                             <Text style={styles.trophyText}>{trophies}</Text>
//                         </View>
//                     ) : (
//                         <TouchableOpacity style={styles.startButton} onPress={initializeGame}>
//                             <Text style={styles.startButtonText}>Start</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: 'black',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'black',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingTop: Platform.OS === 'android' ? 40 : 0, // Отступ для Android status bar
//     },
//     topBar: {
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-around', // Распределить время по краям
//         paddingHorizontal: 20,
//         paddingTop: 10,
//     },
//     timeText: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: 'white',
//         width: '40%', // Примерно как на скрине
//         textAlign: 'center',
//     },
//     gameBoard: {
//         width: '90%',
//         aspectRatio: 1, // Чтобы доска была квадратной
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         backgroundColor: '#dc3545', // Красный фон сетки
//         borderRadius: 15,
//         padding: 10,
//         borderColor: '#007bff', // Синяя рамка
//         borderWidth: 5,
//         marginBottom: 20,
//     },
//     cardContainer: {
//         width: '23%', // 4 карточки в ряду (100% / 4 = 25%, минус отступы)
//         aspectRatio: 1, // Карточка квадратная
//         margin: '1%', // Небольшой отступ между карточками
//     },
//     card: {
//         flex: 1,
//         backgroundColor: 'white', // Цвет по умолчанию для закрытой карточки
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor: '#007bff', // Синяя рамка
//         borderWidth: 2,
//         overflow: 'hidden', // Для borderRadius на Image
//     },
//     cardFlipped: {
//         backgroundColor: 'white', // Белый фон для открытой карточки
//     },
//     cardMatched: {
//         // Можно добавить что-то, чтобы показать, что карточка найдена, но она уже будет открыта
//         // Например, легкое затемнение или другая рамка
//         // opacity: 0.7,
//     },
//     cardImage: {
//         width: '80%',
//         height: '80%',
//     },
//     bottomSection: {
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'flex-end', // Выравнивание самолета внизу
//         flex: 0.8, // Занимает часть нижнего пространства
//         position: 'relative', // Для позиционирования кнопки/трофея
//     },
//     largePlaneImage: {
//         width: '100%', // Самолет занимает всю ширину
//         height: '100%',
//         position: 'absolute', // Позиционируем абсолютно
//         bottom: 0,
//     },
//     startButton: {
//         backgroundColor: '#dc3545', // Красная кнопка
//         paddingVertical: 15,
//         paddingHorizontal: 50,
//         borderRadius: 30,
//         alignItems: 'center',
//         marginBottom: Platform.OS === 'android' ? 30 : 50, // Отступ от низа
//         zIndex: 10, // Чтобы кнопка была над самолетом
//         position: 'absolute', // Позиционируем абсолютно
//         bottom: 0, // Внизу
//     },
//     startButtonText: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     trophyContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.7)', // Темный фон для трофея
//         borderRadius: 20,
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         marginBottom: Platform.OS === 'android' ? 30 : 50,
//         zIndex: 10,
//         position: 'absolute',
//         bottom: 0,
//     },
//     trophyText: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginLeft: 10,
//     },
// });
//
// export default MemoryGameScreen;

import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Platform,
} from 'react-native';
// Removed: import Icon from 'react-native-vector-icons/FontAwesome5'; // No vector icons

// Array of game images (should be 6 unique pairs)
const gameImages = [
    require('../assets/img/game/4cff1fe4e33a86bbb4c035e496e18e0019081191.png'),
    require('../assets/img/game/5c6c0a5e6e22f7446ca28b4963be2f35bf07394f.png'),
    require('../assets/img/game/99210e2e2ad9ae87135c8c622bd63de945354bf4.png'),
    require('../assets/img/game/b7132f498e4bc6a5c3e0866af4790713579b6afb.png'),
    require('../assets/img/game/ba07a3c789498f5fc2659f430cb5224fab8013b0.png'),
    require('../assets/img/game/bb2a2b9bd55672c59851af3ddcce8b289702f477.png'),
];

// Image for the closed card (clouds)
const cloudsImage = require('../assets/img/6f959c3c71810afdb9cca6683dd15185dbfcf3a2.png');

// Function to shuffle an array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const MemoryGameScreen = () => {
    const [board, setBoard] = useState([]); // Game board state
    const [flippedCards, setFlippedCards] = useState([]); // Flipped cards
    const [matchedCards, setMatchedCards] = useState([]); // Matched pairs
    const [moves, setMoves] = useState(0); // Number of moves
    const [time, setTime] = useState(0); // Game time
    const [isRunning, setIsRunning] = useState(false); // Is timer running
    const timerRef = useRef(null); // Timer interval reference
    const [trophies, setTrophies] = useState(0); // Number of trophies (matched pairs)

    // Game initialization
    useEffect(() => {
        initializeGame();
        return () => clearInterval(timerRef.current); // Clear timer on unmount
    }, []);

    // Game timer
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    // Check for game end
    useEffect(() => {
        if (matchedCards.length === gameImages.length * 2) {
            setIsRunning(false);
            console.log('Game Over! All pairs found.');
        }
    }, [matchedCards]);

    const initializeGame = () => {
        // Create image pairs
        const pairs = [...gameImages, ...gameImages];
        // Add unique id and status to each card
        const initialBoard = shuffleArray(pairs).map((image, index) => ({
            id: index,
            image: image,
            isFlipped: false,
            isMatched: false,
        }));
        setBoard(initialBoard);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0);
        setIsRunning(false); // Start timer on first click, or via Start button
        setTrophies(0);
    };

    const handleCardPress = (clickedCard) => {
        if (!isRunning) {
            setIsRunning(true); // Start timer on first click
        }

        if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
            return; // Cannot click on flipped, matched, or when 2 are already open
        }

        const newBoard = board.map((card) =>
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );
        setBoard(newBoard);

        const newFlippedCards = [...flippedCards, clickedCard];
        setFlippedCards(newFlippedCards);

        // Check for match if 2 cards are open
        if (newFlippedCards.length === 2) {
            const [card1, card2] = newFlippedCards;
            setMoves((prevMoves) => prevMoves + 1); // Increment moves counter

            if (card1.image === card2.image) {
                // Match found
                setMatchedCards((prevMatched) => [...prevMatched, card1.id, card2.id]);
                setTrophies((prevTrophies) => prevTrophies + 1); // Increment trophy count
                setFlippedCards([]); // Reset flipped cards
            } else {
                // No match, close cards after a second
                setTimeout(() => {
                    setBoard(
                        newBoard.map((card) =>
                            card.id === card1.id || card.id === card2.id
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Top section with time */}
                <View style={styles.topBar}>
                    <Text style={styles.timeLabel}>Time:</Text>
                    <Text style={styles.timeValue}>{formatTime(time)}</Text>
                    <Text style={styles.movesLabel}>Moves:</Text>
                    <Text style={styles.movesValue}>{moves}</Text>
                </View>

                {/* Game board */}
                <View style={styles.gameBoard}>
                    {board.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            style={styles.cardContainer}
                            onPress={() => handleCardPress(card)}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    styles.card,
                                    (card.isFlipped || card.isMatched) && styles.cardFlipped,
                                    card.isMatched && styles.cardMatched, // Additional style for matched pairs
                                ]}
                            >
                                <Image
                                    source={(card.isFlipped || card.isMatched) ? card.image : cloudsImage}
                                    style={styles.cardImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom section with plane and button/trophies */}
                <View style={styles.bottomSection}>
                    <Image
                        source={require('../assets/img/b4c6ec317b891be6a4dfd6c1e4a27eb3e9735236.png')} // Large plane image at the bottom
                        style={styles.largePlaneImage}
                        resizeMode="contain"
                    />

                    {/* Start/Reset Button or Trophies */}
                    {matchedCards.length === gameImages.length * 2 ? (
                        <View style={styles.trophyContainer}>
                            <Text style={styles.trophyIcon}>🏆</Text> {/* Using emoji for trophy */}
                            <Text style={styles.trophyText}>{trophies}</Text>
                            <TouchableOpacity style={styles.resetButton} onPress={initializeGame}>
                                <Text style={styles.resetButtonText}>Play Again</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.startButton} onPress={initializeGame}>
                            <Text style={styles.startButtonText}>Start Game</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 40 : 0, // Top padding for Android status bar
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute time and moves
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 105, 180, 0.1)', // Light transparent pink bar
        borderRadius: 15,
        marginVertical: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    timeLabel: {
        fontSize: 18,
        color: '#f0e6fa', // Light lavender
        fontWeight: '600',
    },
    timeValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White for value
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    movesLabel: {
        fontSize: 18,
        color: '#f0e6fa', // Light lavender
        fontWeight: '600',
    },
    movesValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White for value
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    gameBoard: {
        width: '95%', // Slightly wider board
        aspectRatio: 1, // Square board
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 105, 180, 0.2)', // Transparent pink background for board
        borderRadius: 20, // More rounded corners
        padding: 10,
        borderWidth: 2,
        borderColor: '#ff69b4', // Hot pink border
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    cardContainer: {
        width: '23%', // 4 cards per row (100% / 4 = 25%, minus margins)
        aspectRatio: 1, // Square card
        margin: '1%', // Small margin between cards
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white for closed card
        borderRadius: 10, // More rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 105, 180, 0.5)', // Transparent pink border
        overflow: 'hidden', // For borderRadius on Image
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    cardFlipped: {
        backgroundColor: '#fff', // White background for flipped card
        borderColor: '#e0b0ff', // Light purple border when flipped
    },
    cardMatched: {
        opacity: 0.7, // Slightly fade matched cards
        borderColor: '#8bc34a', // Green border for matched cards
    },
    cardImage: {
        width: '85%', // Slightly larger image within card
        height: '85%',
    },
    bottomSection: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align plane at the bottom
        flex: 0.8, // Takes up part of the bottom space
        position: 'relative', // For positioning button/trophy
    },
    largePlaneImage: {
        width: '100%', // Plane takes full width
        height: '100%',
        position: 'absolute', // Absolute positioning
        bottom: 0,
        opacity: 0.5, // Make plane slightly transparent
    },
    startButton: {
        backgroundColor: '#ff3366', // Vibrant red/pink button
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: Platform.OS === 'android' ? 30 : 50, // Bottom margin
        zIndex: 10, // Button above the plane
        position: 'absolute', // Absolute positioning
        bottom: 0, // At the bottom
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
    startButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Uppercase text
        letterSpacing: 1,
    },
    trophyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 105, 180, 0.4)', // Transparent pink background for trophy display
        borderRadius: 25, // More rounded
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: Platform.OS === 'android' ? 30 : 50,
        zIndex: 10,
        position: 'absolute',
        bottom: 0,
        borderWidth: 1,
        borderColor: '#ffc0cb', // Light pink border
        ...Platform.select({
            ios: {
                shadowColor: '#ff69b4',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    trophyIcon: {
        fontSize: 30, // Larger emoji
        marginRight: 10,
    },
    trophyText: {
        color: 'white',
        fontSize: 22, // Larger text
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    resetButton: { // Style for the "Play Again" button
        backgroundColor: '#8e2de2', // A different shade of purple/pink for reset
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15, // Space above the button
        ...Platform.select({
            ios: {
                shadowColor: '#8e2de2',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
});

export default MemoryGameScreen;
