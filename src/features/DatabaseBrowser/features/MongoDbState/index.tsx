import {
    mongoDbUrl,
    mongoDbDatabase,
    mongoDbCollections,
} from './slices';


export const MongoDbState: IFeature = {
    actions: {
        ...mongoDbUrl.actions,
        ...mongoDbDatabase.actions,
        ...mongoDbCollections.actions,
    },
    reducers: {
        mongoDbUrl: mongoDbUrl.reducer,
        mongoDbDatabase: mongoDbDatabase.reducer,
        mongoDbCollections: mongoDbCollections.reducer,
    },
    components: {
    },
};
