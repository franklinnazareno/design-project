import { View, Text } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator';
import React, { useState, useEffect } from 'react'
import styles from './styles';
import CustomCircularProgress from '../../../commons/CustomCircle/CustomCircleProgress';
import colors from '../../../../assets/themes/colors';
import SmallCustomCircularProgress from '../../../commons/SmallCustomCircle/SmallCustomCircularProgress';

const OptimalProgressComp = ({ fastestCoverage }) => {
  return (
    fastestCoverage && (
      <View style={styles.progressBox}>
        {/* FASTEST PERCENTAGE */}
        <View style={styles.progressContent}>
        <View style={styles.progresspaddingMAIN}>
          <CustomCircularProgress
            title='Fastest'
            value={fastestCoverage.average} 
            radius={60}
            progressValueColor={colors.primary}
          />
        </View>

        <View style={styles.Mainprogress}>
          {/* MAJOR ROAD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress 
              title='Major Road'
              value={fastestCoverage.not_major_road}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* FLOOD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Flood'
              value={fastestCoverage.not_flood_hazard}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* PWD PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='PWD'
              value={fastestCoverage.pwd_friendly} 
              progressValueColor={colors.primary}
              radius={35}
            />
          </View>

          {/* CCTV PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='CCTV'  
              value={fastestCoverage.cctv}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* LANDMARK PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Landmark'
              value={fastestCoverage.landmark}
              progressValueColor={colors.primary} 
              radius={35}
            />
          </View>

          {/* LIGHTING PERCENTAGE */}
          <View style={styles.progresspadding}>
            <SmallCustomCircularProgress
              title='Lighting'
              value={fastestCoverage.lighting}
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

export default OptimalProgressComp