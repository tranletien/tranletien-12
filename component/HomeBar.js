import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../CartProvider/CartContext';


function HomeBar() {
    const { cartItems } = useContext(CartContext);
    const navigation = useNavigation();
    const handleHomePress = () => {
        navigation.navigate('HomeScreen');
    };
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    const handleCartPress = (cartItems) => {
        navigation.navigate('Cart', { cartItems });
    
    };
    const handleSearchPress = () => {
        navigation.navigate('Search');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => handleHomePress()}>
                <Icon name="home" size={20} color="#333333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleSearchPress()}>
                <Icon name="search" size={20} color="#333333" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.item} onPress={() => handleLoginPress()}>
                <Icon name="user" size={20} color="#333333" />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.item} onPress={() => handleCartPress(cartItems)}>
                <Icon name="shopping-cart" size={20} color="#333333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        height: 50,
    },
    button: {
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    activeMenuItem: {
        backgroundColor: '#e0e0e0',
    },
});

export default HomeBar;