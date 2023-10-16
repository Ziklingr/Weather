import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Weather from './Weather';

export default function Position() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);
            try {
                if (status !== 'granted') {
                    setMessage('Permission to access location was denied');
                } else {
                    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setMessage('Location retrieved');
                }
            } catch (error) {
                setMessage("error");
                console.log(error);
            }
            setIsLoading(false);
        })();
    }, []);
    if (isLoading) {
        return <View style={styles.container}><Text>Retviewing location...</Text></View>
    } else {

    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            <Weather latitude={latitude} longitude={longitude} />
            
        </View>
    )
    };
}

const styles = StyleSheet.create({
    coords: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
});
