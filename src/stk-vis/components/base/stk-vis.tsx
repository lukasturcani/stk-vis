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
    BaseProps as BrowserBaseProps,
    DispatchProps as BrowserDispatchProps,
} from 'molecule-browser/base/molecule-browser';
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
            return <MoleculeBrowser
                {...props}
            />;
        }
        default:
        {
            assertNever(props);
        }
    }
}


function assertNever(arg: never): never { throw new Error(); }
