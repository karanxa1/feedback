import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

type FeedbackType = 'bug' | 'feature' | 'general';

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  email?: string;
  type: FeedbackType;
  timestamp: string;
}

export default function FeedbackScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [submitting, setSubmitting] = useState(false);
  
  const inputBackground = useThemeColor({}, 'inputBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create the new feedback item
      const newFeedback: FeedbackItem = {
        id: Date.now().toString(),
        title,
        description,
        type: feedbackType,
        timestamp: new Date().toISOString()
      };
      
      // Add email if provided
      if (email.trim()) {
        newFeedback.email = email;
      }
      
      // Get existing feedback items
      const existingItemsJson = await AsyncStorage.getItem('feedbackItems');
      let feedbackItems: FeedbackItem[] = [];
      
      if (existingItemsJson) {
        feedbackItems = JSON.parse(existingItemsJson);
      }
      
      // Add new feedback to the list
      feedbackItems.unshift(newFeedback);
      
      // Save updated list back to storage
      await AsyncStorage.setItem('feedbackItems', JSON.stringify(feedbackItems));
      
      // Show success message
      Alert.alert(
        'Success!', 
        'Your feedback has been submitted.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Reset form fields
              setTitle('');
              setDescription('');
              setEmail('');
              setFeedbackType('general');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const FeedbackTypeButton = ({ type, label }: { type: FeedbackType, label: string }) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        { backgroundColor: feedbackType === type ? tintColor : inputBackground }
      ]}
      onPress={() => setFeedbackType(type)}
    >
      <ThemedText style={[
        styles.typeButtonText,
        { color: feedbackType === type ? '#fff' : textColor }
      ]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={150}
          name="bubble.left.and.text.bubble.right"
          color="rgba(255, 255, 255, 0.4)"
          style={styles.headerIcon}
        />
      }>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Submit Feedback</ThemedText>
        </ThemedView>

        <ThemedText style={styles.label}>Feedback Type</ThemedText>
        <ThemedView style={styles.typeContainer}>
          <FeedbackTypeButton type="bug" label="Bug Report" />
          <FeedbackTypeButton type="feature" label="Feature Request" />
          <FeedbackTypeButton type="general" label="General Feedback" />
        </ThemedView>

        <ThemedText style={styles.label}>Title *</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: inputBackground, color: textColor }
          ]}
          value={title}
          onChangeText={setTitle}
          placeholder="Brief summary of your feedback"
          placeholderTextColor="gray"
        />

        <ThemedText style={styles.label}>Description *</ThemedText>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { backgroundColor: inputBackground, color: textColor }
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Please provide details..."
          placeholderTextColor="gray"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <ThemedText style={styles.label}>Email (optional)</ThemedText>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: inputBackground, color: textColor }
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            { backgroundColor: tintColor, opacity: submitting ? 0.7 : 1 }
          ]} 
          onPress={handleSubmit}
          disabled={submitting}
        >
          <ThemedText style={styles.submitButtonText}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonText: {
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});