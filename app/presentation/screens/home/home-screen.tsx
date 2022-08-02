import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, ViewStyle, Text as TextRn } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { AutoImage, GradientBackground, Icon, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

import * as Location from 'expo-location'
import { useService } from "~/presentation/hooks"
import { ServicesTypes } from "~/ioc/types"
import { LoadWeather } from "~/domain/usecases"
import { WeatherModel } from "~/domain/models"
import { container } from "~/ioc/ioc.config"
import { CardStyled, CloundAndRain, Local, ScreenStyled, SubRatings, TemperatureRatings } from "./home-screen-styles"
import { Card } from "@rneui/base"
import { makeApiImageUrl } from "~/ioc/helpers"
import { getHeightSize } from "~/application/common/utils/responsivity"

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

  const hasImage = useMemo(() => temp?.current?.weather?.[0]?.icon, [temp?.current?.weather])

  return (
    <ScreenStyled style={ROOT} preset="scroll">
      <Text preset="header" text='Sem localizar' onPress={loadWeather}/>

      <CardStyled onPress={tryToGetLocation}>
        <GradientBackground colors={["#3C6FD1", "#B0C1FC"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}/>
        <CloundAndRain>
          {/* <Text fontSize="14px" text={temp?.current?.temp as unknown as string ?? 'Change de chuva 60%'}/> */}
          <Text fontSize="24px" style={{ textTransform: 'capitalize', fontSize: 18, paddingTop: 5 }} text={temp?.current?.weather?.[0]?.description as unknown as string ?? 'Parcialmente nublado'}/>
          {hasImage && <AutoImage source={{ uri: `http://openweathermap.org/img/wn/${hasImage}@2x.png`}} style={{
            width: 75,
            height: 75,
            resizeMode: 'cover',
            transform: [
              {scale: 1.3}
            ]
          }}/> }
        </CloundAndRain>

        <Local>
          {/* <Icon/> */}


          <Text text={temp?.current?.temp as unknown as string ?? 'Arcoverde, PE, BRAZIL'}/>
        </Local>

        <TemperatureRatings>
          <Text preset="header"  text={temp?.current?.temp && `${Math.floor(temp?.current?.temp)}°C` as unknown as string || '19ºC'}/>

          <SubRatings>
            <Icon icon="humidity" size={getHeightSize(16)}/>
            <Text preset="header" style={{ fontSize: 12, marginLeft: -12 }} text={temp?.current?.temp && `${Math.floor(temp?.current?.humidity)}%` as unknown as string || ''}/>
            <Icon icon="uvi" size={getHeightSize(16)}/>
            <Text preset="header" style={{ fontSize: 12, marginLeft: -12 }} text={temp?.current?.uvi as unknown as string || ''}/>
            <Icon icon="windSpeed" size={getHeightSize(16)}/>
            <Text preset="header" style={{ fontSize: 12, marginLeft: -12 }} text={`${temp?.current?.wind_speed} km/h` as unknown as string || ''}/>
          </SubRatings>
        </TemperatureRatings>

      </CardStyled>


    </ScreenStyled>
  )
}
