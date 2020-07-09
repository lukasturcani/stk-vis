import { Db } from 'mongodb';
import {
    IPartialMolecule,
} from '../../types';


export type IStageOneResult
    = [Db, string[], IPartialMolecule[]];
