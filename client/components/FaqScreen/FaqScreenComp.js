import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from './styles';


const FaqScreenComp = () => {
  const faqs = [
    {
      question: 'What is PathFinder?',
      answer: 'PathFinder is an app designed to provide optimal paths for pedestrians based on safety factors\n\nYou can start interacting with the app by setting your preferred safety factors and then start searching for routes on the main screen',
    },
    {
      question: 'How do I use this application?',
      answer: '1. Start by pressing the search button found on the "Find Route" screen\n\n2. Input the source location and destination. Autocomplete suggestions will be provided, you can also set source as your current location and selecting a nearby landmark.\n\n3. Press the "Find Path" button',
    },
    {
      question: 'What are the graphs shown after finding path?',
      answer: 'They show each relevant safety or risk factor and how much of it covers the area of the route shown on the map.\n\nThe biggest graph on the left shows their weighted total according to your set preferences.',
    },
    {
      question: 'How do I set my User Preferences?',
      answer: '1. Visit the sidebar\n\n2. Tap on User Preference\n\n3. Toggle the safety factors by tapping on the switch beside it.\n\n4. Additionally, adjust the importance of this safety factor using the slider. Slide to the right for highest preference.',
    },
    {
      question: 'What is the Report feature for?',
      answer: 'You can report safety or risk factors on this screen.\nThis will be delivered to the respective government organization to be checked and validated.'
    },
    {
      question: 'What is the Map Boundary/green line on the map?',
      answer: 'Currently Pathfinder only supports map data of Marikina City and Quezon City 3rd District. Only route searches within these areas can be done on the app.'
    }
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
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 40 }}>Frequently Asked Questions</Text>
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
      <Text style={{ fontSize: 16 }}>Can't find the answer you're looking for? Contact us at pathfindertipqcapp@gmail.com.</Text>
    </View>
  );
};



export default FaqScreenComp