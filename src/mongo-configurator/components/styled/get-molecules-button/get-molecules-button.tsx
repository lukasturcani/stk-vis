import * as React from 'react';
import {
    GetMoleculesButton as GetMoleculesButtonBase,
    BaseProps,
} from 'mongo-configurator/base/get-molecules-button';
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
