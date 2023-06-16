import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, memo, useRef} from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, {Polyline, Marker, Geojson} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { io } from 'socket.io-client';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import myBoundary from './boundary';
import Toast from 'react-native-toast-message';
import colors from '../../assets/themes/colors';
import Config from 'react-native-config';
import { useAuthContext } from '../../hooks/useAuthContext';



var deviceHeight = Dimensions.get('window').height;

const MapComponent = ({ coordsData, coordsData2, location, userView  }) => {
    const { width, height } = Dimensions.get('window')
    const mapViewRef = useRef(null);
    const { user } = useAuthContext();
    const aspectRatio = width / height;
    const [reportData, setReportData] = useState(null);
    const [newReport, setNewReport] = useState(null)
    const [reportData2, setReportData2] = useState(null)
    const [displayedReports, setDisplayedReports] = useState(null)


    const [region, setRegion] = useState({
      latitude: 14.6507,
      longitude: 121.1029,
      latitudeDelta: 0.005, 
      longitudeDelta: 0.005
    })
    const [regionTemp, setRegionTemp] = useState(null)

    const toRadians = (degrees) => {
      return degrees * Math.PI / 180
    }

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3
        const phi1 = toRadians(lat1)
        const phi2 = toRadians(lat2)
        const deltaPhi = toRadians(lat2 - lat1)
        const deltaLambda = toRadians(lon2 - lon1)

        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    const thresholdDistance = 50


    useEffect(() => {
      if (location && location.latitude && location.longitude){
        const latitude = location.latitude
        const longitude = location.longitude 

        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        })
      }
    }, [])
    

    useEffect(() => {
      if (location){
        const latitude = location.latitude
        const longitude = location.longitude 

        setRegionTemp({
          latitude: latitude-0.0018,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        })
      }
    }, [location])

    useEffect(() => {

      if (coordsData && coordsData.length > 1) {
        const firstCoords = coordsData[0]
        const lastCoords = coordsData[coordsData.length - 1]
        const R = 6371
        const dLat = ((lastCoords.latitude - firstCoords.latitude) * Math.PI) / 180
        const dLon = ((lastCoords.longitude - firstCoords.longitude) * Math.PI) / 180

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((firstCoords.latitude * Math.PI) / 180) *
            Math.cos((lastCoords.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c

        const latDelta = distance / (111.32 * aspectRatio)
        const lonDelta = distance / (111.32 * Math.cos(firstCoords.latitude * Math.PI / 180) * aspectRatio)

        const centerLat = (firstCoords.latitude + lastCoords.latitude) / 2
        const centerLon = (firstCoords.longitude + lastCoords.longitude) / 2

        setRegion({
          latitude: centerLat,
          longitude: centerLon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta
        })
      }

    }, [coordsData])

    useEffect(() => {
      setReportData(null)
      setReportData2(null)
      if (coordsData && coordsData.length > 1) {
        // Send GET request for report
        const getReportCoords = async () => {
          try {
            const response = await fetch(`${Config.EXPRESS}/api/report/filter`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              body: JSON.stringify({coordsData: coordsData})}
            )
            const reports = await response.json();
            if (response.ok){
              setReportData(reports)
              console.log(reportData)
            }

          } catch (error) {
            console.log(error)
          }
        }
        getReportCoords()
      }
      if (coordsData2 && coordsData2.length > 1) {
        const getReportCoords2 = async () => {
          try {
              const response = await fetch(`${Config.EXPRESS}/api/report/filter`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({coordsData: coordsData2})}
              )
              const reports = await response.json();
              if (response.ok){
                setReportData2(reports)
              }

            } catch (error) {
              console.log(error)
            }
        }
        getReportCoords2()
      }
    }, [coordsData, coordsData2])

    useEffect(() => {
      setDisplayedReports(null)
      if (reportData && reportData2) {
        console.log(reportData)
        const reports = [...reportData, ...reportData2];
        const uniqueReportIds = new Set();
        const uniqueReports = reports.filter(report => {
          if (uniqueReportIds.has(report._id)) {
            return false;
          } else {
            uniqueReportIds.add(report._id);
            return true;
          }
        });
        setDisplayedReports(uniqueReports)
        console.log(displayedReports)
        } 
      if (reportData && !reportData2) {
          setDisplayedReports(reportData)
          console.log(displayedReports)
        }
    }, [reportData, reportData2])

    useEffect(() => {
      const socket = io(`${Config.EXPRESS}`);
      
      socket.on('reportUpdate', (reportData) => {
        setNewReport(reportData)
      })

      return () => {
        socket.disconnect();
      }
    }, []);

    useEffect(() => {
      if (newReport && coordsData && coordsData.length > 1) {
        const newReportCoords = newReport.coordinates 
        for (const coordinate of coordsData) {
          const distance = haversineDistance(coordinate.latitude, coordinate.longitude, newReportCoords.latitude, newReportCoords.longitude)
          if (distance <= thresholdDistance) {
            const { _id, source, coordinates, category, expiry } = newReport
            setReportData((prev) => [...prev, { _id, source, coordinates, category, expiry }]);
          }
        }
      }

      if (newReport && coordsData2 && coordsData2.length > 1) {
        const newReportCoords = newReport.coordinates 
        for (const coordinate of coordsData2) {
          const distance = haversineDistance(coordinate.latitude, coordinate.longitude, newReportCoords.latitude, newReportCoords.longitude)
          if (distance <= thresholdDistance) {
            const { _id, source, coordinates, category, expiry } = newReport
            setReportData((prev) => [...prev, { _id, source, coordinates, category, expiry }]);
          }
        }
      }
    }, [newReport])

    const {setOptions, toggleDrawer} = useNavigation();
    
    useEffect(() => {
        setOptions({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                toggleDrawer();
              }}>
              <MaterialIcon style={{padding: 15, color:'white'}} size={30} name="menu"></MaterialIcon>
            </TouchableOpacity>
          ),
        });
      }, []);

    const handleRelocate = () => {
      if (regionTemp){
        mapViewRef.current?.animateToRegion(regionTemp)
      } else {
        Toast.show({
          type: 'error',
          text1: 'No precise location found',
          text2: 'Make sure precise location is turned on.',
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
          bottomOffset: deviceHeight * 0.7
        })
      }
    }
    mapStyle = [
      {
        "featureType": "landscape.man_made",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]

    const categoryMapping = {
      lighting: 'Lighting',
      'not lighting': 'No Lighting',
      pwd: 'PWD-Friendly',
      'not pwd': 'Not PWD-Friendly',
      cctv: 'CCTV',
      'not cctv': 'No CCTV',
      flood: 'No Flood Hazard',
      'not flood': 'Flood Hazard',
      closure: 'Road Closure',
      'not  closure': 'Road Closure'
    };

    return (
      
      <MapContainer>
        
        <MapView.Animated
          ref={mapViewRef}
          initialRegion={region}
          region={region}
          onRegionChange={this.handleRegionChange}
          style={styles.Mapsize}
          zoomEnabled
          // minZoomLevel={16}
          rotateEnabled={false}
          customMapStyle={mapStyle}
           >
          <Geojson
            geojson={myBoundary}
            strokeColor={colors.primary}
            strokeWidth={2}/>
            
            
            {location && <Marker 
            title={"Current Location"}
            coordinate={{latitude: location?.latitude, longitude: location?.longitude}}
            tracksViewChanges={true}>
                <View style={{ borderRadius: 40, backgroundColor: 'white' }}>
                    <Icon name="circle" size={20} color="#1E75E8" />
                </View>
            </Marker>}

          {coordsData && <Marker 
            title={"Source"}
            coordinate={{latitude: coordsData[0].latitude, longitude: coordsData[0].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="blue" />
            </Marker>}
            
            
          {coordsData && <Marker 
            title={"Destination"}
            coordinate={{latitude: coordsData[coordsData.length - 1].latitude, longitude: coordsData[coordsData.length - 1].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="red" />
            </Marker>}

            
          
          {displayedReports && displayedReports.map(report => (
            <Marker
              key={report._id}
              coordinate={{latitude: report.coordinates.latitude, longitude: report.coordinates.longitude}}
              title={`${categoryMapping[report.category.toLowerCase()]} Reported`}
              tracksViewChanges={false}>
              <MaterialCommunityIcon name='map-marker-alert' size={30} color="purple"/>
            </Marker>
          ))}

          {userView === 0 && coordsData && (
            <>
              <Polyline
                coordinates={coordsData}
                strokeWidth={4}
                strokeColor={colors.primary}
                tappable
              />
            </>
          )}
          {userView === 0 && coordsData2 && (
            <>
            <Polyline
              coordinates={coordsData2}
              strokeWidth={4}
              strokeColor="#1E75E8"
              tappable
            />
          </>
          )}
          {userView === 1 && coordsData && (
            <Polyline
              coordinates={coordsData}
              strokeWidth={4}
              strokeColor={colors.primary}
              tappable
            />
          )}
          {userView === 2 && coordsData2 && (
            <Polyline
              coordinates={coordsData2}
              strokeWidth={4}
              strokeColor="#1E75E8"
              tappable
            />
          )}

        </MapView.Animated>

        {/* Recenter Button */}
        <View>
        <View style={styles.CenterBox}> 
        <View style={styles.ReCenter}>
        <TouchableOpacity style={styles.Icon} onPress={handleRelocate}>
        {location ? <MaterialIcon name = 'my-location' size={32} color="white"/> : <MaterialIcon name = 'location-disabled' size={32} color="white"/> }
        </TouchableOpacity>
        </View>
        </View>
        </View>
        
        <Toast ref={(ref) => Toast.setRef(ref)}  />
        </MapContainer>
        
          
        
    );
};

export default memo(MapComponent);