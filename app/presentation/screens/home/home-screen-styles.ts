import styled from 'styled-components/native'
import { Screen, Text } from "~/presentation/components"

export const ScreenStyled = styled(Screen)`
  padding-top: 20px;

  align-items: center;
  justify-content: flex-start;
`

export const CardStyled = styled.View`
  width: 324px;
  height: 205px;

  padding: 0px 22px;

  border-radius: 20px;

  justify-content: space-around;

  background-color: blue;
  overflow: hidden;
`;

export const CloundAndRain = styled.View`
  flex: 2;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const Local = styled.View`
  flex:1;
`;

export const TemperatureRatings = styled.View`
  flex: 1;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const SubRatings = styled.View`
  flex: 1;

  flex-direction: row;

  justify-content: space-between;

  margin-left: 14px;
`
