import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import styles from './styles';
import CustomCircularProgress from '../../../commons/CustomCircle/CustomCircleProgress';
import colors from '../../../../assets/themes/colors';
import SmallCustomCircularProgress from '../../../commons/SmallCustomCircle/SmallCustomCircularProgress';

const SafeProgressComp = ({ safestCoverage }) => {
  return (
    safestCoverage && (
      <View style={styles.progressBox}>
        {/* SAFETY PERCENTAGE */}
        <View style={styles.progressContent}>
        <View style={styles.progresspaddingMAIN}>
          <CustomCircularProgress
            title='Safest'
            value={safestCoverage.average} 
            radius={60}
            progressValueColor={colors.primary}
          />
        </View>

        <View style={styles.Mainprogress}>
          {/* MAJOR ROAD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress 
              title='Major Road'
              value={safestCoverage.not_major_road} 
              progressValueColor={colors.primary}
              radius={35}
            />
          </View>

          {/* FLOOD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Flood' 
              value={safestCoverage.not_flood_hazard}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* PWD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='PWD'
              
              value={safestCoverage.pwd_friendly} 
              progressValueColor={colors.primary}
              radius={35}
            />
          </View>

          {/* CCTV PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='CCTV'
                
              value={safestCoverage.cctv}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* LANDMARK PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Landmark'
              value={safestCoverage.landmark} 
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* LIGHTING PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Lighting'
                
              value={safestCoverage.lighting}
              progressValueColor={colors.primary}  
              radius={35}
            />
          </View>
        </View>
        </View>
      </View>
    )
  )
}

export default SafeProgressComp