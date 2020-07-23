import * as React from 'react';
import {
    MongoConfigurator,
} from 'mongo-configurator/styled/mongo-configurator';
import {
    MoleculeBrowser,
} from 'molecule-browser/styled/molecule-browser';
import {
    BaseProps as ConfiguratorBaseProps,
    DispatchProps as ConfiguratorDispatchProps,
} from 'mongo-configurator/base/mongo-configurator';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';



export type BaseProps =
    | ConfiguratorBaseProps

export type DispatchProps =
    & ConfiguratorDispatchProps

export type Props = BaseProps & DispatchProps;


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


function assertNever(arg: never): never { throw new Error(); }
