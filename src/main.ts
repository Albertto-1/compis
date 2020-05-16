import { SLRParser } from "./parser/SLRParser";

let fileName = 'Examples/Example';
if (process.argv[2] !== undefined) {
  fileName += process.argv[2] + '.pas';
} else {
  fileName += '1.pas';
}
const slr = new SLRParser(fileName);
