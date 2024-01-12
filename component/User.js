import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
    <Text style={styles.footerText}>Trang nguoi dung</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
      },
      footerText: {
        fontSize: 14,
        textAlign: 'center',
      },
});
