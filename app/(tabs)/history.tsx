import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

// Define the feedback item type
interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  email?: string;
  type: 'bug' | 'feature' | 'general';
  timestamp: string;
}

export default function HistoryScreen() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const cardBackground = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  useEffect(() => {
    loadFeedbackItems();
  }, []);

  const loadFeedbackItems = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from AsyncStorage or an API
      const storedItems = await AsyncStorage.getItem('feedbackItems');
      if (storedItems) {
        setFeedbackItems(JSON.parse(storedItems));
      } else {
        // Add some sample data if none exists
        const sampleData: FeedbackItem[] = [
          {
            id: '1',
            title: 'App Crashes on Startup',
            description: 'The app crashes when I try to open it on my Android device.',
            type: 'bug',
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            id: '2',
            title: 'Dark Mode Implementation',
            description: 'Please add a dark mode to reduce eye strain at night.',
            type: 'feature',
            email: 'user@example.com',
            timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          },
          {
            id: '3',
            title: 'Great User Experience',
            description: 'I love how intuitive the app is to use. Great job on the design!',
            type: 'general',
            timestamp: new Date(Date.now() - 259200000).toISOString() // 3 days ago
          }
        ];
        
        await AsyncStorage.setItem('feedbackItems', JSON.stringify(sampleData));
        setFeedbackItems(sampleData);
      }
    } catch (error) {
      console.error('Error loading feedback items:', error);
      Alert.alert('Error', 'Failed to load feedback history');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return 'ladybug.fill';
      case 'feature':
        return 'lightbulb.fill';
      default:
        return 'text.bubble.fill';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderFeedbackItem = ({ item }: { item: FeedbackItem }) => (
    <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
      <ThemedView style={styles.cardHeader}>
        <ThemedView style={styles.typeContainer}>
          <IconSymbol 
            name={getTypeIcon(item.type)} 
            size={16} 
            color={tintColor} 
            style={styles.typeIcon} 
          />
          <ThemedText style={styles.typeText}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.dateText}>{formatDate(item.timestamp)}</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.title}>{item.title}</ThemedText>
      <ThemedText numberOfLines={2} style={styles.description}>
        {item.description}
      </ThemedText>
      
      {item.email && (
        <ThemedText style={styles.email}>From: {item.email}</ThemedText>
      )}
    </ThemedView>
  );

  const keyExtractor = (item: FeedbackItem) => item.id;

  const ListEmptyComponent = () => (
    <ThemedView style={styles.emptyContainer}>
      <IconSymbol 
        name="tray.fill" 
        size={60} 
        color={textColor} 
        style={{ opacity: 0.3 }} 
      />
      <ThemedText style={styles.emptyText}>No feedback submitted yet</ThemedText>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={150}
          name="list.clipboard"
          color="rgba(255, 255, 255, 0.4)"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Feedback History</ThemedText>
        </ThemedView>

        <FlatList
          data={feedbackItems}
          renderItem={renderFeedbackItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={ListEmptyComponent}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 20,
  },
  headerIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    marginRight: 6,
  },
  typeText: {
    fontWeight: '600',
    fontSize: 14,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  email: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.5,
  },
});