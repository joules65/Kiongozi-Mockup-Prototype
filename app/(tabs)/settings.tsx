import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isHapticEnabled, setIsHapticEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Light Mode</Text>
            <Text style={styles.settingDescription}>Enable light color scheme</Text>
          </View>
          <Switch
            value={isLightMode}
            onValueChange={setIsLightMode}
            trackColor={{ false: '#8B0000', true: '#D4AF37' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Large Text</Text>
            <Text style={styles.settingDescription}>Increase text size</Text>
          </View>
          <Switch
            value={isLargeText}
            onValueChange={setIsLargeText}
            trackColor={{ false: '#8B0000', true: '#D4AF37' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>High Contrast</Text>
            <Text style={styles.settingDescription}>Enhance text visibility</Text>
          </View>
          <Switch
            value={isHighContrast}
            onValueChange={setIsHighContrast}
            trackColor={{ false: '#8B0000', true: '#D4AF37' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Voice Assistant</Text>
            <Text style={styles.settingDescription}>Enable voice responses</Text>
          </View>
          <Switch
            value={isVoiceEnabled}
            onValueChange={setIsVoiceEnabled}
            trackColor={{ false: '#8B0000', true: '#D4AF37' }}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Haptic Feedback</Text>
            <Text style={styles.settingDescription}>Enable vibration feedback</Text>
          </View>
          <Switch
            value={isHapticEnabled}
            onValueChange={setIsHapticEnabled}
            trackColor={{ false: '#8B0000', true: '#D4AF37' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>KiongoziCare v1.0.0</Text>
          <Text style={styles.aboutDescription}>
            Your personal emergency response assistant. Providing immediate first aid guidance and emergency support when you need it most.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 32,
    color: '#8B0000',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 20,
    color: '#D4AF37',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  settingTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  aboutCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
  },
  aboutText: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  aboutDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});