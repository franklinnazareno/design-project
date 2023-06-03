import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import Tts from 'react-native-tts';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import Modal from "react-native-modal";
// import { magnetometer } from 'react-native-sensors';
// import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Toast from 'react-native-toast-message';
// import { Dimensions } from 'react-native';
// setUpdateIntervalForType(SensorTypes.magnetometer, 100)
import CompassHeading from 'react-native-compass-heading'
import Config from 'react-native-config';
import { useAuthContext } from '../../hooks/useAuthContext';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../assets/themes/colors';
import {decode as atob, encode as btoa} from 'base-64'

const NavigatingMapComp = ({ location, coords, steps, option, loading, setLoading }) => {
  // const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  // const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);
  const [heading, setHeading] = useState(0);
  // const [compassEnabled, setCompassEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const MapModal = () => {
    setIsModalVisible(true);
  }; 
  
  const { user } = useAuthContext();

  const mapRef = useRef(null);
    const [region, setRegion] = useState({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.001, 
      longitudeDelta: 0.001
    })
    const [regionTemp, setRegionTemp] = useState();
    const [newCoords, setCoords] = useState(coords)
    const [newSteps, setSteps] = useState(steps)
    const [completedSteps, setCompletedSteps] = useState([])
    const [reportData, setReportData] = useState(null);
    const [completedReport, setCompletedReport] = useState([])
    const [error, setError] = useState(null)
    const [successful, setSuccessful] = useState(null)

    const [reportId, setReportId] = useState(null)
    const [source, setSource] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageBuffer, setImageBuffer] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

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

    const handleMarkerPress = (rid, src, cat, img) => {
      setReportId(rid)
      setSource(src)
      setCategory(cat)
      setImageBuffer(img)
      setIsModalVisible(!isModalVisible)
    }

    const thumbsUp = async () => {
      setModalLoading(true)
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/add/${reportId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              })
        if (response.ok) {
          console.log("it worked. nice.")
          setSuccessful(true)
          setModalLoading(false)
          setIsModalVisible(false)
          setCompletedReport(prevCompletedReport => [...prevCompletedReport, reportId]);
        } else {
          setModalLoading(false)
          setError("Error occured. Please try again.")
        }
      } catch (err) {
        setModalLoading(false)
        setError("Error occured. Please try again.")
      }
    }

    const thumbsDown = async () => {
      setModalLoading(true)
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/subtract/${reportId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              })
        if (response.ok) {
          console.log("it worked. nice.")
          setSuccessful(true)
          setModalLoading(false)
          setIsModalVisible(false)
          setCompletedReport(prevCompletedReport => [...prevCompletedReport, reportId]);
        } else {
          setModalLoading(false)
          setError("Error occured. Please try again.")
        }
      } catch (err) {
        setModalLoading(false)
        setError("Error occured. Please try again.")
      }
    }

    // const MAGNETOMETER_SENSITIVITY = 5;
    useEffect(() => {
      try {
      // if (compassEnabled) {
        // setMagnetometerSubscription(magnetometer.subscribe(({ x, y, z, timestamp }) => {
          // const angle = Math.atan2(y, x) * (180 / Math.PI);
          // const newHeading = angle >= 0 ? angle + 90 : 450 + angle;
          // if (compassEnabled && Math.abs(newHeading - heading) > MAGNETOMETER_SENSITIVITY) {
          //   setHeading(newHeading)
            if (mapRef.current) {
              const newCamera = {
                  center: { latitude: location.latitude, longitude: location.longitude }
              }
              mapRef.current.animateCamera(newCamera, { duration: 500 });
            }
        // }
        // }
        // ))
      // }
      // if (!compassEnabled){
      //   magnetometerSubscription.unsubscribe();
      //   if (!compassEnabled) {
      //     setHeading(0)
      //     if (mapRef.current) {
      //       const newCamera = {
      //           center: { latitude: location.latitude, longitude: location.longitude },
      //           heading: heading
      //       }
      //       mapRef.current.animateCamera(newCamera, { duration: 500 });
      //     }
      //   }
      // }
      // return () => {
      //   if (magnetometerSubscription){
      //     magnetometerSubscription.unsubscribe();
      //   }
      // };
      } catch (error) {
        console.log('No magnetometer found')
      }
    }, [location]);

    useEffect(() => {
      const degree_update_rate = 10;

      CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
        setHeading(heading)
      });

      return () => {
        CompassHeading.stop();
      };
    },[]);

    // const toggleCompass = () => {
    //   setCompassEnabled(!compassEnabled);
    //   var deviceHeight = Dimensions.get('window').height;
    //   if(!compassEnabled){
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Following user',
    //       text2: 'Double-tap to stop following',
    //       visibilityTime: 3000,
    //       autoHide: true,
    //       position: 'bottom',
    //       bottomOffset: deviceHeight * 0.6
    //     })
    //   } else {
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Stopped following user',
    //       text2: 'Double-tap to start following again',
    //       visibilityTime: 3000,
    //       autoHide: true,
    //       position: 'bottom',
    //       bottomOffset: deviceHeight * 0.6
    //     })
    //   }
    // };
    useEffect(() => {
      const latitude = location.latitude
      const longitude = location.longitude 

      setRegionTemp({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })

      mapRef.current?.animateToRegion(regionTemp)
    }, [location])

    useEffect(() => {
      setReportData(null)
      console.log('hi')
      if (coords && coords.length > 1) {
        // Send GET request for report
        const getReportCoords = async () => {
          try {
            const response = await fetch(`${Config.EXPRESS}/api/report/filterwithimage`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              body: JSON.stringify({coordsData: coords})}
            )
            const reports = await response.json();
            if (response.ok){
              setReportData(reports)
            }

          } catch (error) {
            console.log(error)
          }
        }
        getReportCoords()
      }
    }, [coords])

    useEffect(() => {
      const thresholdDistance = 10

      for (const step of newSteps) {
        const distance = haversineDistance(location.latitude, location.longitude, step.coordinates[0], step.coordinates[1])

        if (distance <= thresholdDistance && !completedSteps.includes(step)) {
          Tts.speak(step.instruction)
          setCompletedSteps(prev => [...prev, step]);
          setTimeout(() => {
            // Use setTimeout instead of "await new Promise" in useEffect
            // as async/await is not directly supported in useEffect callback
            // and setTimeout achieves the desired delay effect
            // Note: setTimeout is not blocking, so other code outside of useEffect
            // will continue to execute immediately
          }, 2000);
        }
      }
    }, [location])

    // useEffect(() => {
    //   const thresholdDistance = 100

    //   if (reportData && reportData.length > 1) {
    //     for (const report of reportData) {
    //       const { coordinates } = report
    //       const distance = haversineDistance(location.latitude, location.longitude, coordinates.latitude, coordinates.longitude)

    //       if (distance <= thresholdDistance && !completedReport.includes(report)) {
    //         console.log(report)
    //         setCompletedReport(prev => [...prev, report])
    //       }
    //     }
    //   }
    // }, [location])

    useEffect(() => {
      if (newCoords) {
        setLoading(false)
      }
    }, [newCoords])
  
    mapStyle = [
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.attraction",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.place_of_worship",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
    // const CustomCallout = ({key, source, category, description, imageBufferData}) => {
    //   const base64String = btoa(String.fromCharCode(...new Uint8Array(imageBufferData.data)));
    //   return (
    //       <View style={styles.calloutContainer}>
    //         <View style={styles.container}>
    //           <Image style={styles.image} source={{uri: `data:image/jpeg;base64,${base64String}`}} alt=""/>
    //             <View style={styles.detailsContainer}>
    //               <Text style={styles.source} numberOfLines={1} ellipsizeMode="tail">
    //                 {source}
    //               </Text>
    //               <Text style={styles.category}>{category}</Text>
    //               {/* <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
    //                 {description}
    //               </Text> */}
    //             </View>
    //         </View>
    //       </View>
    //   )
    // }
    const ReportImage = ({imageData}) => {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
      return(
      <Image style={styles.image} source={{uri: `data:image/jpeg;base64,${base64String}`}} alt="image" />
      )
    }
    const categoryMapping = {
      lighting: 'Lighting',
      'not lighting': 'No Lighting',
      pwd: 'PWD-Friendly',
      'not pwd': 'Not PWD-Friendly',
      cctv: 'CCTV',
      'not cctv': 'No CCTV',
      flood: 'Flood Hazard',
      'not flood': 'No Flood Hazard',
      closure: 'Road Closure',
    };
    return (
      
      <MapContainer>
        <MapView.Animated
          ref={mapRef}
          initialRegion={region}
          region={region}
          style={styles.Mapsize}
          zoomEnabled
          rotateEnabled={false}
          // compassEnabled={compassEnabled}
          // onDoublePress={toggleCompass}
          initialCamera={{
            center: { latitude: location.latitude, longitude: location.longitude },
            zoom: 20,
            heading: 0,
            pitch: 0
          }}
          customMapStyle={mapStyle}
           >

          {location && <Marker.Animated 
            title={"Current Location"}
            coordinate={{latitude: location.latitude, longitude: location.longitude}}
            ref={marker => {this.marker = marker}}
            flat
            style={{ transform: [{
              rotate: heading === undefined? '0deg' : `${heading}deg`
            }]}}
            tracksViewChanges={true}>
              <View style={{backgroundColor: 'white', borderRadius: 20 }}>
                    {/* <Icon name="circle" size={20} color="#1E75E8" /> */}
                    <FontAwesome5Icon name="location-arrow" 
                                      size={20}
                                      style={{ transform:[{rotate: '-45deg'}]}}
                                      color="#1E75E8"/>
                </View>
            </Marker.Animated>}

          
          {coords && <Marker 
            title={"Destination"}
            coordinate={{latitude: coords[coords.length - 1].latitude, longitude: coords[coords.length - 1].longitude}}
            tracksViewChanges={true}
            >
              <Icon name="location-pin" size={30} color="red" />
            </Marker>}

          {reportData && reportData.map(report => {
            if (!completedReport.includes(report._id)) {
              return (
                <Marker
                  key={report._id}
                  coordinate={{ latitude: report.coordinates.latitude, longitude: report.coordinates.longitude }}
                  title={`${categoryMapping[report.category.toLowerCase()]} Reported`}
                  tracksViewChanges={false}
                  tracksInfoWindowChanges={true}
                  onPress={() => handleMarkerPress(report._id, report.source, categoryMapping[report.category.toLowerCase()], report.image.data)}
                >
                  {/* <Callout tooltip>
                    <CustomCallout
                      key={report._id}
                      source={report.source}
                      category={report.category}
                      description={report.description}
                      imageBufferData={report.image}
                    />
                  </Callout> */}
                  <MaterialCommunityIcon name='map-marker-alert' size={30} color="purple" />
                </Marker>
              );
            } else {
              return null; // Exclude the report if it's in completedReport
            }
          })}

          {newCoords && <Polyline
              coordinates={newCoords}
              strokeWidth={4}
              strokeColor={
                option === 'steps_with_coords_safest' ? `${colors.primary}` : "#1E75E8"
              }
              tappable
            />}

        </MapView.Animated>
        <Toast ref={(ref) => Toast.setRef(ref)}  />

        <View>
            <Modal
              visible={isModalVisible} 
              transparent={true}
              animationType="fade"
              onBackdropPress={() => setIsModalVisible(false)}>
                
            <View style={styles.modalContent}>
              {/* <ScrollView> */}
              {modalLoading ? (
                // Display ActivityIndicator while loading
                <ActivityIndicator size="large" color="black" />
              ) : (
                // Display JSX code when not loading
                <>

                  <View style={{flex: 1}}>
                  <TouchableOpacity style={{ height:190, width:180, backgroundColor:'red' }}>
                  <ReportImage
                    imageData = {imageBuffer}
                    />
                  </TouchableOpacity>
                  
                  </View>


                <View style={styles.modalContent2}>
                  <View>
                  <Text style={styles.modaltext}>{source}</Text>
                  <Text style={styles.modaltext2}>{category}</Text>
                  </View>
                  <View style={styles.VoteView}>
                    <TouchableOpacity style={styles.thumbpress} onPress={thumbsUp}>
                      <FontAwesome5Icon name="thumbs-up" size={50} color={colors.primary}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.thumbpress} onPress={thumbsDown}>
                      <FontAwesome5Icon name="thumbs-down" size={50} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>

                  {/* <Image
                    source={{ uri: imageURL }}
                    // style={styles.image}
                  /> */}
                
                </>
              )}
              {/* </ScrollView>     */}
            </View>
            </Modal>
            </View>
        </MapContainer>
              
    );
};


export default NavigatingMapComp;