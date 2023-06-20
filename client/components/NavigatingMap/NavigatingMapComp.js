import React, { useState, useEffect, useRef } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator, AppState } from 'react-native';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo'
import Tts from 'react-native-tts';
import { io } from 'socket.io-client';
import styles from './styles';
import MapContainer from '../commons/mapContainer/Contain';
import Modal from "react-native-modal";
// import { magnetometer } from 'react-native-sensors';
// import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';
// setUpdateIntervalForType(SensorTypes.magnetometer, 100)
import CompassHeading from 'react-native-compass-heading'
import Config from 'react-native-config';
import { useAuthContext } from '../../hooks/useAuthContext';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../assets/themes/colors';
import { STARTNAV } from '../../context/initialRoutenNames';
import { useNavigation } from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import {decode as atob, encode as btoa} from 'base-64'


var deviceHeight = Dimensions.get('window').height;


const NavigatingMapComp = ({ preference, location, sauce, destination, coords, newSteps, completedSteps, option, loading, setLoading, setSteps, setCompletedSteps }) => {
  // const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  // const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);
  const [heading, setHeading] = useState(0);
  // const [compassEnabled, setCompassEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [NewOptModalVisible, setNewOptIsModalVisible] = useState(false);

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (optimizedCoords) {
  //     Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
  //   }
  // },[optimizedCoords])

  // const MapModal = () => {
  //   setIsModalVisible(true);
  // }; 
  
  const { user } = useAuthContext();

  const mapRef = useRef(null);
    const [region, setRegion] = useState({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.001, 
      longitudeDelta: 0.001
    })
    const [regionTemp, setRegionTemp] = useState();
    // const [sourceCoords, setSourceCoords] = useState([location.longitude, location.latitude])
    const [newCoords, setCoords] = useState(coords)
    // const [newSteps, setSteps] = useState(steps)
    // const [completedSteps, setCompletedSteps] = useState([])
    const [reportData, setReportData] = useState([]);
    const [newReport, setNewReport] = useState(null)
    const [completedReport, setCompletedReport] = useState([])
    const [error, setError] = useState(null)
    const [successful, setSuccessful] = useState(null)

    const [self, setSelf] = useState(false)

    const [reportId, setReportId] = useState(null)
    const [equal, setEqual] = useState(true)
    const [roadClosure, setRoadClosure] = useState(false)
    const [paramId, setParamId] = useState('')
    const [listenedReportId, setListenedReportId] = useState(null)
    const [source, setSource] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageBuffer, setImageBuffer] = useState(null)
    const [counter, setCounter] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)
    const [voteLoading, setVoteLoading] = useState(false)
    const [showTitle, setShowTitle] = useState(false)

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

    const declineNewRoute = () => {
      setNewOptIsModalVisible(false)
      setOptimizedCoords(null)
      setOptimizedSteps(null)
      setShortestCoords(null)
      setShortestSteps(null)
      // setEqual(true)
    }

    const acceptNewRoute = () => {
      if (option === 'steps_with_coords_safest') {
        setCoords(optimizedCoords)
        setSteps(optimizedSteps)
      } else {
        if (shortestCoords) {
          setCoords(shortestCoords)
          setSteps(shortestSteps)
        } else {
          setCoords(optimizedCoords)
          setSteps(optimizedSteps)
        }
      }
      setCompletedSteps([])
      setNewOptIsModalVisible(false)
      setOptimizedCoords(null)
      setOptimizedSteps(null)
      setShortestCoords(null)
      setShortestSteps(null)
      // setEqual(true)
    }

    // useEffect(() => {
    //   if (option === 'steps_with_coords_safest') {
    //     if (optimizedCoords) {
    //       setSteps(optimizedSteps)
    //     }
    //   }
    //   if (optimizedCoords) {
    //     console.log("old:", coords)
    //     console.log("new:", optimizedCoords)
    //     setSteps(optimizedSteps)
    //     if (JSON.stringify(coords) !== JSON.stringify(optimizedCoords)) {
    //       setNewOptIsModalVisible(true)
    //       if (roadClosure) {
    //         Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
    //       } else {
    //         Tts.speak("Suggestion: We found a better path. Would you like to re-route?")
    //       }
    //     } else {
    //       if (shortestCoords) {
    //         console.log("old:", coords)
    //         console.log("new:", shortestCoords)
    //         setSteps(shortestSteps)
    //         if (JSON.stringify(coords) !== JSON.stringify(shortestCoords)) {
    //           setNewOptIsModalVisible(true)
    //           if (roadClosure) {
    //             Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
    //           } else {
    //             Tts.speak("Suggestion: We found a better path. Would you like to re-route?")
    //           }
    //         }
    //       } else {
    //         console.log("old:", coords)
    //         console.log("new:", optimizedCoords)
    //         setSteps(optimizedSteps)
    //         if (JSON.stringify(coords) !== JSON.stringify(optimizedCoords)) {
    //           setNewOptIsModalVisible(true)
    //           if (roadClosure) {
    //             Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
    //           } else {
    //             Tts.speak("Suggestion: We found a better path. Would you like to re-route?")
    //           }
    //         }
    //       }
    //     }
    //   }
    // }, [optimizedCoords, shortestCoords])
    const handleRouteChange = (
      coords, roadClosure, option,
      optimizedCoords,
      optimizedSteps,
      shortestCoords = null,
      shortestSteps = null
    ) => {
      if (option === 'steps_with_coords_safest') {
        if (optimizedCoords) {
          console.log('i set the steps sir')
          setSteps(optimizedSteps);
          if (JSON.stringify(coords) != JSON.stringify(optimizedCoords)) {
          console.log("in if coords !== opt")
          setNewOptIsModalVisible(true);
          if (roadClosure) {
            Tts.speak("Warning: Road closure ahead. Would you like to re-route?");
          } else {
            Tts.speak("Suggestion: We found a better path. Would you like to re-route?");
          }
        }
        }
      } else 
      if (optimizedCoords) {
        console.log("old:", coords);
        console.log("new:", optimizedCoords);
        console.log("roadClosure:", roadClosure)
        setSteps(optimizedSteps);
        
        if (JSON.stringify(coords) != JSON.stringify(optimizedCoords)) {
          console.log("in if coords !== opt")
          setNewOptIsModalVisible(true);
          if (roadClosure) {
            Tts.speak("Warning: Road closure ahead. Would you like to re-route?");
          } else {
            Tts.speak("Suggestion: We found a better path. Would you like to re-route?");
          }
        }
        // else {
        //   if (shortestCoords) {
        //     console.log("old:", coords);
        //     console.log("new:", shortestCoords);
        //     setSteps(shortestSteps);
            
        //     if (JSON.stringify(coords) !== JSON.stringify(shortestCoords)) {
        //       setNewOptIsModalVisible(true);
        //       if (roadClosure) {
        //         Tts.speak("Warning: Road closure ahead. Would you like to re-route?");
        //       } else {
        //         Tts.speak("Suggestion: We found a better path. Would you like to re-route?");
        //       }
        //     }
        //   } else {
        //     console.log("old:", coords);
        //     console.log("new:", optimizedCoords);
        //     setSteps(optimizedSteps);
            
        //     if (JSON.stringify(coords) !== JSON.stringify(optimizedCoords)) {
        //       setNewOptIsModalVisible(true);
        //       if (roadClosure) {
        //         Tts.speak("Warning: Road closure ahead. Would you like to re-route?");
        //       } else {
        //         Tts.speak("Suggestion: We found a better path. Would you like to re-route?");
        //       }
        //     }
        //   }
        // }
      }
    };

    // useEffect(() => {
    //   if (!equal) {
    //     setNewOptIsModalVisible(true)
    //     if (roadClosure) {
    //       Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
    //     } else {
    //       Tts.speak("Suggestion: We found a better path. Would you like to re-route?")
    //     }
    //   }
    // }, [equal])

    const [conditions, setConditions] = useState(null)
    const [newOptimized, setNewOptimized] = useState(null)
    const [newShortest, setNewShortest] = useState(null)
    const [optimizedCoords, setOptimizedCoords] = useState(null)
    const [shortestCoords, setShortestCoords] = useState(null)
    const [optimizedSteps, setOptimizedSteps] = useState(null)
    const [shortestSteps, setShortestSteps] = useState(null)
    const [optimizedCoverage, setOptimizedCoverage] = useState(null)
    const [shortestCoverage, setShortestCoverage] = useState(null)

    const reRoute = async ({id} = {}, roadClosure = false) => {
      const preferences = preference.preferences.map(({ name, value }) => ({ name, value }))
      const sourceCoords = sauce
      const destCoords = destination
      const postData = { preferences, sourceCoords, destCoords }
      console.log(postData)

      console.log(id)
      const endpoint = `${Config.FLASK}/route/${id ? `?id=${id}` : ''}`;
      console.log(endpoint)

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })

        const json = await response.json()

        if (response.ok) {
          setConditions(json['conditions'])
          if (json['shortest_route'] && Object.keys(json['shortest_route']).length > 0) {
            setNewOptimized(json['optimized_route'])
            setNewShortest(json['shortest_route'])
            setOptimizedCoords(json['optimized_route']['coordinates'])
            setShortestCoords(json['shortest_route']['coordinates'])
            const optimizedStepsJson = json['optimized_route']['steps']
            const optimizedStepsTemp = optimizedStepsJson.map(step => {
              return {
                coordinates: step.coordinates,
                distance: step.distance,
                instruction: step.instruction,
                factorsPresent: step.factors_present
              }
            })
            setOptimizedSteps(optimizedStepsTemp)
            const shorestStepsJson = json['shortest_route']['steps']
            const shorestStepsTemp = shorestStepsJson.map(step => {
              return {
                coordinates: step.coordinates,
                distance: step.distance,
                instruction: step.instruction,
                factorsPresent: step.factors_present
              }
            })
            setShortestSteps(shorestStepsTemp)
            setOptimizedCoverage(json['optimized_route']['coverage'])
            setShortestCoverage(json['shortest_route']['coverage'])
            handleRouteChange(coords, roadClosure, option, optimizedCoords, optimizedSteps, shortestCoords, shortestSteps);
          } else {
            setNewOptimized(json['optimized_route'])
            setNewShortest(json['shortest_route'])
            setOptimizedCoords(json['optimized_route']['coordinates'])
            setShortestCoords(null)
            const optimizedStepsJson = json['optimized_route']['steps']
            const optimizedStepsTemp = optimizedStepsJson.map(step => {
              return {
                coordinates: step.coordinates,
                distance: step.distance,
                instruction: step.instruction,
                factorsPresent: step.factors_present
              }
            })
            setOptimizedSteps(optimizedStepsTemp)
            setShortestSteps(null)
            setOptimizedCoverage(json['optimized_route']['coverage'])
            setShortestCoverage(null)
            handleRouteChange(coords, roadClosure, option, optimizedCoords, optimizedSteps);
          }
          // if (optimizedCoords) {
          //   console.log("old:", coords)
          //   console.log("new:", optimizedCoords)
          //   if (option === 'steps_with_coords_safest') {
          //     if (JSON.stringify(coords) !== JSON.stringify(optimizedCoords)) {
          //       setEqual(false)
          //     }
          //   } else {
          //     if (shortestCoords) {
          //       if (JSON.stringify(coords) !== JSON.stringify(shortestCoords)) {
          //         setEqual(false)
          //       }
          //     } else {
          //       if (JSON.stringify(coords) !== JSON.stringify(optimizedCoords)) {
          //         setEqual(false)
          //       }
          //     }
          //   }
          //   console.log(equal)
          // }
          console.log("New routes. Nice")
          setSelf(false)
          return
        } else {
          setSelf(false)
        }
      } catch (err) {
        // ignore
      }
    }
    
    const getUpdate = async (roadClosure = false) => {
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({coordsData: newCoords})}
        )
        const result = await response.json()
        if (response.ok) {
          if (result) {
            console.log("3rd: from getUpdate", result)
            if (roadClosure){
              reRoute(undefined, true)
            } else {
              reRoute()
            }
          } else {
            console.log("Update: nothing happened.")
          }
        }
      } catch (err) {
        // ignore
      }
    }

    const getSelfUpdate = async ({id}) => {
      console.log(`the id is ${id}`)
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/self/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({coordsData: newCoords})}
        )
        const result = await response.json()
        if (response.ok) {
          if (result) {
            setParamId(id)
            console.log('getSelfUpdated')
            setSelf(true)
            if (newReport.category === 'closure') {
              setRoadClosure(true)
              reRoute({id: id})
            } else {
              reRoute()
            }
          } else {
            getUpdate()
            console.log('Self update: nothing happened.')
          }
        }
      } catch (err) {
        // ignore
      }
    }

    const handleMarkerPress = (rid, src, cat, img, ctr, coords) => {
      const thresholdDistance = 50
      const distance = haversineDistance(location.latitude, location.longitude, coords.latitude, coords.longitude)
      if (distance <= thresholdDistance) {
        setIsModalVisible(!isModalVisible)
        setModalLoading(true)
        setReportId(rid)
        setSource(src)
        setCategory(cat)
        setImageBuffer(img)
        setCounter(ctr)
      } else {
        setShowTitle(true)
      }
    }

    useEffect(() => {
      if (!isModalVisible) {
        setReportId(null)
        setSource(null)
        setCategory(null)
        setImageBuffer(null)
        setCounter(null)
      }
    }, [isModalVisible])

    useEffect(() => {
      if (imageBuffer) {
        setModalLoading(false)
      }
    }, [imageBuffer])

    const thumbsUp = async () => {
      setModalLoading(true)
      setVoteLoading(true)
      setParamId(reportId)
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/add/${reportId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              })
        if (response.ok) {
          const socket = io(`${Config.EXPRESS}`);
          try {
            socket.emit('voteUpReport', reportId)
          } catch (error) {
            console.error(error)
          }
            Toast.show({
                type: 'success',
                text1: 'Vote successfully submitted.',
                text2: 'Thank you for contribution.',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                bottomOffset: deviceHeight * 0.7
              })
          // if (category === 'closure') {
          //   setSelf(true)
          //   reRoute()
          // }
          reRoute()
          setSuccessful(true)
          setModalLoading(false)
          setVoteLoading(false)
          setIsModalVisible(false)
          setCompletedReport(prevCompletedReport => [...prevCompletedReport, reportId]);
        } else {
          setModalLoading(false)
          setVoteLoading(false)
          setError("Error occured. Please try again.")
        }
      } catch (err) {
        setModalLoading(false)
        setVoteLoading(false)
        setError("Error occured. Please try again.")
      }
    }

    const thumbsDown = async () => {
      setModalLoading(true)
      setVoteLoading(true)
      try {
        const response = await fetch(`${Config.EXPRESS}/api/report/subtract/${reportId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              })
        if (response.ok) {
            const socket = io(`${Config.EXPRESS}`);
            try {
              socket.emit('voteDownReport', reportId)
            } catch (error) {
              console.error(error)
            }
            Toast.show({
                type: 'success',
                text1: 'Vote successfully submitted.',
                text2: 'Thank you for contribution.',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                bottomOffset: deviceHeight * 0.7
              })
          setSuccessful(true)
          setModalLoading(false)
          setVoteLoading(false)
          setIsModalVisible(false)
          setCompletedReport(prevCompletedReport => [...prevCompletedReport, reportId]);
        } else {
          setModalLoading(false)
          setError("Error occured. Please try again.")
        }
      } catch (err) {
        setModalLoading(false)
        setVoteLoading(false)
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
      if (newCoords && newCoords.length > 1) {
        // Send GET request for report
        const getReportCoords = async () => {
          try {
            const response = await fetch(`${Config.EXPRESS}/api/report/filterwithimage`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },
              body: JSON.stringify({coordsData: newCoords})}
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
    }, [newCoords])

    useEffect(() => {
      const socket = io(`${Config.EXPRESS}`);
      
      socket.on('reportUpdate', (repData) => {
        setNewReport(repData)
      })

      socket.on('reportCountUp', (repId) => {
        console.log("1st: socket", repId)
        setListenedReportId(repId)
      })

      return () => {
        socket.disconnect();
      }
    }, []);

    // useEffect(() => {
    //   if (reportData && listenedReportId) {
    //     console.log(reportData)
    //     for (const report in reportData) {
    //       console.log(report._id)
    //       console.log(report.category)
    //       console.log(listenedReportId)
    //       if (report._id == listenedReportId) {
    //         if (report.category === 'closure') {
    //           console.log("2nd: going to getUpdate()")
    //           getUpdate()
    //         }
    //       }
    //     }
    //   }
    //   setListenedReportId(null)
    // }, [listenedReportId])

    useEffect(() => {
      const processReportId = async () => {
        if (reportData && listenedReportId) {
          console.log(reportData)
          reportData.forEach(report => {
            console.log(report._id)
            console.log(report.category)
            console.log(listenedReportId)
            if (report._id === listenedReportId) {
              if (report.category === 'closure') {
                console.log("2nd: going to getUpdate()")
                setRoadClosure(true)
                getUpdate(true);
              } else {
                reRoute()
              }
            }
          });
        }
        setListenedReportId(null)
        await sleep (30000)
      }
      processReportId()
    }, [listenedReportId]);

    useEffect(() => {
      const processNewReport = async () => {
        if (newReport && coords && coords.length > 1) {
          const thresholdDistance = 50
          const newReportCoords = newReport.coordinates 
          for (const coordinate of coords) {
            const distance = haversineDistance(coordinate.latitude, coordinate.longitude, newReportCoords.latitude, newReportCoords.longitude)
            if (distance <= thresholdDistance) {
              setReportData((prev) => {
                if (!prev.some((report) => report.id == newReport.id)) {
                  return [...prev, newReport];
                }
                return prev;
              });
            }
          }
          getSelfUpdate({id: newReport._id})
        }
        await sleep (30000)
        setNewReport(null)
      }
      processNewReport()
      reRoute()
    }, [newReport])

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments) => {
      // Your code from the useEffect can go here
      const thresholdDistance = 10;

      if (!equal) {
        if (roadClosure) {
          Tts.speak("Warning: Road closure ahead. Would you like to re-route?")
        } else {
          Tts.speak("Suggestion: We found a better path. Would you like to re-route?")
        }
      }

      for (const step of newSteps) {
        const distance = haversineDistance(
          location.latitude,
          location.longitude,
          step.coordinates[0],
          step.coordinates[1]
        );

        if (distance <= thresholdDistance && !completedSteps.includes(step)) {
          Tts.speak(step.instruction);
          setCompletedSteps((prev) => [...prev, step]);
          await sleep(2000);
        }
      }
    };

    const options = {
      taskName: 'Pathfinder',
      taskTitle: 'Currently Navigating',
      taskDesc: 'Instruction',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ffffff',
      parameters: {
        delay: 1000,
      },
    };

    const startBackgroundTask = async () => {
      await BackgroundService.start(veryIntensiveTask, options);
    };

    const stopBackgroundTask = async () => {
      await BackgroundService.stop();
    };

    // useEffect(() => {
    //   const thresholdDistance = 10;

    //   for (const step of newSteps) {
    //     const distance = haversineDistance(
    //       location.latitude,
    //       location.longitude,
    //       step.coordinates[0],
    //       step.coordinates[1]
    //     );

    //     if (distance <= thresholdDistance && !completedSteps.includes(step)) {
    //       Tts.speak(step.instruction);
    //       setCompletedSteps(prev => [...prev, step]);
    //       setTimeout(() => {}, 2000);
    //     }
    //   }
    // }, [location]);

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // Screen is on and active
        stopBackgroundTask();
      } else if (nextAppState === 'background') {
        // Screen is off or locked
        startBackgroundTask();
      }
    };

    useEffect(() => {
      const thresholdDistance = 10;

      for (const step of newSteps) {
        const distance = haversineDistance(
          location.latitude,
          location.longitude,
          step.coordinates[0],
          step.coordinates[1]
        );

        if (distance <= thresholdDistance && !completedSteps.includes(step)) {
            setTimeout(() => {}, 2000);
            Tts.speak(step.instruction);
            setCompletedSteps((prev) => [...prev, step]);
            setTimeout(() => {}, 2000);
        }
      }

      const appStateListener = AppState.addEventListener('change', handleAppStateChange);

      // Cleanup function
      return () => {
        appStateListener.remove();
        stopBackgroundTask();
      };
    }, [location]);

    useEffect(() => {
      if (newSteps.length > 0) {
        setTimeout(() => {
          Tts.speak(newSteps[0].instruction);
        }, 2000);
      }
    }, [])

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
        const base64String = btoa(new Uint8Array(imageData.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
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
      flood: 'No Flood Hazard',
      'not flood': 'Flood Hazard',
      closure: 'Road Closure',
      'not  closure': 'Road Closure'
    };
    const CustomReportIcon = ({category}) => {
      let icon

      switch (category) {
        case 'lighting':
          icon = () => <Icon name='lightbulb' size={30} color='green'/>
          break;
        case 'not lighting':
          icon = () => <Icon name='lightbulb' size={30} color='red'/>
          break;
        case 'pwd':
          icon = () => <Icon name='directions-walk' size={30} color='green'/>
          break;
        case 'not pwd':
          icon = () => <Icon name='directions-walk' size={30} color='red'/>
          break;
        case 'cctv':
          icon = () => <MaterialCommunityIcon name='cctv' size={30} color='green'/>
          break;
        case 'not cctv':
          icon = () => <MaterialCommunityIcon name='cctv' size={30} color='red'/>
          break;
        case 'flood':
          icon = () => <MaterialCommunityIcon name='home-flood' size={30} color='red'/>
          break;
        case 'not flood':
          icon = () => <MaterialCommunityIcon name='home-flood' size={30} color='green'/>
          break;
        case 'closure':
          icon = () => <Icon name='do-not-disturb-on' size={30} color='red'/>
          break;
        default:
          break;
      }

      return icon && icon();
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
                  title={showTitle ? `${categoryMapping[report.category.toLowerCase()]} Reported` : null}
                  tracksViewChanges={false}
                  tracksInfoWindowChanges={true}
                  onPress={() => handleMarkerPress(report._id, report.source, categoryMapping[report.category.toLowerCase()], report.image, report.counter, report.coordinates)}
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
                  {/* <MaterialCommunityIcon name='map-marker-alert' size={30} color="purple" /> */}
                  <CustomReportIcon category={report.category.toLowerCase()}/>
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
              onBackdropPress={() => {
              if (!modalLoading) {
                setIsModalVisible(false);
              }
            }}>
                
            <View style={styles.modalContent}>
              {/* <ScrollView> */}
              {modalLoading ? (
                // Display ActivityIndicator while loading
                <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
                    <ActivityIndicator size="large" color={colors.primary}/>
                    {voteLoading ? (<Text style={{marginTop: 20}}>Submitting Vote</Text>) : null}
                </View>
              ) : (
                // Display JSX code when not loading
                <>
                <View style={{flex: 1}}>
                    <View style={{ flex:1 }}>
                        <ReportImage
                            imageData = {imageBuffer}
                            />
                    </View>
                </View>

                <View style={styles.modalContent2}>
                  <View>
                    <Text style={styles.modaltext} numberOfLines={3}>{source}</Text>
                    <Text style={styles.modaltext2}>{category}</Text>
                    <Text style={styles.modaltext2}>User Reports: {counter}</Text>
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
          <View>
              <Modal
                visible={NewOptModalVisible} 
                transparent={true}
                animationType="fade"
                onBackdropPress={() => setNewOptIsModalVisible(false)}
              >
                <View style={styles.NewOptmodalContent}>
                  <View style={styles.NewOptmodalContent2}>
                    <View>
                      <Text style={styles.modaltext}>
                        {roadClosure ? (
                          "Warning: Road closure ahead. Would you like to re-route?"
                        ) : (
                          "Suggestion: We found a better path. Would you like to re-route?"
                        )}
                      </Text>
                    </View>
                    <View style={styles.NewOptVoteView}>
                      <TouchableOpacity style={styles.NewOptpressAccept} onPress={acceptNewRoute}>
                        <Text style={styles.NewOptmodaltext}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.NewOptpressDecline} onPress={declineNewRoute}>
                        <Text style={styles.NewOptmodaltext}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

            
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)}  />

            
        </MapContainer>
              
    );
};


export default NavigatingMapComp;