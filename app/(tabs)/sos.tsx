import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Phone, Bell, Plus, Trash2 } from 'lucide-react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export default function SOSScreen() {
  const [sending, setSending] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relation: '',
  });
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  const handleEmergencyAlert = async () => {
    setSending(true);
    try {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: contactsStatus } = await Contacts.requestPermissionsAsync();

      if (locationStatus !== 'granted' || contactsStatus !== 'granted') {
        Alert.alert('Permission required', 'Please enable location and contacts access to use this feature.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      
      // Simulate sending alerts to emergency contacts
      setTimeout(() => {
        Alert.alert(
          'Emergency Alert Sent',
          `Alert sent to ${emergencyContacts.length} emergency contacts and emergency services.`,
          [{ text: 'OK' }]
        );
        setSending(false);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to send emergency alert. Please try again.');
      setSending(false);
    }
  };

  const addEmergencyContact = () => {
    if (!newContact.name || !newContact.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
    };

    setEmergencyContacts([...emergencyContacts, contact]);
    setNewContact({ name: '', phone: '', relation: '' });
    setShowAddContact(false);
  };

  const removeContact = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      
      <TouchableOpacity 
        style={[styles.sosButton, sending && styles.sosButtonActive]}
        onPress={handleEmergencyAlert}
      >
        <Bell size={48} color="#FFFFFF" />
        <Text style={styles.sosButtonText}>
          {sending ? 'Sending Alert...' : 'Send Emergency Alert'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.callButton}>
        <Phone size={24} color="#FFFFFF" />
        <Text style={styles.callButtonText}>Call Emergency Services</Text>
      </TouchableOpacity>

      <View style={styles.contactsSection}>
        <View style={styles.contactsHeader}>
          <Text style={styles.contactsTitle}>Emergency Contacts</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddContact(true)}
          >
            <Plus size={24} color="#8B0000" />
          </TouchableOpacity>
        </View>

        {showAddContact && (
          <View style={styles.addContactForm}>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContact.phone}
              onChangeText={(text) => setNewContact({...newContact, phone: text})}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={newContact.relation}
              onChangeText={(text) => setNewContact({...newContact, relation: text})}
            />
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={addEmergencyContact}
            >
              <Text style={styles.saveButtonText}>Save Contact</Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDetails}>{contact.phone}</Text>
              <Text style={styles.contactRelation}>{contact.relation}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeContact(contact.id)}
              style={styles.removeButton}
            >
              <Trash2 size={20} color="#8B0000" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>When you activate SOS:</Text>
          <Text style={styles.infoText}>• Emergency services will be notified</Text>
          <Text style={styles.infoText}>• Your emergency contacts will be alerted</Text>
          <Text style={styles.infoText}>• Your current location will be shared</Text>
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
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  sosButton: {
    backgroundColor: '#8B0000',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sosButtonActive: {
    backgroundColor: '#D4AF37',
  },
  sosButtonText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  callButtonText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
  },
  contactsSection: {
    paddingHorizontal: 20,
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactsTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 20,
    color: '#D4AF37',
  },
  addButton: {
    padding: 8,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  addContactForm: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  saveButton: {
    backgroundColor: '#8B0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
  },
  contactCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  contactDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  contactRelation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8B0000',
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  infoContainer: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  infoTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
});