import * as React from 'react';
import {
    SortButton as SortButtonBase
} from 'request-manager/base/sort-button';
import {
    SortButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const SortButton: React.FunctionComponent<SortButtonProps>
    = (props) => <SortButtonBase
        {...props}
    />;
