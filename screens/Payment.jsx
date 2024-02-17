// import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {colors, defaultStyle} from '../styles/styles';
import Header from '../components/Header';
import { Button, RadioButton } from "react-native-paper";
import { useState } from "react";
export default function Payment({navigation, route}){
    const [paymentMethod, setPaymentMethod]= useState('COD')
    const isAuthenticated = true;
    const redirectToLogin = () => {
        navigation.navigate('login')

    }
    const codHandler = () => {

    }
    const onlineHandler = () => {

    }
    return (
        <View 
            style={defaultStyle}
        >
            <Header isBack={true}/>
            <View style={{paddingTop:  70}}>
                <Text>Payment</Text>
                <Text style={{fontWeight: "bold"}}>Method</Text>
            </View>
            <View
                style={styles.container}
            >
                <RadioButton.Group
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                >
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Cash on Delivery</Text>
                        <RadioButton color={colors.color1} value={'COD'}/>
                    </View>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>online</Text>
                        <RadioButton color={colors.color1} value={'ONLOINE'}/>
                    </View>

                </RadioButton.Group>
            </View>
            <TouchableOpacity 
                onPress={isAuthenticated? redirectToLogin : paymentMethod === "COD" ? codHandler : onlineHandler}
            >
                <Button style={styles.btn} textColor={colors.color2} icon={paymentMethod === 'COD' ?'check-circle': 'circle-multiple-outline'}>
                    {paymentMethod === 'COD' ? 'Place order' : 'Pay'}
                </Button>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.colors3,
        padding: 30,
        borderRadius: 10,
        marginVertical: 20,
        flex: 1,
        justifyContent: 'center'
    },
    radioStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    radioStyleText: {
        fontWeight: '600',
        fontSize: 18,
        textTransform: 'uppercase',
        color: colors.color2
    },
    btn: {
        backgroundColor: colors.colors3,
        borderRadius: 100,
        margin: 10,
        padding: 5
    }
})