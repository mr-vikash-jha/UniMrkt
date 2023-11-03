import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Alert } from 'react-native';

export default function AddStudy({ navigation }) {
    const route = useRoute();
    const {token} = route.params;
    const [inputValue, setInputValue] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            Alert.alert('Validation Error', 'Please enter a study type');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('https://dev-unipanel-api.azurewebsites.net/api/dummyuser/createStudyType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    studyType: inputValue,
                }),
            });
            if (response.ok) {
                // Study type created successfully
                setInputValue(''); // Clear the input field
                setLoading(false);
                navigation.navigate('Home',{token:token})
            } else {
                // Handle error response
                const errorResponse = await response.json();
                Alert.alert('Error', errorResponse.message);
                setLoading(false);
            }
        } catch (error) {
            Alert.alert('An error occurred while creating the study type');
            setLoading(false);
        }
    };

    const isSubmitDisabled = inputValue === '';

    return (
        <View style={styles.container}>
            <Image source={require('../Components/logo.png')} style={{ width: '100%', height: 200 }} />
            <View style={{ marginTop: 50, paddingLeft: 30 }}>
                <Text style={styles.loginText}>Add Study Type</Text>
                <Text style={{ fontSize: 12, width: '75%', color: '#2E2E2E', marginTop: 10 }}>
                    and tell us something about yourself in as many points as you would want to
                </Text>
                <TextInput
                    placeholder='Your inputs here...'
                    style={styles.textinput}
                    onChangeText={handleInputChange}
                    value={inputValue}
                />
            </View>
            <View style={{ marginTop: 100, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={{ fontSize: 15, color: '#2A1BD3' }}>{'<'} Go Back</Text>
                </Pressable>
                {loading ?
                <Pressable  style={[styles.button, { backgroundColor: isSubmitDisabled ? '#B7B7B7' : '#8278FC' }]} disabled={isSubmitDisabled}>
                <Text style={{ fontSize: 16, color: isSubmitDisabled ? '#5E5E5E' : '#fff' }}>Submitting {'>'}</Text>
            </Pressable>
            :
                <Pressable onPress={handleSubmit} style={[styles.button, { backgroundColor: isSubmitDisabled ? '#B7B7B7' : '#8278FC' }]} disabled={isSubmitDisabled}>
                    <Text style={{ fontSize: 16, color: isSubmitDisabled ? '#5E5E5E' : '#fff' }}>Submit {'>'}</Text>
                </Pressable>
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
        width: '40%',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        backgroundColor: '#F4F4FC'
    },
    textinput: {
        width: '90%',
        borderWidth: 1,
        color: '#000',
        fontSize: 14,
        borderRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#e5e5e5',
        marginTop: 20,
    },
});
