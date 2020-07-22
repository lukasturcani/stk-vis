import * as React from 'react';
import {
    IMongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    IPageData,
} from 'MoleculeBrowser.UpdateMoleculePage';
import {
    GetMoleculesButton as GetMoleculesButtonBase,
    BaseProps,
} from 'mongo-configurator/components/get-molecules-button';
import { DisabledButton } from './disabled-button';
import { EnabledButton } from './enabled-button';


export function GetMoleculesButton(
    props: BaseProps,
)
{
    return <GetMoleculesButtonBase
        disabledButton={ DisabledButton }
        enabledButton={ EnabledButton }
        { ...props }
    />;
}
