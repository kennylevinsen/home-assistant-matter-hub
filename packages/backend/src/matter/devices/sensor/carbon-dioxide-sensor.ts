import { AirQualitySensorDevice } from "@matter/main/devices";
import { BasicInformationServer } from "../../behaviors/basic-information-server.js";
import { IdentifyServer } from "../../behaviors/identify-server.js";
import {
  CarbonDioxideConcentrationMeasurementConfig,
  CarbonDioxideConcentrationMeasurementServer,
} from "../../behaviors/carbon-dioxide-concentration-measurement-server.js";
import { HomeAssistantBehavior } from "../../custom-behaviors/home-assistant-behavior.js";
import { HomeAssistantEntityState } from "@home-assistant-matter-hub/common";

export const CarbonDioxideSensorType = AirQualitySensorDevice.with(
  BasicInformationServer,
  IdentifyServer,
  HomeAssistantBehavior,
  CarbonDioxideConcentrationMeasurementServer,
);

export const carbonDioxideSensorConfig: CarbonDioxideConcentrationMeasurementConfig = {
  getValue({ state }: HomeAssistantEntityState) {
    if (state == null || isNaN(+state)) {
      return null;
    }
    return +state;
  },
};
