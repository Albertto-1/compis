import { actionTale, gotosTable, grammarTable, c } from "../utils/utils";
import { Lexer } from "../lexer/Lexer";
import fs = require("fs");

export class SLRParser {
    private actionTable: actionTale = {};
    private gotosTable: gotosTable = {}
    private grammarTable: grammarTable = {}
    private stack: number[] = [0];
    private symbols: string[] = [];
    private lexer: Lexer = new Lexer();

    constructor(fileName: string) {
        this.lexer.openFile(fileName);
        this.loadActions();
        this.loadGotos();
        this.loadGrammar();
        this.start();
    }

    private loadActions() {
        c('loadingActions...');
        const lines = fs.readFileSync('src/parser/utils/actions_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const actionType = +elements[2];
            const nextState = +elements[3];
            if (this.actionTable[state]) {
                this.actionTable[state][input] = {
                    type: actionType,
                    state: nextState
                }
            } else {
                this.actionTable[state] = {
                    [input]: {
                        type: actionType,
                        state: nextState
                    }
                }
            }
        });
        c('actionsLoaded!');
    }

    private loadGotos() {
        c('loadingGotos...');
        const lines = fs.readFileSync('src/parser/utils/gotos_table.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const nextState = +elements[2];
            if (this.gotosTable[state]) {
                this.gotosTable[state][input] = {
                    state: nextState
                }
            } else {
                this.gotosTable[state] = {
                    [input]: {
                        state: nextState
                    }
                }
            }
        });
        c('gotosLoaded!');
    }

    private loadGrammar() {
        c('loadingGrammar...');
        const lines = fs.readFileSync('src/parser/utils/grammar.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);
        lines.forEach(line => {
            const elements = line.split(',');
            const state = +elements[0];
            const input = elements[1];
            const positions = +elements[2];
            if (this.grammarTable[state]) {
                this.grammarTable[state][input] = positions;
            } else {
                this.grammarTable[state] = {
                    [input]: positions
                }
            }
        });
        c('grammarLoaded!');
    }

    private start() {
        
    }
}