import React, { useContext } from 'react'
import { LocationContext } from '../context/LocationContext';
import ReportingComponent from '../components/ReportingComp/ReportingComponent';

const ReportScreen = () => {
  const [location] = useContext(LocationContext)

  return (
      <ReportingComponent location={location} />
    )

}

export default ReportScreen;