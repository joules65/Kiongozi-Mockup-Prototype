import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MedicalInfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Information</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>John Doe</Text>
          
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>January 1, 1990</Text>
          
          <Text style={styles.label}>Blood Type</Text>
          <Text style={styles.value}>O+</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Conditions</Text>
        <View style={styles.infoCard}>
          <Text style={styles.condition}>Asthma</Text>
          <Text style={styles.condition}>Type 2 Diabetes</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies</Text>
        <View style={styles.infoCard}>
          <Text style={styles.condition}>Penicillin</Text>
          <Text style={styles.condition}>Peanuts</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Medications</Text>
        <View style={styles.infoCard}>
          <Text style={styles.medication}>
            Metformin - 500mg twice daily
          </Text>
          <Text style={styles.medication}>
            Ventolin Inhaler - As needed
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.infoCard}>
          <Text style={styles.contactName}>Jane Doe (Spouse)</Text>
          <Text style={styles.contactInfo}>+1 (555) 123-4567</Text>
          
          <Text style={styles.contactName}>Dr. Smith (Primary Physician)</Text>
          <Text style={styles.contactInfo}>+1 (555) 987-6543</Text>
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 20,
    color: '#D4AF37',
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
  },
  condition: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#8B0000',
    marginBottom: 10,
  },
  medication: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  contactName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  contactInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
  },
});