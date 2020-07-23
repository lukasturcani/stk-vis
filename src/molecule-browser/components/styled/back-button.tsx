import * as React from 'react';
import {
    BackButton as BackButtonBase
} from 'molecule-browser/base/back-button';
import {
    BackButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const BackButton: React.FunctionComponent<BackButtonProps>
    = (props) => <BackButtonBase
        {...props}
    />;
