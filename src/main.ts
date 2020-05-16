import { LexicalAnalizer } from "./lexer/Lexer";
import { Tag } from "./lexer/Tag";

const defaultFile = 'Examples/Example1.pas';
const lexer = new LexicalAnalizer();
if (process.argv[2] !== undefined) {
  lexer.openFile('Examples/Example' + process.argv[2] + '.pas');
}else {
  lexer.openFile(defaultFile);
}
let token = lexer.scan();
do{
  console.log(token.toString());
  token = lexer.scan();
} while(token.tag !== Tag.EOF);
// console.log(token.toString());
