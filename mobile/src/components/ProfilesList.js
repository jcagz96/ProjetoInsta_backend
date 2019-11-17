import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import api from '../services/api';

export default function ProfilesList({ rota }) {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        async function loadItems() {
            const response = await api.get(`${rota}`);
            setProfiles(response.data.msg);
        }

        loadItems();
    }, [rota]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de perfis que nao me seguem de volta: {rota}</Text>

            <FlatList
                style={styles.list}
                data={profiles}
                keyExtractor={profile => profile.username}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.profilePic} source={{ uri: item.profile_pic_url }} />
                        <Text>{item.username}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginBottom: 10,
    },
    profilePic: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
    },

});