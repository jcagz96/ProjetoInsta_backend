import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';



export default function Login({ navigation }) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        const response = await api.post('/login', {
            username: user,
            password: password,
        });

        console.log('Bem-vindo, ', response.data.msg);

        if (response.data.msg === 'ok') {
            navigation.navigate('Profile');

            // Decidir:   guardar username no asyncStorage? guardar cookies no async storage ou enviar pelo navigation ?
        }
    }

    return (
        <View style={styles.container}>

            <Image source={logo} />

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

            <TouchableOpacity onPress={handleLogin}>
                <Text>ola</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,


    },
});