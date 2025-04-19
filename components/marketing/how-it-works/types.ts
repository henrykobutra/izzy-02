import { Icon } from "@tabler/icons-react";


export interface Step {
  id: number;
  title: string;
  description: string;
  icon: Icon;
  color: string;
  lightColor: string;
}

export interface VisualizationProps {
  activeStep: number;
}
