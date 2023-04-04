import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const NewFaqScreen = () => {
  const faqs = [
    {
      question: 'What is PathFinder?',
      answer: 'PathFinder is an app designed to provide optimal paths based on safety factors\n\nYou can start interacting with the app by setting your preferred safety factors and start finding routes on the main screen',
    },
    {
      question: 'How do I use this application?',
      answer: '1. Start by pressing the search button found on the "Find Route" screen\n\n2. Input the source location and destination. There is a tappable button to choose your current location as the source.\n\n3. Press the "Find Path" button',
    },
    {
      question: 'What are the graphs shown after finding path?',
      answer: 'They show each relevant safety factor and how much of it covers the area of the route shown on the map.\n\nThe biggest graph on the left shows their weighted total according to your set preferences.',
    },
    {
      question: 'How do I set my User Preferences?',
      answer: '1. Visit the sidebar\n\n2. Tap on User Preference\n\n3. Toggle the safety factors by tapping on the switch beside it.\n\n4. Additionally, adjust the importance of this safety factor using the slider. Slide to the right for highest preference.',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = React.useState(null);

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleBackButtonClick = () => {
    setCurrentQuestion(null);
  };

  return (
    <View style={styles.container}>
      {currentQuestion === null ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 50 }}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity key={index} onPress={() => handleQuestionClick(index)}>
              <Text style={styles.question}>{faq.question}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.question}>{faqs[currentQuestion].question}</Text>
          <Text style={styles.answer}>{faqs[currentQuestion].answer}</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.divider} />
      <Text style={{ fontSize: 16 }}>Can't find the answer you're looking for? Contact us at qkjqbaturiano@tip.edu.ph</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left'
  },
  answer: {
    fontSize: 16,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
    marginVertical: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewFaqScreen