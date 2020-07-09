import {
    MongoClient,
} from 'mongodb';
import {
    IPartialMolecule,
} from '../../types';


export type IStageOneResult
    = [MongoClient, string[], IPartialMolecule[]];
