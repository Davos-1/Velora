/**
 * Registry of all product JSON files. Imported at build time so the catalogue
 * works on Cloudflare Workers (no filesystem access at runtime).
 * Add every new file here – `pnpm validate:products` fails if one is missing.
 */
import baelle3erDose from "./baelle-3er-dose.json";
import ellbogenStuetzstrumpf from "./ellbogen-stuetzstrumpf.json";
import gitterBasis from "./gitter-basis.json";
import overgripEinzeln from "./overgrip-einzeln.json";
import overgrips3erSet from "./overgrips-3er-set.json";
import padelRucksack from "./padel-rucksack.json";
import padelcamMount from "./padelcam-mount.json";
import paleteroTasche from "./paletero-tasche.json";
import racketControl from "./racket-control.json";
import racketPower from "./racket-power.json";
import racketWandhalterung from "./racket-wandhalterung.json";
import setBasisCamMount from "./set-basis-cam-mount.json";
import setBasisWandhalterung from "./set-basis-wandhalterung.json";

/** [source file name, raw JSON] – the name is used in validation errors. */
export const rawProducts: ReadonlyArray<readonly [string, unknown]> = [
  ["baelle-3er-dose.json", baelle3erDose],
  ["ellbogen-stuetzstrumpf.json", ellbogenStuetzstrumpf],
  ["gitter-basis.json", gitterBasis],
  ["overgrip-einzeln.json", overgripEinzeln],
  ["overgrips-3er-set.json", overgrips3erSet],
  ["padel-rucksack.json", padelRucksack],
  ["padelcam-mount.json", padelcamMount],
  ["paletero-tasche.json", paleteroTasche],
  ["racket-control.json", racketControl],
  ["racket-power.json", racketPower],
  ["racket-wandhalterung.json", racketWandhalterung],
  ["set-basis-cam-mount.json", setBasisCamMount],
  ["set-basis-wandhalterung.json", setBasisWandhalterung],
];
