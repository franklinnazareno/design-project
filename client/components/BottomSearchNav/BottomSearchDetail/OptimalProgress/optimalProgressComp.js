import { View, Text } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import React from 'react'
import styles from './styles';

const OptimalProgressComp = () => {
  return (
    <View style={styles.progressBoxFast}>
              {/* OPTIMAL PERCENTAGE */}
              <View style={styles.progresspaddingMAIN}>
              <CircularProgress 
              title='Fastest'
              titleStyle={{fontWeight: 'bold'}}
              valueSuffix='%'
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              value={69} 
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
              value={69} 
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
              value={69} 
              radius={35}
              />
              </View>

              {/* FLOOD PERCENTAGE */}
              <View style={styles.progresspadding}>
              <CircularProgress
              title='PWD'
              titleStyle={{fontWeight: 'bold'}}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              valueSuffix='%' 
              value={69} 
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
              value={69} 
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
              value={69} 
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
              value={69} 
              radius={35}
              />
              </View>
              </View>

            </View>
  )
}

export default OptimalProgressComp