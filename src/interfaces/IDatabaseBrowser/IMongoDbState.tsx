export interface IMongoDbState {
    readonly url: string;
    readonly database: string;
    readonly moleculesCollection: string;
    readonly positionMatricesCollection: string;
}
