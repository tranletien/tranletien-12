// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import Header from './Header';
// import Footer from './Footer';

// export default function Login() {
//   return (
//     <View style={styles.aaa}>
//     <View style={styles.container}>
      
//       <Text style={styles.title}>Login</Text>
//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//         />
//         {/* <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Login</Text>
//       </TouchableOpacity>
//       </View>
//       <StatusBar style="auto" />
      
//     </View>
//     {/* <Footer/> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   aaa:{
//     flex:1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '80%',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';


const Login = ({navigation }) => {

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    useEffect(() => {
        getUserItems();
        
      }, []);

    const getUserItems = async () => {
        try {
          const existingUserItems = await AsyncStorage.getItem('userItems');
    
          if (existingUserItems) {
            const parsedUserItems = JSON.parse(existingUserItems);
            setUser(parsedUserItems);
          }
        } catch (error) {
          console.log('Error retrieving cart items:', error);
        }
      };

      const handleLogin = () =>{
        console.log(user);
        if(email === "" || password === ""){
            // Alert.alert('Vui lòng nhập email và password');
            alert('Vui lòng nhập email và password');
        }
        else
        {
            const matchedUser = user.find((userData) => userData.email === email && userData.password === password);
            if (matchedUser) {
                // Alert.alert('Login successful');
                alert('Đăng nhập thành công');
                navigation.replace('HomeScreen');
              } else {
                // Alert.alert('Invalid email or password');
                alert('Sai mật khẩu hoặc email');
              }
        }
      }

    return (
        <View style={styles.container}>
            {/* {console.log(data)} */}
            <ImageBackground
                source={require('../assets/taixuong.jpg')}
                style={styles.bg}
            >
                <View style={styles.content}>
                    {/* <Image
                        source={require('../assets/logo1.jpg')}
                        style={styles.image}
                    /> */}
                    <Text style={{ color: 'black' }}> Welcome Back!</Text>
                    <Text style={{ color: 'black' }}>Please sign in to your account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="input your email-address"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.text}>Do not have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

// ...styles definition...

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        marginTop: 20,
      },
      text: {
        marginRight: 5,
      },
      link: {
        color: 'red',
        marginLeft: 5,
        // marginBottom:,
        fontSize: 18
      },
    bg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    input: {
        color: 'gray',
        backgroundColor: '#ffff',
        margin: 10,
        borderRadius: 20,
        height: 70,
        width: '70%',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    buttonUserName: {
        justifyContent: 'left',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
        tintColor: 'white'
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonSignInGoole: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonSignInFaceBook: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#DDDDDD',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    },
});

export default Login;