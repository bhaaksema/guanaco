import systemS5 from "./SystemS5";
import systemKEC from "./SystemKEC";

const systemS5EC = (m) => [...new Set([...systemS5, ...systemKEC(m)])];

export default systemS5EC;
