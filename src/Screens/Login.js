import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Alert } from 'react-native';
import Button from '../Components/Button';
import TextInputComponent from '../Components/TextInput';

export default function Login({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = React.useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter email and password');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('https://dev-unipanel-api.azurewebsites.net/api/user/loginPanelist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '/',
                },
                body: JSON.stringify({
                    panelGuid: '75a22a9e-d0e4-4547-af6b-6156bb0760eb',
                    email: email,
                    password: password,
                }),
            });

            // Await the response to be parsed as JSON
            const response = await res.json();
            if (response.success) {
               await setToken(response.token.refresh.token);
                setTimeout(() => {

                    if (token !== '') {
                        navigation.navigate('AddStudy', { token: token });
                    }
                }, 1000);
                navigation.navigate('AddStudy', { token: response.token.refresh.token });
                setLoading(false);
                // Login was successful, you can navigate to the next screen

            } else {
                Alert.alert('Login Failed', response.message);
                setLoading(false);
            }
        } catch (error) {
            Alert.alert('An error occurred while logging in');
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../Components/logo.png')} style={{ width: '100%', height: 200 }} />
            <View style={{ marginTop: 50, paddingLeft: 30 }}>
                <Text style={styles.loginText}>Login </Text>
                <TextInputComponent
                    text={'Email ID'}
                    placeholder='•••'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInputComponent
                    text={'Password'}
                    placeholder='•••'
                    value={password}
                    onChangeText={setPassword}
                    secureText={true}
                />
            </View>
            <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={{ fontSize: 18, color: '#2A1BD3', fontWeight: '500' }}>
                        Cancel
                    </Text>
                </Pressable>
                {loading ?
                    <Button text='Logging in...' />
                    :

                    <Button text='Login' onPress={handleLogin} />
                }
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
        color: '#1E1E1E',
    },
    button: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: "#F4F4FC",
        borderRadius: 10,
        paddingVertical: 10,
    },
});
