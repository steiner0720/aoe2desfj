import { useMemo } from "react";

import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import SingleSelect from "@/components/select/SingleSelect";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import useMapConfigurationFields from "@/hooks/useMapConfigurationFields";

import { ConfigurationFieldType } from "./type";

function ConfigurationField({
  value,
  defaultValue,
  options,
  range,
  onChange,
  componentType,
  sliderUnit,
}: Readonly<
  ConfigurationFieldType & ControllerRenderProps<FieldValues, string>
>) {
  const renderField = useMemo(() => {
    if (componentType === "singleSelect") {
      return (
        <SingleSelect
          defaultValue={value ?? defaultValue}
          onChange={onChange}
          options={options}
        />
      );
    }

    if (componentType === "input") {
      return (
        <Input
          placeholder="input the map name"
          value={value ?? defaultValue}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      );
    }

    if (componentType === "slider") {
      return (
        <div className="flex w-full items-center gap-4 px-2">
          <Slider
            defaultValue={[value ?? defaultValue ?? 0]}
            max={range?.[1] ?? 0}
            step={1}
            onChange={(event) => {
              const updateValue =
                (event?.target as HTMLInputElement)?.value ?? 0;
              onChange(Number(updateValue));
            }}
          />
          <div className="whitespace-nowrap">{`${value ?? defaultValue ?? 0} ${sliderUnit ?? ""}`}</div>
        </div>
      );
    }

    return <div>{value}</div>;
  }, [
    componentType,
    defaultValue,
    onChange,
    options,
    range,
    sliderUnit,
    value,
  ]);

  return renderField;
}

function MapConfigurations() {
  const form = useFormContext();

  const { data } = useMapConfigurationFields();
  const { basic = [], advanced = [] } = data ?? {};

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-full flex-col gap-4 rounded-md border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200">
        <div className="text-lg font-bold whitespace-nowrap">
          Basic Configuration
        </div>
        <div className="flex flex-col gap-4">
          {basic.map((configure) => (
            <FormField
              key={configure.name}
              control={form.control}
              name={configure.name}
              render={({ field }) => {
                const ComponentProps = { ...field, ...configure };
                return (
                  <FormItem>
                    <FormLabel>{configure.label}</FormLabel>
                    <FormControl>
                      <ConfigurationField {...ComponentProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-md border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200">
        <div className="text-lg font-bold whitespace-nowrap">
          Advanced Configuration
        </div>
        <div className="flex flex-col gap-4">
          {advanced.map((configure) => (
            <FormField
              key={configure.name}
              control={form.control}
              name={configure.name}
              render={({ field }) => {
                const ComponentProps = { ...field, ...configure };
                return (
                  <FormItem>
                    <FormLabel>{configure.label}</FormLabel>
                    <FormControl>
                      <ConfigurationField {...ComponentProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapConfigurations;
