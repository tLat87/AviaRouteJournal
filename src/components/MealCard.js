import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function MealCard({ meal }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{meal.type} on {meal.flight}</Text>
            <Text>⭐ Taste: {meal.taste}</Text>
            <Text>🎨 Presentation: {meal.presentation}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fde68a',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
});
