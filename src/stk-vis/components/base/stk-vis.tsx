import * as React from 'react';
import {
    MongoConfigurator,
} from 'mongo-configurator/styled/mongo-configurator';
import {
    MoleculeBrowser,
} from 'molecule-browser/styled/molecule-browser';
import {
    Props,
} from 'StkVis.StkVis';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';


export function StkVis(
    props: Props,
)
{
    console.log(props);
    if (props.value0 !== undefined)
    {
        return <MongoConfigurator
                { ...props.value0 }
            />;
    }
    if (props.value1 !== undefined)
    {
        return <MoleculeBrowser
            {...props.value1}
        />;
    }
}


function assertNever(arg: never): never { throw new Error(); }
