import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import {addMeal} from "../redux/slices/mealsSlice";


const StarRating = ({ rating, onChange }) => (
    <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => onChange(s)}>
                <Text style={styles.star}>{s <= rating ? '⭐️' : '☆'}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default function MealForm() {
    const dispatch = useDispatch();
    const [flight, setFlight] = useState('');
    const [type, setType] = useState('Drinks');
    const [taste, setTaste] = useState(0);
    const [presentation, setPresentation] = useState(0);
    const [photo, setPhoto] = useState(null);

    const handleSave = () => {
        const mealData = {
            id: Date.now(),
            flight,
            type,
            taste,
            presentation,
            photo,
        };
        dispatch(addMeal(mealData));
        setFlight('');
        setTaste(0);
        setPresentation(0);
        setPhoto(null);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Enter Flight</Text>
            <TextInput
                style={styles.input}
                value={flight}
                onChangeText={setFlight}
                placeholder="Flight number"
            />

            <View style={styles.tabRow}>
                {['Drinks', 'Meals', 'Snacks'].map((t) => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => setType(t)}
                        style={[styles.tab, type === t && styles.activeTab]}
                    >
                        <Text style={styles.tabText}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Add Photo</Text>
            </View>

            <Text style={styles.label}>Taste</Text>
            <StarRating rating={taste} onChange={setTaste} />
            <Text style={styles.label}>Presentation</Text>
            <StarRating rating={presentation} onChange={setPresentation} />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffb6c1',
        padding: 12,
        borderRadius: 16,
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 6,
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    tab: {
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#fca5a5',
    },
    activeTab: {
        backgroundColor: '#ec4899',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imagePlaceholder: {
        height: 100,
        backgroundColor: '#ffc0cb',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 8,
    },
    placeholderText: {
        color: '#fff',
        fontStyle: 'italic',
    },
    stars: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 20,
        marginHorizontal: 2,
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: '#ff0033',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
