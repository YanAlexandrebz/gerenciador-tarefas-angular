export class Tarefa {
    toLocaleLowerCase() {
      throw new Error('Method not implemented.');
    }
    constructor(
        public id: string,
        public nome: string,
        public concluido: boolean
    ) {}
}