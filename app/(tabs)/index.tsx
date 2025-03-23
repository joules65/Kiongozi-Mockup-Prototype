import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { Mic, AlertCircle, Volume2, Calendar } from 'lucide-react-native';
// Import CircleStop correctly (or replace with StopCircle if available)
import { Circle as StopCircle } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// First aid responses database with keywords
const FIRST_AID_RESPONSES = {
  burn: {
    keywords: ['burn', 'burns', 'burning', 'fire', 'hot'],
    response: "For a minor burn: 1. Cool the burn under cold running water for at least 10 minutes. 2. Remove any jewelry or clothing near the burnt area. 3. Cover with a sterile gauze bandage. 4. Take over-the-counter pain medication if needed.",
    icon: 'fire'
  },
  bleeding: {
    keywords: ['bleeding', 'blood', 'cut', 'wound'],
    response: "To control bleeding: 1. Apply direct pressure with a clean cloth. 2. Keep the injured area elevated above the heart. 3. Apply a pressure bandage. 4. If bleeding is severe or doesn't stop, seek immediate medical attention.",
    icon: 'droplet'
  },
  choking: {
    keywords: ['choke', 'choking', 'heimlich', 'can\'t breathe', 'cant breathe'],
    response: "For a choking adult: 1. Give 5 back blows between the shoulder blades. 2. Perform 5 abdominal thrusts (Heimlich maneuver). 3. Alternate between back blows and abdominal thrusts. 4. If person becomes unconscious, start CPR.",
    icon: 'alert-triangle'
  },
  cpr: {
    keywords: ['cpr', 'unconscious', 'not breathing', 'heart', 'cardiac'],
    response: "Adult CPR steps: 1. Check the scene is safe. 2. Call emergency services. 3. Check for breathing. 4. Give 30 chest compressions. 5. Give 2 rescue breaths. 6. Continue cycles of 30 compressions and 2 breaths.",
    icon: 'heart'
  },
  fracture: {
    keywords: ['broken', 'fracture', 'bone', 'sprain'],
    response: "For a suspected fracture: 1. Keep the injured area still. 2. Apply ice wrapped in cloth. 3. Elevate the injury if possible. 4. Seek immediate medical attention.",
    icon: 'scissors'
  },
  seizure: {
    keywords: ['seizure', 'convulsion', 'fits', 'epilepsy'],
    response: "During a seizure: 1. Ease the person to the floor. 2. Turn them on their side. 3. Clear the area of hazards. 4. Time the seizure. 5. Never put anything in their mouth. 6. Stay with them until fully recovered.",
    icon: 'zap'
  },
  allergic: {
    keywords: ['allergy', 'allergic', 'anaphylaxis', 'reaction'],
    response: "For severe allergic reaction: 1. Check for medical alert bracelet. 2. Call emergency services. 3. Help them use their epinephrine auto-injector if available. 4. Keep them calm and lying down.",
    icon: 'alert-circle'
  },
  heatstroke: {
    keywords: ['heat', 'heatstroke', 'overheated', 'dehydrated'],
    response: "For heatstroke: 1. Move to a cool place. 2. Call emergency services. 3. Remove excess clothing. 4. Cool with water or ice packs. 5. Do not give fluids if unconscious.",
    icon: 'thermometer'
  }
};

export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [transcript, setTranscript] = useState('');
  const [recognizedKey, setRecognizedKey] = useState('');
  const [spokenWords, setSpokenWords] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoSpeechInput, setDemoSpeechInput] = useState(''); // State for demo input

  // Improved keyword matching with better logic
  const findMatchingResponse = (text) => {
    if (!text) return null;

    const lowercaseText = text.toLowerCase();
    const words = lowercaseText.split(' ');
    setSpokenWords(words);

    // Track the best match and its score
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, data] of Object.entries(FIRST_AID_RESPONSES)) {
      // Calculate match score by counting keyword occurrences
      let score = 0;
      data.keywords.forEach(keyword => {
        if (lowercaseText.includes(keyword)) {
          score += 1;
          // Give extra points for exact matches
          if (words.includes(keyword)) {
            score += 0.5;
          }
        }
      });

      // Update best match if this score is higher
      if (score > bestScore) {
        bestScore = score;
        bestMatch = { key, response: data.response };
      }
    }

    // Return the best match if score is above threshold
    if (bestScore > 0) {
      setRecognizedKey(bestMatch.key);
      return bestMatch.response;
    }

    return "I'm sorry, I couldn't understand your question. Please try asking about specific first aid situations like burns, bleeding, CPR, or choking.";
  };

  // Modified voice recognition for React Native (no document references)
  const startVoiceRecognition = () => {
    setIsProcessing(true);

    // For demo: we'll use the state variable instead of DOM
    const captureTimeout = setTimeout(() => {
      setIsProcessing(false);
      let recognizedText = '';

      // Use the state value instead of document.getElementById
      if (demoSpeechInput) {
        recognizedText = demoSpeechInput;
      } else {
        // Fallback if no demo input provided
        recognizedText = "what should I do for a bleeding wound";
      }

      setTranscript(recognizedText);
      const matchedResponse = findMatchingResponse(recognizedText);
      if (matchedResponse) {
        setResponse(matchedResponse);

        Speech.speak(matchedResponse, {
          rate: 0.9,
          pitch: 1.0,
          onDone: () => setIsListening(false),
          onError: () => {
            setErrorMessage("Error speaking response");
            setIsListening(false);
          }
        });
      }
    }, 2000);

    return () => clearTimeout(captureTimeout);
  };

  const handleVoiceAssistant = async () => {
    if (isListening) {
      setIsListening(false);
      Speech.stop();
      return;
    }

    setIsListening(true);
    setTranscript('');
    setResponse('');
    setRecognizedKey('');

    try {
      startVoiceRecognition();
    } catch (error) {
      setErrorMessage('Error with voice assistant');
      setIsListening(false);
    }
  };

  // For demo purposes only - to simulate real input (React Native compatible)
  const DemoInputField = () => {
    if (Platform.OS !== 'web') return null;

    return (
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Demo Input:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.demoInput}
            placeholder="Type what you would say (e.g., 'how to treat a burn')"
            value={demoSpeechInput}
            onChangeText={setDemoSpeechInput}
          />
        </View>
        <Text style={styles.demoHelp}>
          Type a phrase above before clicking the mic button to simulate voice input
        </Text>
      </View>
    );
  };

  const EmergencyCard = ({ title, description, onPress }) => (
    <TouchableOpacity
      style={styles.emergencyCard}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#8B0000', '#A52A2A']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <AlertCircle size={24} color="#FFF" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {description}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#8B0000', '#CD5C5C']}
        style={styles.header}
      >
        <Text style={styles.title}>KiongoziCare</Text>
        <Text style={styles.subtitle}>Your Emergency Response Assistant</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {Platform.OS === 'web' && <DemoInputField />}

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <AlertCircle size={24} color="#8B0000" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.assistantContainer}>
            <TouchableOpacity
              style={[styles.micButton, isListening && styles.micButtonActive]}
              onPress={handleVoiceAssistant}
            >
              <LinearGradient
                colors={isListening ? ['#D4AF37', '#FFD700'] : ['#8B0000', '#B22222']}
                style={styles.micGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isProcessing ? (
                  <View style={styles.pulsingCircle} />
                ) : isListening ? (
                  <StopCircle size={40} color="#FFFFFF" />
                ) : (
                  <Mic size={40} color="#FFFFFF" />
                )}
              </LinearGradient>
              <Text style={styles.micButtonText}>
                {isProcessing ? 'Listening...' :
                  isListening ? 'Stop Assistant' : 'Ask for First Aid Help'}
              </Text>
            </TouchableOpacity>

            {transcript && (
              <View style={styles.transcriptContainer}>
                <Volume2 size={16} color="#666666" style={styles.transcriptIcon} />
                <Text style={styles.transcriptText}>"{transcript}"</Text>
              </View>
            )}
          </View>
        )}

        {response ? (
          <View style={styles.responseContainer}>
            <LinearGradient
              colors={['#F8F8F8', '#FFFFFF']}
              style={styles.responseGradient}
            >
              <View style={styles.responseHeader}>
                <AlertCircle size={20} color="#8B0000" />
                <Text style={styles.responseTitle}>First Aid Instructions</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.responseText}>{response}</Text>

              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>CALL EMERGENCY SERVICES</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.categories}>
            <Text style={styles.categoriesTitle}>Emergency Categories</Text>
            <View style={styles.cardsContainer}>
              <EmergencyCard
                title="Burns & Scalds"
                description="Learn how to treat burns and minimize damage"
                onPress={() => {
                  setTranscript("What should I do for a burn");
                  setResponse(FIRST_AID_RESPONSES.burn.response);
                  setRecognizedKey('burn');
                }}
              />
              <EmergencyCard
                title="Bleeding Control"
                description="Steps to stop bleeding and prevent infection"
                onPress={() => {
                  setTranscript("How to stop bleeding");
                  setResponse(FIRST_AID_RESPONSES.bleeding.response);
                  setRecognizedKey('bleeding');
                }}
              />
              <EmergencyCard
                title="CPR Procedure"
                description="Life-saving CPR techniques for emergencies"
                onPress={() => {
                  setTranscript("How to perform CPR");
                  setResponse(FIRST_AID_RESPONSES.cpr.response);
                  setRecognizedKey('cpr');
                }}
              />
              <EmergencyCard
                title="Choking Response"
                description="How to help someone who is choking"
                onPress={() => {
                  setTranscript("What to do for choking");
                  setResponse(FIRST_AID_RESPONSES.choking.response);
                  setRecognizedKey('choking');
                }}
              />
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            In case of serious emergency, dial emergency services immediately
          </Text>
          <View style={styles.footerIcons}>
            <Calendar size={14} color="#666666" />
            <Text style={styles.footerDate}>Last updated: March 2025</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 14,
    color: '#FFD8D8',
    textAlign: 'center',
    marginTop: 5,
  },
  assistantContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  micButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  micGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  pulsingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  micButtonActive: {
    transform: [{ scale: 1.05 }],
  },
  micButtonText: {
    color: '#333333',
    marginTop: 15,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-SemiBold',
    fontWeight: '600',
    fontSize: 14,
  },
  responseContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  responseGradient: {
    padding: 20,
    borderRadius: 15,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  responseTitle: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    color: '#8B0000',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  responseText: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  callButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-Bold',
    fontWeight: 'bold',
    fontSize: 14,
  },
  categories: {
    marginTop: 20,
  },
  categoriesTitle: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    color: '#333333',
    marginBottom: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emergencyCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardGradient: {
    padding: 15,
    height: 120,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Jakarta-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
  },
  cardDescription: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 12,
    color: '#FFD8D8',
    marginTop: 5,
  },
  transcriptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 20,
    marginTop: 15,
    maxWidth: '80%',
  },
  transcriptIcon: {
    marginRight: 8,
  },
  transcriptText: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#8B0000',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 14,
    marginLeft: 10,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  footerDate: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    marginLeft: 5,
  },
  demoContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  demoTitle: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontWeight: '600',
    fontSize: 14,
    color: '#666666',
  },
  demoHelp: {
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 5,
  },
  demoInput: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});