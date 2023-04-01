import { View, Text } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import React, { useState, useEffect } from 'react'
import styles from './styles';

const OptimalProgressComp = ({ fastestCoverage }) => {
  const [mean, setMean] = useState(null)
  useEffect(() => {
    if (fastestCoverage) {
      const values = Object.values(fastestCoverage);
      const sum = values.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / values.length;
      setMean(mean)
    }
  }, [fastestCoverage])
  return (
    fastestCoverage && (
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
              value={fastestCoverage.not_major_road} 
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
              value={fastestCoverage.not_flood_hazard} 
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
              value={fastestCoverage.pwd_friendly} 
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
              value={fastestCoverage.cctv} 
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
              value={fastestCoverage.landmark} 
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
              value={fastestCoverage.lighting} 
              radius={35}
            />
          </View>
        </View>
      </View>
    )
  )
}

export default OptimalProgressComp