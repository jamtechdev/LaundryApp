import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DryingTimeSelectionScreen = ({ route }) => {
    const { course } = route.params;
    const navigation = useNavigation();
    const [selectedTime, setSelectedTime] = useState(null);

    const dryingOptions = Array.from({ length: 12 }, (_, i) => ({
        time: (i + 1) * 10,
        price: (i + 1) * 100
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Drying Time</Text>
            <FlatList
                data={dryingOptions}
                keyExtractor={(item) => item.time.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.timeButton, selectedTime === item.time && styles.selected]}
                        onPress={() => setSelectedTime(item.time)}
                    >
                        <Text style={styles.timeText}>{item.time} min</Text>
                        <Text style={styles.priceText}>{item.price}円</Text>
                    </TouchableOpacity>
                )}
            />
            {selectedTime && (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate("PaymentSelection", { course, selectedTime })}
                >
                    <Text style={styles.nextText}>Proceed to Payment</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    timeButton: { flex: 1, padding: 15, backgroundColor: "#ddd", margin: 5, borderRadius: 10 },
    selected: { backgroundColor: "#007bff" },
    timeText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
    priceText: { fontSize: 16, textAlign: "center", color: "#333" },
    nextButton: { marginTop: 20, padding: 15, backgroundColor: "#007bff", borderRadius: 10 },
    nextText: { fontSize: 18, fontWeight: "bold", color: "#fff", textAlign: "center" }
});

export default DryingTimeSelectionScreen;
