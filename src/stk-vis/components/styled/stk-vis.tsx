import * as React from 'react';
import { StkVis as StkVisBase } from 'stk-vis/components/stk-vis';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


interface Props
{
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}


export function StkVis(
    props: Props,
)
{
    return <StkVisBase
        updateFields={ props.updateFields }
        updateMoleculeFields={ props.updateMoleculePage }
    />;
}
