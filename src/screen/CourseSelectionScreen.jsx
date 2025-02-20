import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COURSE_DATA from "../utils/coursedata";

const CourseSelectionScreen = () => {
    const [courses, setCourses] = useState(COURSE_DATA);
    const navigation = useNavigation();

    const handleCourseSelect = (course) => {
        if (course.devicetype === "2") { // If it's a drying machine
            navigation.navigate("DryingTimeSelection", { course });
        } else {
            navigation.navigate("PaymentSelection", { course });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Course</Text>
            <FlatList
                data={courses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.courseItem}
                        onPress={() => handleCourseSelect(item)}
                    >
                        <Text style={styles.courseText}>{item.devicecourcename}</Text>
                        <Text style={styles.details}>{item.fee}円 / {item.operatingtime} min</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    courseItem: { padding: 15, backgroundColor: "#007bff", marginVertical: 8, borderRadius: 10 },
    courseText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    details: { fontSize: 16, color: "#ddd" }
});

export default CourseSelectionScreen;
