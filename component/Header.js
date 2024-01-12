// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Image, Text, View } from 'react-native';

// export default function Header() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Welcome to My Shop</Text>
//             <Image source={require('../assets/cafe.png')} style={styles.logo} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     headerContainer: {
//         backgroundColor: '#f2f2f2',
//         // paddingVertical: 10,
//         // paddingHorizontal: 20,
//         // marginBottom: 10,
//     },
//     // headerText: {
//     //     fontSize: 18,
//     //     fontWeight: 'bold',
//     //     textAlign: 'center',
//     // },
//     logo: {
//         width: 150,
//         height: 70,
//         marginLeft:125,
//     },
//     title:{
//         marginLeft:125,
 
//     }
// });
import React from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logoshop.png')} style={styles.logo} />
      </View>
      <View style={styles.searchContainer}>
        {/* <Text style={styles.title}>Welcome to My Shop</Text> */}
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          // Add your search functionality here
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    marginLeft:100,
  },
  logo: {
    width: 150,
    height: 70,
  },
  searchContainer: {
    flex: 2,
    marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 30,
    backgroundColor: '#fff',
  },
});
