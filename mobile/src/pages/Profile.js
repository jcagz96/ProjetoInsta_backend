import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

import base64 from 'react-native-base64';

export default function Profile({ navigation }) {

    const [infos, setInfos] = useState({});


    // useEffect(() => {
    //     AsyncStorage.getItem('sessionCookies').then(sessionCookies => {
    //         console.log(sessionCookies);
    //         const response = api.get('/profile', {
    //             headers: {
    //                 session_cookies: sessionCookies,
    //             },
    //         });
    //         console.log(response);
    //     });
    // }, []);

    async function botao() {
        const response = await api.get('/profile');


        console.log(`mmmmmmm ${JSON.stringify(response)}`);
        const str = JSON.stringify(response);
        const obj = JSON.parse(str);
        console.log(`responsa   ${obj.data.media_count}`);

        setInfos(response.data);

    }

    useEffect(() => {

        botao();
    }, []);





    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: infos.profile_pic_url }} style={{ width: 40, height: 40 }} />
                <Text>{infos.full_name}</Text>
            </View>
            <View>
                <Text>{infos.media_count}</Text>
                <Text>{infos.follower_count}</Text>
                <Text>{infos.following_count}</Text>
            </View>
            <TouchableOpacity onPress={botao}>
                <Text>Atualizar</Text>
            </TouchableOpacity>
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
