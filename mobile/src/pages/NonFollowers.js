import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import ProfilesList from '../components/ProfilesList';

export default function NonFollowers() {
    return (
        <ProfilesList rota="/nonfollowers" />
    );
}
