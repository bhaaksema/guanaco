import systemK from "../data/SystemK";
import systemS5 from "../data/SystemS5";
import systemPA from "../data/SystemPA";
import systemKEC from "../data/SystemKEC";
import systemS5EC from "../data/SystemS5EC";
import systemPAC from "../data/SystemPAC";
import shortcuts from "../data/Shortcuts";
import shortcutsEC from "../data/ShortcutsEC";

/**
 * @param {number} m - The number of agents
 * @returns {Object} - An object containing all systems
 */
function systems(m) {
  const common = ["KEC", "S5EC", "PAC"];
  const res = {
    K: systemK,
    S5: systemS5,
    KEC: systemKEC(m),
    S5EC: systemS5EC(m),
    PA: systemPA,
    PAC: systemPAC(m),
  };

  // sort systems alphabetically and add shortcuts
  for (const sys in res) {
    res[sys] = res[sys]
      .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))
      .concat(shortcuts);
    if (common.includes(sys)) res[sys] = res[sys].concat(shortcutsEC);
  }

  return res;
}

export default systems;
