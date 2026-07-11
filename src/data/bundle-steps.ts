import CameraIcon from "@/assets/svg/livestream.svg";
import PlanIcon from "@/assets/svg/plan.svg";
import SensorIcon from "@/assets/svg/sensor.svg";
import ShieldIcon from "@/assets/svg/shield.svg";

export const bundleSteps = [
  {
    id: "cameras",
    value: "cameras",
    step: 1,
    totalSteps: 4,
    title: "Choose your cameras",
    icon: CameraIcon,
    nextStep: "Next: Choose your plan",
  },
  {
    id: "plan",
    value: "plan",
    step: 2,
    totalSteps: 4,
    title: "Choose your plan",
    icon: ShieldIcon,
    nextStep: "Next: Choose your sensors",
  },
  {
    id: "sensors",
    value: "sensors",
    step: 3,
    totalSteps: 4,
    title: "Next: Choose your sensors",
    icon: SensorIcon,
    nextStep: "Add extra protection",
  },
  {
    id: "accessories",
    value: "accessories",
    step: 4,
    totalSteps: 4,
    title: "Next: Add extra protection",
    icon: PlanIcon,
    nextStep: null,
  },
];
