import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { LocationContext } from '../context/LocationContext';
import ReportComponent from '../components/reportComp/reportComponent';

const ReportScreen = () => {
  const [location] = useContext(LocationContext)

  return (
      <ReportComponent location={location} />
    )

}

export default ReportScreen;