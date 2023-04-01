import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Svg, Circle, G, Text as SvgText } from 'react-native-svg';

const strokeWidth = 7; // Change the stroke width as per your requirement
const radius = 50; // Change the radius as per your requirement

const SmallCustomCircularProgress = ({ title, value, radius: propRadius, progressValueColor }) => {
  const circumference = 2 * Math.PI * propRadius;
  const progress = value <= 0 ? 0 : value; // If value is less than or equal to 0, progress will be 0
  const progressColor = value <= 0 ? '#A9A9A9' : progressValueColor || 'green'; // If value is less than or equal to 0, progress color will be grey
  const textColor = value <= 0 ? '#A9A9A9' : '#2cc70a'; // If value is less than or equal to 0, text color will be grey

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Svg width={propRadius * 2} height={propRadius * 2}>
        <G rotation="-90" origin={`${propRadius}, ${propRadius}`}>
          <Circle
            stroke="#e6e6e6"
            fill="none"
            strokeWidth={strokeWidth}
            cx={propRadius}
            cy={propRadius}
            r={propRadius - strokeWidth / 2}
          />
          <Circle
            stroke={progressColor}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            cx={propRadius}
            cy={propRadius}
            r={propRadius - strokeWidth / 2}
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={circumference - (progress / 100) * circumference}
          />
          <SvgText
            x={propRadius}
            y={propRadius}
            fontSize={16}
            fontWeight={'bold'}
            fill={textColor} // Set the text color to textColor
            textAnchor="middle"
            alignmentBaseline="middle"
            //transform={`rotate(${(progress / 40) * 360} ${propRadius} ${propRadius})`}
            transform={`rotate(90 ${propRadius} ${propRadius})`}
            >
            {`${progress} %`}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SmallCustomCircularProgress;