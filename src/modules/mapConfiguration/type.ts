export type Option = {
  label: string;
  value: string;
};

export type ComponentType = "input" | "singleSelect" | "slider";

export type ConfigurationFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string | number;
  options?: Option[];
  componentType: ComponentType;
  range?: number[];
  sliderUnit?: string;
};
