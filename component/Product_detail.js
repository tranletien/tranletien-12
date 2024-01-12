import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../CartProvider/CartContext';
import { ScrollView } from 'react-native';


const SingleProductScreen = () => {
  const route = useRoute();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { updateCartItemCount } = useContext(CartContext);
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItemsData = await AsyncStorage.getItem('cartItems');
        const existingCartItems = cartItemsData ? JSON.parse(cartItemsData) : [];
        console.log('Existing Cart Items:', existingCartItems);
      } catch (error) {
        console.log('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(parseInt(value), 1);
    setQuantity(newQuantity);
  };

  const handleBuyNow = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      const existingCartItems = cartItemsData ? JSON.parse(cartItemsData) : [];
  
      const existingItemIndex = existingCartItems.findIndex(item => item.id === product.id);
  
      if (existingItemIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
        existingCartItems[existingItemIndex].quantity += quantity;
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
        existingCartItems.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity });
      }
  
      await AsyncStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  
      const updatedCartItemCount = existingCartItems.reduce((total, item) => total + item.quantity, 0); // Tính tổng số lượng sản phẩm
      updateCartItemCount(updatedCartItemCount); // Cập nhật số lượng sản phẩm trong giỏ hàng trong context
  
      console.log('Mua hàng:', product.title, 'Số lượng:', quantity);
    } catch (error) {
      console.log('Error saving cart items:', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: </Text>
        {Array.from({ length: Math.floor(product.rating.rate) }).map((_, index) => (
          <Text key={index} style={styles.starIcon}>⭐</Text>
        ))}
        <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
        <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
      </View>
      <View style={styles.buyContainer}>
        <TextInput
          style={styles.quantityInput}
          value={String(quantity)}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginRight: 4,
  },
  starIcon: {
    fontSize: 16,
  },
  ratingValue: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  ratingCount: {
    marginLeft: 4,
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SingleProductScreen;