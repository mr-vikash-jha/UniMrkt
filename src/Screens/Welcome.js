
import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../Components/Button';

export default function Welcome({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require('../Components/logo.png')} style={{width:'100%',height:200}} />
            <View style={{position:'absolute',bottom:150,width:'100%',alignItems:'center'}}>
            <Button text='Login' onPress={()=>navigation.navigate('Login')}  />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})