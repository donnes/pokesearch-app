import * as pokenode from "pokenode-ts";

declare module "pokenode-ts" {
  interface NamedAPIResource {
    /** The name of the referenced resource */
    name: string;
    /** The URL of the referenced resource */
    url: string;
    /** Whether the resource is a favorite */
    isFavorite: boolean;
  }
}
