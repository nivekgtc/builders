import React, { FC, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

import * as Location from 'expo-location'
import { useService } from "~/presentation/hooks"
import { ServicesTypes } from "~/ioc/types"
import { LoadWeather } from "~/domain/usecases"
import { WeatherModel } from "~/domain/models"
import { container } from "~/ioc/ioc.config"
import { ScreenStyled } from "./home-screen-styles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}


export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const loadWeatherService = useService<LoadWeather>(ServicesTypes.WEATHER.LOAD_WEATHER_ONECALL)

  const [errorMsg, setErrorMsg] = useState(null);
  const [temp, setTemp] = useState<WeatherModel>()
  const [location, setLocation] = useState<Location.LocationObject>(null);

  const tryToGetLocation = () => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }

  useEffect(() => {

    let isRender = true;

    if (isRender)
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    return () => {
      isRender = false;
    }
  }, []);

  const loadWeather = async () => {

      const {latitude, longitude} = location?.coords

      const loadParams = {
        lat: latitude, lon: longitude
      }

      const response = await loadWeatherService.load(loadParams)

      if (response.isSuccess) {
        setTemp(response.value as WeatherModel)
      }

  }

  return (
    <ScreenStyled style={ROOT} preset="scroll">
      <Text preset="header" text="home" />
      <Text preset="header" text='Sem localizar' onPress={loadWeather}/>

      <Text preset="secondary" text={temp?.current?.temp as unknown as string ?? 'Independentmente do seu belo visual auauauau'}/>
    </ScreenStyled>
  )
}
