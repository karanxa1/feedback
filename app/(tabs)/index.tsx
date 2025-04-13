import React from 'react';
import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const tintColor = useThemeColor({}, 'tint');
  
  const handleNavigateToFeedback = () => {
    router.push('/feedback');
  };
  
  const handleNavigateToHistory = () => {
    router.push('/history');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Feedback App!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedText style={styles.subtitle}>
        We value your input to help us improve our products and services.
      </ThemedText>
      
      <ThemedView style={styles.cardContainer}>
        <TouchableOpacity 
          style={[styles.card, { borderColor: tintColor }]} 
          onPress={handleNavigateToFeedback}
        >
          <IconSymbol
            name="square.and.pencil"
            size={40}
            color={tintColor}
            style={styles.cardIcon}
          />
          <ThemedText type="subtitle">Submit Feedback</ThemedText>
          <ThemedText style={styles.cardDescription}>
            Share your thoughts, report bugs, or suggest new features.
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.card, { borderColor: tintColor }]} 
          onPress={handleNavigateToHistory}
        >
          <IconSymbol
            name="list.bullet.clipboard"
            size={40}
            color={tintColor}
            style={styles.cardIcon}
          />
          <ThemedText type="subtitle">View History</ThemedText>
          <ThemedText style={styles.cardDescription}>
            See all your previously submitted feedback and their status.
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.featuresContainer}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>Key Features</ThemedText>
        
        <ThemedView style={styles.featureItem}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} style={styles.featureIcon} />
          <ThemedText>Multiple feedback types (bugs, features, general)</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.featureItem}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} style={styles.featureIcon} />
          <ThemedText>History tracking of all submitted feedback</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.featureItem}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} style={styles.featureIcon} />
          <ThemedText>Light and dark mode support</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.featureItem}>
          <IconSymbol name="checkmark.circle.fill" size={24} color={tintColor} style={styles.featureIcon} />
          <ThemedText>Beautiful and responsive UI</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  cardContainer: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardDescription: {
    marginTop: 8,
    opacity: 0.8,
  },
  featuresContainer: {
    gap: 16,
  },
  featuresTitle: {
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 24,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
