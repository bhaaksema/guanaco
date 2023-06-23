import systemK from "../data/SystemK";
import systemT from "../data/SystemT";
import systemS4 from "../data/SystemS4";
import systemS5 from "../data/SystemS5";
import systemPA from "../data/SystemPA";
import systemKEC from "../data/SystemKEC";
import systemTEC from "../data/SystemTEC";
import systemS4EC from "../data/SystemS4EC";
import systemS5EC from "../data/SystemS5EC";
import systemPAC from "../data/SystemPAC";
import shortcuts from "../data/Shortcuts";
import shortcutsEC from "../data/ShortcutsEC";

/**
 * @param {number} m - The number of agents
 * @returns {Object} - An object containing all systems
 */
function systems(m) {
  const res = {
    K: systemK,
    T: systemT,
    S4: systemS4,
    S5: systemS5,
    PA: systemPA,
    KEC: systemKEC(m),
    TEC: systemTEC(m),
    S4EC: systemS4EC(m),
    S5EC: systemS5EC(m),
    PAC: systemPAC(m),
  };

  // sort systems alphabetically and add shortcuts
  for (const sys in res) {
    res[sys] = res[sys]
      .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))
      .concat(shortcuts);
    if (sys.includes("C")) res[sys] = res[sys].concat(shortcutsEC);
  }

  return res;
}

export default systems;
