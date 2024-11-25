import { CarbonDioxideConcentrationMeasurementServer as Base } from "@matter/main/behaviors";
import { ConcentrationMeasurement } from "@matter/main/clusters";
import { HomeAssistantEntityState } from "@home-assistant-matter-hub/common";
import { HomeAssistantBehavior } from "../custom-behaviors/home-assistant-behavior.js";
import { applyPatchState } from "../../utils/apply-patch-state.js";


const FeaturedBase = Base.with("NumericMeasurement");

export interface CarbonDioxideConcentrationMeasurementConfig {
  getValue: (state: HomeAssistantEntityState) => number | null;
}

export class CarbonDioxideConcentrationMeasurementServer extends FeaturedBase {
  declare state: CarbonDioxideConcentrationMeasurementServer.State;

  override async initialize() {
    await super.initialize();
    const homeAssistant = await this.agent.load(HomeAssistantBehavior);
    this.update(homeAssistant.entity);
    this.reactTo(homeAssistant.onChange, this.update);
  }

  private update(state: HomeAssistantEntityState) {
    const co2 = this.state.config.getValue(state);
    applyPatchState(this.state, {
      measurementMedium: ConcentrationMeasurement.MeasurementMedium.Air,
      ...(this.features.numericMeasurement ? {
        measuredValue: co2,
        measurementUnit: ConcentrationMeasurement.MeasurementUnit.Ppm,
      } : {}),
    });
  }
}

export namespace CarbonDioxideConcentrationMeasurementServer {
  export class State extends FeaturedBase.State {
    config!: CarbonDioxideConcentrationMeasurementConfig;
  }
}
