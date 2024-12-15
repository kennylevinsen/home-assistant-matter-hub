export enum FanControlFanMode {
  Off = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  On = 4,
  Auto = 5,
  Smart = 6,
}

export enum FanControlAirflowDirection {
  Forward = 0,
  Reverse = 1,
}

export enum FanControlFanModeSequence {
  OffLowMedHigh = 0,
  OffLowHigh = 1,
  OffLowMedHighAuto = 2,
  OffLowHighAuto = 3,
  OffHighAuto = 4,
  OffHigh = 5,
}

export enum RockBitmap {
  RockLeftRight = 0,
  RockUpDown = 1,
  RockRound = 2,
}

export interface FanControlClusterState {
  fanMode?: FanControlFanMode;
  fanModeSequence?: FanControlFanModeSequence;
  percentSetting?: number;
  percentCurrent?: number;
  speedMax?: number;
  speedSetting?: number;
  speedCurrent?: number;
  airflowDirection?: FanControlAirflowDirection;
  rockSupport: RockBitmap,
  rockSetting: RockBitmap,
}
