export interface IMongoDbState {
    getUrl(): string;
    getDatabase(): string;
    getMoleculesCollection(): string;
    getPositionMatricesCollection(): string;
}
