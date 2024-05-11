import { z } from "zod";
import {
  APIResourceSchema,
  DescriptionSchema,
  EffectSchema,
  FlavorTextSchema,
  NameSchema,
  NamedAPIResourceSchema,
  VerboseEffectSchema,
  VersionEncounterDetailSchema,
  VersionGameIndexSchema,
} from "./shared";

export const AbilityEffectChangeSchema = z.object({
  effect_entries: z.array(EffectSchema),
  version_group: NamedAPIResourceSchema,
});

export const AbilityFlavorTextSchema = z.object({
  flavor_text: z.string(),
  language: NamedAPIResourceSchema,
  version_group: NamedAPIResourceSchema,
});

export const AbilityPokemonSchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  pokemon: NamedAPIResourceSchema,
});

export const CharacteristicSchema = z.object({
  id: z.number(),
  gene_modulo: z.number(),
  possible_values: z.array(z.number()),
});

export const EggGroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(NameSchema),
  pokemon_species: z.array(NamedAPIResourceSchema),
});

export const PokemonSpeciesGenderSchema = z.object({
  rate: z.number(),
  pokemon_species: NamedAPIResourceSchema,
});

export const GrowthRateExperienceLevelSchema = z.object({
  level: z.number(),
  experience: z.number(),
});

export const NatureStatChangeSchema = z.object({
  max_change: z.number(),
  pokeathlon_stat: NamedAPIResourceSchema,
});

export const MoveBattleStylePreferenceSchema = z.object({
  low_hp_preference: z.number(),
  high_hp_preference: z.number(),
  move_battle_style: NamedAPIResourceSchema,
});

export const NaturePokeathlonStatAffectSchema = z.object({
  max_change: z.number(),
  nature: NamedAPIResourceSchema,
});

export const PokemonAbilitySchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  ability: NamedAPIResourceSchema,
});

export const PokemonSpritesSchema = z.object({
  front_default: z.string(),
  front_shiny: z.string(),
  front_female: z.string(),
  front_shiny_female: z.string(),
  back_default: z.string(),
  back_shiny: z.string(),
  back_female: z.string(),
  back_shiny_female: z.string(),
  other: z.any().optional(),
  versions: z.any().optional(),
});

export const PokemonStatSchema = z.object({
  stat: NamedAPIResourceSchema,
  effort: z.number(),
  base_stat: z.number(),
});

export const PokemonTypeSchema = z.object({
  slot: z.number(),
  type: NamedAPIResourceSchema,
});

export const PokemonHeldItemVersionSchema = z.object({
  version: NamedAPIResourceSchema,
  rarity: z.number(),
});

export const PokemonMoveVersionSchema = z.object({
  move_learn_method: NamedAPIResourceSchema,
  version_group: NamedAPIResourceSchema,
  level_learned_at: z.number(),
});

export const LocationAreaEncounterSchema = z.object({
  location_area: NamedAPIResourceSchema,
  version_details: z.array(VersionEncounterDetailSchema),
});

export const PokemonColorSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(NameSchema),
  pokemon_species: z.array(NamedAPIResourceSchema),
});

export const PokemonFormSpritesSchema = z.object({
  front_default: z.string(),
  front_shiny: z.string(),
  back_default: z.string(),
  back_shiny: z.string(),
});

export const PokemonHabitatSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(NameSchema),
  pokemon_species: z.array(NamedAPIResourceSchema),
});

export const AwesomeNameSchema = z.object({
  awesome_name: z.string(),
  language: NamedAPIResourceSchema,
});

export const PokemonSpeciesDexEntrySchema = z.object({
  entry_number: z.number(),
  pokedex: NamedAPIResourceSchema,
});

export const PalParkEncounterAreaSchema = z.object({
  base_score: z.number(),
  rate: z.number(),
  area: NamedAPIResourceSchema,
});

export const GenusSchema = z.object({
  genus: z.string(),
  language: NamedAPIResourceSchema,
});

export const PokemonSpeciesVarietySchema = z.object({
  is_default: z.boolean(),
  pokemon: NamedAPIResourceSchema,
});

export const AbilitySchema = z.object({
  id: z.number(),
  name: z.string(),
  is_main_series: z.boolean(),
  generation: NamedAPIResourceSchema,
  names: z.array(NameSchema),
  effect_entries: z.array(VerboseEffectSchema),
  effect_changes: z.array(AbilityEffectChangeSchema),
  flavor_text_entries: z.array(AbilityFlavorTextSchema),
  pokemon: z.array(AbilityPokemonSchema),
});

export const GenderSchema = z.object({
  id: z.number(),
  name: z.string(),
  pokemon_species_details: z.array(PokemonSpeciesGenderSchema),
  required_for_evolution: z.array(NamedAPIResourceSchema),
});

export const GrowthRateSchema = z.object({
  id: z.number(),
  name: z.string(),
  formula: z.string(),
  descriptions: z.array(DescriptionSchema),
  levels: z.array(GrowthRateExperienceLevelSchema),
  pokemon_species: z.array(NamedAPIResourceSchema),
});

export const NatureSchema = z.object({
  id: z.number(),
  name: z.string(),
  decreased_stat: NamedAPIResourceSchema,
  increased_stat: NamedAPIResourceSchema,
  hates_flavor: NamedAPIResourceSchema,
  likes_flavor: NamedAPIResourceSchema,
  pokeathlon_stat_changes: z.array(NatureStatChangeSchema),
  move_battle_style_preferences: z.array(MoveBattleStylePreferenceSchema),
  names: z.array(NameSchema),
});

export const NaturePokeathlonStatAffectSetsSchema = z.object({
  increase: z.array(NaturePokeathlonStatAffectSchema),
  decrease: z.array(NaturePokeathlonStatAffectSchema),
});

export const PokemonHeldItemSchema = z.object({
  item: NamedAPIResourceSchema,
  version_details: z.array(PokemonHeldItemVersionSchema),
});

export const PokemonMoveSchema = z.object({
  move: NamedAPIResourceSchema,
  version_group_details: z.array(PokemonMoveVersionSchema),
});

export const PokemonFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
  form_order: z.number(),
  is_default: z.boolean(),
  is_battle_only: z.boolean(),
  is_mega: z.boolean(),
  form_name: z.string(),
  pokemon: NamedAPIResourceSchema,
  sprites: PokemonFormSpritesSchema,
  version_group: NamedAPIResourceSchema,
  names: z.array(NameSchema),
  form_names: z.array(NameSchema),
});

export const PokemonShapeSchema = z.object({
  id: z.number(),
  name: z.string(),
  awesome_names: z.array(AwesomeNameSchema),
  names: z.array(NameSchema),
  pokemon_species: z.array(NamedAPIResourceSchema),
});

export const PokemonSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
  gender_rate: z.number(),
  capture_rate: z.number(),
  base_happiness: z.number(),
  is_baby: z.boolean(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  hatch_counter: z.number(),
  has_gender_differences: z.boolean(),
  forms_switchable: z.boolean(),
  growth_rate: NamedAPIResourceSchema,
  pokedex_numbers: z.array(PokemonSpeciesDexEntrySchema),
  egg_groups: z.array(NamedAPIResourceSchema),
  color: NamedAPIResourceSchema,
  shape: NamedAPIResourceSchema,
  evolves_from_species: NamedAPIResourceSchema,
  evolution_chain: APIResourceSchema,
  habitat: NamedAPIResourceSchema,
  generation: NamedAPIResourceSchema,
  names: z.array(NameSchema),
  pal_park_encounters: z.array(PalParkEncounterAreaSchema),
  flavor_text_entries: z.array(FlavorTextSchema),
  form_descriptions: z.array(DescriptionSchema),
  genera: z.array(GenusSchema),
  varieties: z.array(PokemonSpeciesVarietySchema),
});

export const PokeathlonStatSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(NameSchema),
  affecting_natures: NaturePokeathlonStatAffectSetsSchema,
});

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: z.array(PokemonAbilitySchema),
  forms: z.array(NamedAPIResourceSchema),
  game_indices: z.array(VersionGameIndexSchema),
  held_items: z.array(PokemonHeldItemSchema),
  location_area_encounters: z.string(),
  moves: z.array(PokemonMoveSchema),
  sprites: PokemonSpritesSchema,
  species: NamedAPIResourceSchema,
  stats: z.array(PokemonStatSchema),
  types: z.array(PokemonTypeSchema),
});

export type PokemonSchema = z.infer<typeof PokemonSchema>;
