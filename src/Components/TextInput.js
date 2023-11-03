import { Pressable, StyleSheet,TextInput, Text, View } from "react-native";

export default function TextInputComponent({ text,secureText,value,onChangeText,placeholder }) {
    return (
        <View style={styles.textinput}>
            <Text>
                {text}
            </Text>
            <TextInput placeholder={placeholder}
            value={value}
            placeholderTextColor={'#2E2E2E'}
            onChangeText={onChangeText}
            secureTextEntry={secureText ? true :false}  />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: "#8278FC",
        borderRadius: 12,
        paddingVertical: 10
    },
    textinput:{width:'90%',borderWidth:1,borderRadius:7,
    paddingVertical:5,paddingHorizontal:10,borderColor:'#e5e5e5',marginTop:10}
})