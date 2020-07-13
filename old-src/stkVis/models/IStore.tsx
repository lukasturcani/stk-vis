import { EnhancedStore } from '@reduxjs/toolkit';
import { IState } from './IState';


export type IStore = EnhancedStore<IState>;
