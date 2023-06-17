import systemS5 from "./SystemS5";
import systemKEC from "./SystemKEC";

const systemS5EC = [
  ...new Set([...systemS5, ...systemKEC]),
];

export default systemS5EC;
