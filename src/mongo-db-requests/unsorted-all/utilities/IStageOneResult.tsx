import { Db } from 'mongodb';
import {
    IPartialMolecules,
} from '../../types';


export type IStageOneResult
    = [Db, string[], IPartialMolecules];
