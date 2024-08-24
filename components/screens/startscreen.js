import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../globalContext/globalContext';

const StartupScreen = ({ onLoadingComplete }) => {
  const navigation = useNavigation();
  const { initAppSettings, initAppServices, isLoggedIn, username } = useContext(Context);

  useEffect(() => {
    const loadAPIs = async () => {
      try {
        await Promise.all([initAppSettings(), initAppServices()]);
        onLoadingComplete();  // Notify that loading is complete


      } catch (error) {
        console.error('Error loading APIs:', error);
        // Handle error appropriately
      }
    };

    loadAPIs();
  }, [onLoadingComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
      <ActivityIndicator size="large" color="Black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  loadingText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
});

export default StartupScreen;
