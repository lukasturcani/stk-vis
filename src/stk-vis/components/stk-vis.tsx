import * as React from 'react';
import {
    MongoConfigurator,
} from './styled/mongo-configurator/mongo-configurator';
import {
    BaseProps as ConfiguratorBaseProps,
    DispatchProps as ConfiguratorDispatchProps,
} from 'mongo-configurator/components/mongo-configurator';
import {
    BaseProps as BrowserBaseProps,
    DispatchProps as BrowserDispatchProps,
} from 'molecule-browser/components/molecule-browser';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';



export type BaseProps =
    | ConfiguratorBaseProps
    | BrowserBaseProps;

export type DispatchProps =
    & ConfiguratorDispatchProps
    & BrowserDispatchProps;

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
        case 'Molecule Browser':
        {
            return <div></div>
        }
        default:
        {
            assertNever(props);
        }
    }
}


function assertNever(arg: never): never { throw new Error(); }
