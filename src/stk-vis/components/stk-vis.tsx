import * as React from 'react';
import {
    MongoConfigurator,
} from './styled/mongo-configurator/mongo-configurator';
import { IProps } from 'StkVis.StkVis';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';


export interface DispatchProps
{
    updateFields: (mongoData: IMongoData) => void;
    updateMoleculePage: (pageData: IPageData) => void;
}

export interface BaseProps extends IProps, DispatchProps
{
}


export interface Props extends BaseProps
{
}


export function StkVis(
    props: Props,
)
{
    switch (props.kind)
    {
        case 'Mongo Configurator':
        {
            return <MongoConfigurator
                { ...props }
            />;
        }
    }
}
