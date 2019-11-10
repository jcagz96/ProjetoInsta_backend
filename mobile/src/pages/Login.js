import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';



export default function Login({ navigation }) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    /*
    useEffect(() => {
        AsyncStorage.getItem('sessionCookie').then(sessionCookie => {
            if (sessionCookie) {
                navigation.navigate('Profile');
            }
        });
    }, []);
    */

    async function handleLogin() {
        const response = await api.post('/login', {
            username: user,
            password: password,
        });



        if (response.data.msg === 'ok') {

            console.log(` ---->  ${response.headers['set-cookie'][0].split('sessionCookies=')[1].split(';')[0]}`);

            //await AsyncStorage.setItem('sessionCookies', response.headers['set-cookie'][0].split('sessionCookies=')[1].split(';')[0]);
            // await AsyncStorage.setItem('username', user);

            navigation.navigate('Profile', { username: user, sessao: response.headers['set-cookie'][0].split('sessionCookies=')[1].split(';')[0] });

            // Decidir:   guardar username no asyncStorage? guardar cookies no async storage ou enviar pelo navigation ?
        }

    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'android' || 'ios'} behavior="padding" style={styles.container}>

            <Image source={logo} />

            <View style={styles.form}>
                <TextInput
                    placeholder="username"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    value={user}
                    onChangeText={setUser}
                />

                <TextInput
                    placeholder="password"
                    placeholderTextColor="#999"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        height: 46,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});