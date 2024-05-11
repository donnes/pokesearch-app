import { z } from "zod";

export const NamedAPIResourceSchema = z.object({
  /** The name of the referenced resource. */
  name: z.string(),
  /** The URL of the referenced resource. */
  url: z.string(),
});

export type NamedAPIResource = z.infer<typeof NamedAPIResourceSchema>;

export const NameSchema = z.object({
  /** The localized name for an API resource in a specific language. */
  name: z.string(),
  /** (Language) The language this name is in. */
  language: NamedAPIResourceSchema,
});

export const NamedAPIResourceListSchema = z.object({
  /** The total number of resources available from this API. */
  count: z.number(),
  /** The URL for the next page in the list. */
  next: z.string().nullable(),
  /** The URL for the previous page in the list. */
  previous: z.string().nullable(),
  /** A list of named API resources. */
  results: z.array(NamedAPIResourceSchema),
});

export type NamedAPIResourceList = z.infer<typeof NamedAPIResourceListSchema>;

export const LanguageSchema = z.object({
  /** The identifier for this resource. */
  id: z.number(),
  /** The name for this resource. */
  name: z.string(),
  /** Whether or not the games are published in this language. */
  official: z.boolean(),
  /** The two-letter code of the country where this language is spoken. Note that it is not unique. */
  ios639: z.string(),
  /** The two-letter code of the language. Note that it is not unique. */
  iso3166: z.string(),
  /** The name of this resource listed in different languages. */
  names: z.array(NameSchema),
});

export const APIResourceSchema = z.object({
  /** The URL of the referenced resource. */
  url: z.string(),
});

export const DescriptionSchema = z.object({
  /** The localized description for an API resource in a specific language. */
  description: z.string(),
  /** (Language) The language this name is in. */
  language: NamedAPIResourceSchema,
});

export const EffectSchema = z.object({
  /** The localized effect text for an API resource in a specific language. */
  effect: z.string(),
  /** (Language) The language this effect is in. */
  language: NamedAPIResourceSchema,
});

export const EncounterSchema = z.object({
  /** The lowest level the Pokémon could be encountered at. */
  min_level: z.number(),
  /** The highest level the Pokémon could be encountered at. */
  max_level: z.number(),
  /** (EncounterConditionValue[]) A list of condition values that must be in effect for this encounter to occur. */
  condition_values: z.array(NamedAPIResourceSchema),
  /** Percent chance that this encounter will occur. */
  chance: z.number(),
  /** (EncounterMethod) The method by which this encounter happens. */
  method: NamedAPIResourceSchema,
});

export const FlavorTextSchema = z.object({
  /** The localized flavor text for an API resource in a specific language. */
  flavor_text: z.string(),
  /** (Language) The language this name is in. */
  language: NamedAPIResourceSchema,
  /** (Version) The game version this flavor text is extracted from. */
  version: NamedAPIResourceSchema,
});

export const GenerationGameIndexSchema = z.object({
  /** The internal id of an API resource within game data. */
  game_index: z.number(),
  /** (Generation) The generation relevant to this game index. */
  generation: NamedAPIResourceSchema,
});

export const MachineVersionDetailSchema = z.object({
  /** (Machine) The machine that teaches a move from an item. */
  machine: APIResourceSchema,
  /** (VersionGroup) The version group of this specific machine. */
  version_group: NamedAPIResourceSchema,
});

export const VerboseEffectSchema = z.object({
  /** The localized effect text for an API resource in a specific language. */
  effect: z.string(),
  /** The localized effect text in brief. */
  short_effect: z.string(),
  /** (Language) The language this effect is in. */
  language: NamedAPIResourceSchema,
});

export const VersionEncounterDetailSchema = z.object({
  /** (Version) The game version this encounter happens in. */
  version: NamedAPIResourceSchema,
  /** The total percentage of all encounter potential. */
  max_chance: z.number(),
  /** A list of encounters and their specifics. */
  encounter_details: z.array(EncounterSchema),
});

export const VersionGameIndexSchema = z.object({
  /** The internal id of an API resource within game data. */
  game_index: z.number(),
  /** (Version) The version relevant to this game index. */
  version: NamedAPIResourceSchema,
});

export const VersionGroupFlavorTextSchema = z.object({
  /** The localized name for an API resource in a specific language. */
  text: z.string(),
  /** (Language) The language this name is in. */
  language: NamedAPIResourceSchema,
  /** (VersionGroup) The version group which uses this flavor text. */
  version_group: NamedAPIResourceSchema,
});
