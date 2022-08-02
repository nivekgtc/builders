import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../storybook/views"
import { Icon } from "./icon"

declare let module

storiesOf("Icon", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Names", () => (
    <Story>
      <UseCase text="back" usage="The icon for going back">
        <Icon icon="back" />
      </UseCase>
      <UseCase text="bullet" usage="The icon for a bullet point">
        <Icon icon="bullet" />
      </UseCase>

      <UseCase text="humidity" usage="The icon for show humidity rating">
        <Icon icon="humidity" />
      </UseCase>
      <UseCase text="windSpeed" usage="The icon for show Wind Speed Rating">
        <Icon icon="windSpeed" />
      </UseCase>
      <UseCase text="uvi" usage="The icon for show uvi rating">
        <Icon icon="uvi" />
      </UseCase>
    </Story>
  ))
