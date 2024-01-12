import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../CartProvider/CartContext';
// import SearchScreen from './searchScreen';


export default function HomeScreen() {
    const { addToCart } = useContext(CartContext);
    const navigation = useNavigation();
  
    const handleProductPress = (product) => {
      navigation.navigate('SingleProduct', { product });
    };
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getAllProduct();
    }, []);
  
    const getAllProduct = () => {
      axios
        .get('https://fakestoreapi.com/products')
        .then(function (response) {
          // handle success
          setProducts(response.data);
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        });
    };
    const handleAddToCartPress = (product) => {
        addToCart(product);
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      };

  
    return (
      <View>
        {/* <Text style={styles.title}>Welcome to My Shop</Text> */}
          <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          // Add your search functionality here
        /> 
        <View style={styles.catetitle}>
          <Text style={{ fontSize: 20, color: 'red', fontWeight: 100 }}>Sản phẩm</Text>
          {/* <Text style={{ fontSize: 15 }}>Xem thêm</Text> */}
          {/* <SearchScreen/> */}
        </View>
        <ScrollView>
          <View style={styles.container}>
            {products.map((product) => (
              <TouchableOpacity
                style={styles.item}
                key={product.id}
                onPress={() => handleProductPress(product)}
              >
                <View>
                  <Image style={styles.img} source={{ uri: product.image }} />
                </View>
                <View style={styles.des}>
                  <Text style={styles.des_text}>{product.title}</Text>
                  <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>Rating: </Text>
                    <FontAwesome name="star" style={styles.starIcon} />
                    <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
                    <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
                  </View>
                  <View>
                  {/* <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => handleAddToCartPress(product)}
                  >
                    <Text style={styles.buttonText}>Cart</Text>
                  </TouchableOpacity> */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

const styles = StyleSheet.create({
  searchInput:{
    paddingTop:10,
  },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    catetitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    item: {
        width: '48%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    img: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    des: {
        padding: 8,
    },
    des_text: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    ratingText: {
        color: 'black',
    },
    starIcon: {
        color: 'gold',
        fontSize: 16,
        marginRight: 2,
    },
    ratingValue: {
        color: 'black',
        marginRight: 2,
    },
    ratingCount: {
        color: 'black',
    },
    cartButton: {
        flex: 1,
        marginLeft: 4,
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
});