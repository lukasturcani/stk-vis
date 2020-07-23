import * as React from 'react';
import {
    SortButton as SortButtonBase
} from 'molecule-browser/base/sort-button';
import {
    SortButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const SortButton: React.FunctionComponent<SortButtonProps>
    = (props) => <SortButtonBase
        {...props}
    />;
