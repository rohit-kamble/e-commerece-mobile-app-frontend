import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import Footer from "../components/Footer";

export default function ForgotPassword ({navigation}){
    const [email, setEmail] = useState('');
    const loading = true;
    const submitHandler = () => {
        alert('login')
        navigation.navigate('verify')
    }
    return (
        <>
        <View style={defaultStyle}>
            <View style={{marginBottom: 20}}>
                <Text style={styles.heading}>Forgot Password</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                    mode="outlined" 
                    activeOutlineColor={colors.color1} 
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                    style={inputStyling}
                />
                <Button 
                    textColor={colors.color2}
                    disabled={email === ""}
                    style={styles.btn}
                    onPress={submitHandler}
                    loading={loading}
                >
                    Send OTP
                </Button>
                <Text style={styles.or}>OR</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                    <Text style={styles.link}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <Footer activeRoute="profile"/>
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: "500",
        textAlign: 'center',
        backgroundColor: colors.color1,
        color: colors.color2,
        padding:5,
        borderRadius: 5
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.colors3,
        borderRadius:10,
        justifyContent: 'center'
    },
    forget: {
        color: colors.color2,
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'flex-end',
        fontWeight: "100",
        textAlign: "right",
    },
    btn: {
        backgroundColor: colors.color1,
        margin: 20,
        padding: 6,
        color: colors.color2
    },
    or: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: "100",
        color: colors.color2
    },
    link: {
        alignSelf: "center",
        color: colors.color2,
        fontSize: 18,
        textTransform: 'uppercase',
        marginHorizontal: 20,
        marginVertical: 10
    }
})