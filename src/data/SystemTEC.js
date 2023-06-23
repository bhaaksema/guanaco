import systemT from "./SystemT";
import systemKEC from "./SystemKEC";

const systemTEC = (m) => [...new Set([...systemT, ...systemKEC(m)])];

export default systemTEC;
