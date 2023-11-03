import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ text,onPress }) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500' }}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: "#8278FC",
        borderRadius: 10,
        paddingVertical: 10,
        marginTop:20
    }
})