import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const postUserData = (name, value) => {
        setUserData({ ...userData, [name]: value });
    };

    const submitData = async () => {
        const { name, email, message } = userData;

        const currentDate = new Date();
        const date = currentDate.toLocaleTimeString();
        const currentDateString = currentDate.toLocaleDateString();

        try {
            const response = await axios.post(
                'FIREBASE_JSON_URL_LINK',
                {
                    name,
                    email,
                    message,
                }
            );

            if (response.status === 200) {
                alert('Data Stored Successfully');
                setUserData({
                    name: '',
                    email: '',
                    message: '',
                });
            }
        } catch (err) {
            alert('Something Went Wrong');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <View style={styles.formGroup}>
                <Text style={styles.formText}>Full Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => postUserData('name', value)}
                    value={userData.name}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.formText}>Email:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => postUserData('email', value)}
                    value={userData.email}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.formText}>Message:</Text>
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    onChangeText={(value) => postUserData('message', value)}
                    value={userData.message}
                    multiline
                />
            </View>
            <View style={styles.submitSection}>
                <TouchableOpacity style={styles.submitButton} onPress={submitData}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#000',
        marginBottom: 30,
    },
    formGroup: {
        marginBottom: 20,
    },
    formText: {
        color: '#000',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#ddd',
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 16,
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: '#000',
        width: '90%',
        padding: 15,
        borderRadius: 4,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default App;
