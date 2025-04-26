export type GenerateRMSContentParams = {
  baseTerrain: string;
  borderFuzziness: number;
  clumpingFactor: number;
  forestPercent: number;
  waterPercent: number;
  elevationIntensity: string;
  relicCount: number;
  huntableCount: number;
  watchTowerCount: number;
  startingGold: string;
};

const generateRMSContent = (params: GenerateRMSContentParams) => {
  return `/* Generated RMS */
#define CUSTOM_MAP
<PLAYER_SETUP>
  random_placement
  ai_info_map_type ARABIA 0 0 0
<LAND_GENERATION>
base_terrain ${params.baseTerrain}
create_player_lands
{
  terrain_type ${params.baseTerrain}
  land_percent 0
  base_size 12
  border_fuzziness ${params.borderFuzziness}
  clumping_factor ${params.clumpingFactor}
}
create_land
{
  terrain_type ${params.baseTerrain}
  land_percent 100
  base_size 55
  border_fuzziness ${params.borderFuzziness}
  clumping_factor ${params.clumpingFactor}
}
<TERRAIN_GENERATION>
create_terrain WOODIES
{
  base_terrain ${params.baseTerrain}
  land_percent ${params.forestPercent}
  number_of_clumps 24
  clumping_factor ${params.clumpingFactor}
}
create_terrain VODA
{
  base_terrain ${params.baseTerrain}
  land_percent ${params.waterPercent}
  number_of_clumps 4
}
<OBJECTS_GENERATION>
create_object RELIC
{
  number_of_objects ${params.relicCount}
}
create_object GOLD
{
  number_of_objects ${params.startingGold === "None" ? 0 : params.startingGold === "Small" ? 2 : params.startingGold === "Medium" ? 4 : 6}
}
create_object HUNTABLE
{
  number_of_objects ${params.huntableCount}
}
create_object WATCH_TOWER
{
  number_of_objects ${params.watchTowerCount}
}
<ELEVATION_GENERATION>
#define GNRELEV_INTENSITY_${params.elevationIntensity.toUpperCase()}`;
};

const useRMScontent = (params: GenerateRMSContentParams) => {
  const RMScontent = generateRMSContent(params);

  return { data: RMScontent };
};

export default useRMScontent;
