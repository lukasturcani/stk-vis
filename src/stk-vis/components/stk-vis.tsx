import * as React from 'react';
import {
    MongoConfigurator,
} from './styled/mongo-configurator/mongo-configurator';
import {
    BaseProps as ConfiguratorBaseProps,
    DispatchProps as ConfiguratorDispatchProps,
} from 'mongo-configurator/components/mongo-configurator';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';



export type BaseProps =
    | ConfiguratorBaseProps;

export type DispatchProps =
    |ConfiguratorDispatchProps;

type Props =
    | (ConfiguratorBaseProps & ConfiguratorDispatchProps);


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
