import { FanDevice as Device } from "@matter/main/devices";
import { OnOffServer } from "../behaviors/on-off-server.js";
import { BasicInformationServer } from "../behaviors/basic-information-server.js";
import { IdentifyServer } from "../behaviors/identify-server.js";
import { FanControlServer } from "../behaviors/fan-control-server.js";
import {
  LevelControlConfig,
  LevelControlServer,
} from "../behaviors/level-control-server.js";
import {
  FanDeviceAttributes,
  FanDeviceFeature,
  HomeAssistantEntityState,
} from "@home-assistant-matter-hub/common";
import { HomeAssistantEntityBehavior } from "../custom-behaviors/home-assistant-entity-behavior.js";
import { EndpointType } from "@matter/main";

const fanLevelConfig: LevelControlConfig = {
  getValue: (state: HomeAssistantEntityState<FanDeviceAttributes>) => {
    if (state.attributes.percentage != null) {
      return (state.attributes.percentage / 100) * 254;
    }
    return 0;
  },
  getMinValue: () => 0,
  getMaxValue: () => 254,
  moveToLevel: {
    action: "fan.set_percentage",
    data: (value) => ({ percentage: (value / 254) * 100 }),
  },
};

export function FanDevice(
  homeAssistantEntity: HomeAssistantEntityBehavior.State,
): EndpointType {
  const features: ("Auto" | "AirflowDirection" | "MultiSpeed")[] = [
    "MultiSpeed",
  ];
  const attributes = homeAssistantEntity.entity.state
    .attributes as FanDeviceAttributes;
  const presetModes: string[] = attributes.preset_modes ?? [];
  const supportedFeatures = attributes.supported_features ?? 0;

  if (
    supportedFeatures & FanDeviceFeature.PRESET_MODE &&
    presetModes.indexOf("Auto") != -1
  ) {
    features.push("Auto");
  }
  if (supportedFeatures & FanDeviceFeature.DIRECTION) {
    features.push("AirflowDirection");
  }
  const deviceType = Device.with(
    IdentifyServer,
    BasicInformationServer,
    OnOffServer,
    HomeAssistantEntityBehavior,
    LevelControlServer.set({ config: fanLevelConfig }),
    FanControlServer.with(...features),
  );

  return deviceType.set({ homeAssistantEntity });
}
