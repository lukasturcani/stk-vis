import { EnhancedStore } from '@reduxjs/toolkit';
import { IDatabaseBrowser } from './DatabaseBrowser';

export type IStore = EnhancedStore<{
    databaseBrowser: IDatabaseBrowser,
}>;
