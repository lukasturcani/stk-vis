import {
    MongoClient,
} from 'mongodb';
import {
    IMolecule,
} from '../../types';


export type IStageOneResult
    = [MongoClient, string[], IMolecule[]];
