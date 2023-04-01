import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import styles from './styles';

const SafeProgressComp = ({ safestCoverage }) => {
  const [mean, setMean] = useState(null)
  useEffect(() => {
    if (safestCoverage) {
      const values = Object.values(safestCoverage);
      const sum = values.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / values.length;
      setMean(mean)
    }
  }, [safestCoverage])
  return (
    safestCoverage && (
      <View style={styles.progressBox}>
        {/* SAFETY PERCENTAGE */}
        <View style={styles.progresspaddingMAIN}>
          <CircularProgress 
            title='Safest'
            titleStyle={{fontWeight: 'bold'}}
            valueSuffix='%'
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={5}
            activeStrokeWidth={5}
            value={mean} 
            radius={60}
          />
        </View>

        <View style={styles.Mainprogress}>
          {/* MAJOR ROAD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress 
              title='Major Road'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%'
              value={safestCoverage.not_major_road} 
              radius={35}
            />
          </View>

          {/* FLOOD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress
              title='Flood'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%' 
              value={safestCoverage.not_flood_hazard} 
              radius={35}
            />
          </View>

          {/* PWD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress
              title='PWD'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%' 
              value={safestCoverage.pwd_friendly} 
              radius={35}
            />
          </View>

          {/* CCTV PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress
              title='CCTV'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%'  
              value={safestCoverage.cctv} 
              radius={35}
            />
          </View>

          {/* LANDMARK PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress
              title='Landmark'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%' 
              value={safestCoverage.landmark} 
              radius={35}
            />
          </View>

          {/* LIGHTING PERCENTAGE */}
          <View style={styles.progresspadding}>
            <CircularProgress
              title='Lighting'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%'  
              value={safestCoverage.lighting} 
              radius={35}
            />
          </View>
        </View>
      </View>
    )
  )
}

export default SafeProgressComp