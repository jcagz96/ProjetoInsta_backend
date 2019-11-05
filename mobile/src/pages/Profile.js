import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Profile() {

    const [infos, setInfos] = useState({});

    useEffect(() => {
        AsyncStorage.getItem('sessionCookies').then(sessionCookies => {
            console.log(sessionCookies);
            const response = api.get('/profile', {
                headers: {
                    session_cookies: sessionCookies,
                },
            });
            console.log(response);
        });
    }, []);


    useEffect(() => {
        async function loadSession() {
            const sessao = await AsyncStorage.getItem('sessionCookies');
            return sessao;
        }

        async function loadProfile(parametro) {
            const response = await api.get('/profile', {
                headers: {
                    session_cookies: parametro,
                },
            });
            console.log(response);
        }

        const test = loadSession();
        loadProfile(test);

    }, []);


    return (
        <View style={styles.container}>
            <View>
                <Image source={logo} />
                <Text>joaogarcez8</Text>
            </View>
            <View>
                <Text>Posts</Text>
                <Text>Seguidores</Text>
                <Text>Seguindo</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
