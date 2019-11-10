import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

import base64 from 'react-native-base64';

export default function Profile({ navigation }) {

    const [infos, setInfos] = useState({});

    async function updateInfos() {
        const response = await api.get('/profile');
        setInfos(response.data);
    }

    useEffect(() => {
        updateInfos();
    }, []);


    function navigateToNonFollowers() {
        navigation.navigate('NonFollowers');
    }



    return (
        <View style={styles.container}>
            <View style={styles.containerInfos}>
                <View style={styles.containerPicName}>
                    <Image source={{ uri: infos.profile_pic_url }} style={styles.profilePic} />
                    <Text>{infos.full_name}</Text>
                </View>
                <View style={styles.containerCountAndUpdate}>
                    <View style={styles.containerCount}>
                        <View style={styles.containerEachCount}>
                            <Text>{infos.media_count}</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={styles.containerEachCount}>
                            <Text>{infos.follower_count}</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={styles.containerEachCount}>
                            <Text>{infos.following_count}</Text>
                            <Text>Following</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={updateInfos} style={styles.buttonUpdate}>
                        <Text style={styles.buttonTextUpdate}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.containerScrollView}>
                <TouchableOpacity style={styles.buttonOptions} onPress={navigateToNonFollowers}>
                    <Text style={styles.textOptions}>Nao seguidores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Fãs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Cenas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 6</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOptions}>
                    <Text style={styles.textOptions}>Botao 7</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    containerInfos: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    containerPicName: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    containerCount: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerEachCount: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
    },
    containerCountAndUpdate: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        width: 110,
        height: 110,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#FFF',
        marginVertical: 10,
    },
    buttonUpdate: {

        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextUpdate: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    containerScrollView: {
        alignSelf: 'stretch',
        marginTop: 30
    },
    buttonOptions: {
        height: 60,
        borderTopWidth: 1,
        borderColor: '#ffe6e6',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOptions: {
        color: '#000',
        fontSize: 22,
    },
});
