import systemS4 from "./SystemS4";
import systemKEC from "./SystemKEC";

const systemS4EC = (m) => [...new Set([...systemS4, ...systemKEC(m)])];

export default systemS4EC;
