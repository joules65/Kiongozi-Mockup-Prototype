import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const FIRST_AID_GUIDES = [
  {
    title: 'CPR Basics',
    description: 'Learn the essential steps of CPR',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500',
  },
  {
    title: 'Bleeding Control',
    description: 'How to stop bleeding and prevent infection',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500',
  },
  {
    title: 'Burn Treatment',
    description: 'First aid for different types of burns',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
  },
  {
    title: 'Choking Response',
    description: 'How to help someone who is choking',
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=500',
  },
];

export default function FirstAidScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>First Aid Guide</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchPlaceholder}>Search first aid guides...</Text>
      </View>

      {FIRST_AID_GUIDES.map((guide, index) => (
        <TouchableOpacity key={index} style={styles.guideCard}>
          <Image
            source={{ uri: guide.image }}
            style={styles.guideImage}
          />
          <View style={styles.guideContent}>
            <Text style={styles.guideTitle}>{guide.title}</Text>
            <Text style={styles.guideDescription}>{guide.description}</Text>
          </View>
          <ChevronRight size={24} color="#8B0000" />
        </TouchableOpacity>
      ))}

      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyTitle}>Emergency Numbers</Text>
        <Text style={styles.emergencyNumber}>911 - Emergency Services</Text>
        <Text style={styles.emergencyNumber}>Poison Control - 1-800-222-1222</Text>
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
  searchContainer: {
    backgroundColor: '#F5F5F5',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  guideImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  guideContent: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  guideTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  guideDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  emergencyCard: {
    backgroundColor: '#FFF5F5',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  emergencyTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: 18,
    color: '#8B0000',
    marginBottom: 10,
  },
  emergencyNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
});