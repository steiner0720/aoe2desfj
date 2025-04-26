import { useMemo } from "react";

import { z } from "zod";

import { ConfigurationFieldType } from "@/modules/mapConfiguration/type";

const basicConfigureFields: ConfigurationFieldType[] = [
  {
    name: "mapName",
    label: "地圖名稱 (Map Name)",
    placeholder: "input the map name",
    defaultValue: "Map Name",
    componentType: "input",
  },
  {
    name: "mapSize",
    label: "地圖尺寸 (Map Size)",
    placeholder: "select the map size",
    options: [
      { label: "Tinny Map", value: "TINY_MAP" },
      { label: "Small Map", value: "SMALL_MAP" },
      { label: "Medium Map", value: "MEDIUM_MAP" },
      { label: "Large Map", value: "LARGE_MAP" },
    ],
    defaultValue: "MEDIUM_MAP",
    componentType: "singleSelect",
  },
  {
    name: "baseTerrain",
    label: "基礎地形 (Base Terrain)",
    placeholder: "select the base terrain",
    options: [
      { label: "Grass", value: "GRASS" },
      { label: "Desert", value: "DESERT" },
      { label: "Water", value: "WATER" },
      { label: "Snow", value: "SNOW" },
      { label: "Dirt", value: "DIRT" },
    ],
    defaultValue: "GRASS",
    componentType: "singleSelect",
  },
  {
    name: "forestPercent",
    label: "森林百分比 (Forest Percent)",
    defaultValue: 8,
    range: [0, 20],
    sliderUnit: "%",
    componentType: "slider",
  },
  {
    name: "waterPercent",
    label: "水域百分比 (Water Percent)",
    defaultValue: 0,
    range: [0, 30],
    sliderUnit: "%",
    componentType: "slider",
  },
  {
    name: "relicCount",
    label: "遺物數量 (Relic Count)",
    defaultValue: 5,
    range: [1, 10],
    sliderUnit: "",
    componentType: "slider",
  },
  {
    name: "startingGold",
    label: "起始金礦 (Starting Gold)",
    placeholder: "select the starting gold",
    options: [
      { label: "None", value: "None" },
      { label: "Small", value: "Small" },
      { label: "Medium", value: "Medium" },
      { label: "Large", value: "Large" },
    ],
    defaultValue: "Medium",
    componentType: "singleSelect",
  },
];

const advancedConfigureFields: ConfigurationFieldType[] = [
  {
    name: "huntableCount",
    label: "狩獵動物數量 (Huntable Count)",
    defaultValue: 4,
    range: [0, 20],
    sliderUnit: "",
    componentType: "slider",
  },
  {
    name: "elevationIntensity",
    label: "高度變化 (Elevation Intensity)",
    placeholder: "select the elevation intensity",
    options: [
      { label: "Flat", value: "Flat" },
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
    ],
    defaultValue: "Low",
    componentType: "singleSelect",
  },
  {
    name: "clumpingFactor",
    label: "地形聚集度 (Clumping Factor)",
    range: [0, 200],
    sliderUnit: "",
    defaultValue: 100,
    componentType: "slider",
  },
  {
    name: "borderFuzziness",
    label: "邊界模糊度 (Border Fuzziness)",
    range: [0, 50],
    sliderUnit: "",
    defaultValue: 15,
    componentType: "slider",
  },
  {
    name: "watchTowerCount",
    label: "箭塔數量 (Watch Tower Count)",
    range: [0, 10],
    sliderUnit: "",
    defaultValue: 0,
    componentType: "slider",
  },
];

const configureFields = [...basicConfigureFields, ...advancedConfigureFields];

const useMapConfigurationFields = () => {
  const formSchema = useMemo(() => {
    const fieldToZodSchema = (field: ConfigurationFieldType) => {
      switch (field.componentType) {
        case "singleSelect":
          return z.string();
        case "slider":
          return z.number();
        default:
          return z.any();
      }
    };

    const schemaShape = configureFields.reduce(
      (acc, field) => {
        acc[field.name] = fieldToZodSchema(field);
        return acc;
      },
      {} as Record<string, any>
    );

    return z.object(schemaShape);
  }, []);

  const defaultValues = useMemo(() => {
    return configureFields.reduce(
      (acc, field) => {
        if (field.defaultValue !== undefined) {
          acc[field.name] = field.defaultValue;
        }
        return acc;
      },
      {} as Record<string, any>
    );
  }, []);

  const configureData = {
    basic: basicConfigureFields,
    advanced: advancedConfigureFields,
    formSchema,
    defaultValues,
  };

  return { data: configureData };
};

export default useMapConfigurationFields;
