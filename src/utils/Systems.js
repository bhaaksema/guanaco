import systemK from "../data/SystemK";
import systemS5 from "../data/SystemS5";
import systemPA from "../data/SystemPA";
import systemKEC from "../data/SystemKEC";
import systemS5EC from "../data/SystemS5EC";
import systemPAC from "../data/SystemPAC";
import shortcuts from "../data/Shortcuts";
import shortcutsEC from "../data/ShortcutsEC";

const systems = (m) => {
  return {
    K: systemK,
    S5: systemS5,
    KEC: systemKEC(m),
    S5EC: systemS5EC(m),
    PA: systemPA,
    PAC: systemPAC(m),
  };
};

const common = ["KEC", "S5EC", "PAC"];

for (const sys in systems) {
  systems[sys] = systems[sys]
    .sort((a, b) => a.name.localeCompare(b.name))
    .concat(shortcuts);
  if (common.includes(sys)) systems[sys] = systems[sys].concat(shortcutsEC);
}

export default systems;
