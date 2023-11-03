import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';

export default function Home({ navigation, }) {
    const [items, setItems] = useState([]);
    const route = useRoute();
    const {token} = route.params;
    useEffect(() => {
        // Fetch data from the API with the token in the headers
        fetch('https://dev-unipanel-api.azurewebsites.net/api/dummyuser/getStudyType', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the Authorization header with the token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setItems(data.data.reverse())})
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={{flex:0.8,}}>
            <Image source={require('../Components/logo.png')} style={{ width: '100%', height: 200 }} />
            <View style={{ marginTop: 50, paddingLeft: 30 }}>
                <Text style={styles.loginText}>List of items added</Text>
                <Text style={{ fontSize: 12, width: '75%', color: '#000', marginTop: 10 }}>
                    You have shared your response as below:
                </Text>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.itemText}>{item.studyType}</Text>
                        </View>
                    )}
                />
            </View>
            </View>
            <View style={{flex:0.2,marginTop:300,
                 mwidth: '100%', alignItems: 'center', flexDirection: 'row',
                justifyContent: 'space-around'
            }}>

                <Pressable onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={{ fontSize: 15, color: '#2A1BD3', }}>
                        {'<'} Go Back
                    </Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: '#B7B7B7' }]}>
                    <Text style={{ fontSize: 16, color: '#5E5E5E', }}>
                        Proceed {'>'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        width: '40%',
        alignItems: 'center',
        backgroundColor: "#F4F4FC",
        borderRadius: 10,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop:5,
    },
    bullet: {
        fontSize: 14,
        color: '#000',
        marginRight: 5,
    },
    itemText: {
        fontSize: 14,
        color: '#000',
    },
});
