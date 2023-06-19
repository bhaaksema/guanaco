import systemK from "./SystemK";
import systemS5 from "./SystemS5";
import systemPA from "./SystemPA";
import systemKEC from "./SystemKEC";
import systemS5EC from "./SystemS5EC";
import systemPAC from "./SystemPAC";
import shortcuts from "./Shortcuts";
import shortcutsEC from "./ShortcutsEC";

const systems = {
  K: systemK,
  S5: systemS5,
  KEC: systemKEC,
  S5EC: systemS5EC,
  PA: systemPA,
  PAC: systemPAC,
};

const common = ["KEC", "S5EC", "PAC"];

for (const sys in systems) {
  systems[sys] = systems[sys]
    .sort((a, b) => a.name.localeCompare(b.name))
    .concat(shortcuts);
  if (common.includes(sys)) systems[sys] = systems[sys].concat(shortcutsEC);
}

export default systems;
