import Co2Icon from '@mui/icons-material/Co2';
import { CarbonDioxideConcentrationMeasurementClusterState } from "@home-assistant-matter-hub/common";

export interface CarbonDioxideMeasurementProps {
  state: CarbonDioxideConcentrationMeasurementClusterState;
}

export const CarbonDioxideConcentrationMeasurementState = ({
  state,
}: CarbonDioxideMeasurementProps) => {
  if (state.measuredValue == null) {
    return <Co2Icon fontSize="medium" />;
  }
  return (
    <>
      <Co2Icon fontSize="medium" />
      <span>{state.measuredValue} ppm</span>
    </>
  );
};
