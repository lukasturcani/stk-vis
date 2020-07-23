import * as React from 'react';
import {
    NextButton as NextButtonBase
} from 'molecule-browser/base/next-button';
import {
    NextButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const NextButton: React.FunctionComponent<NextButtonProps>
    = (props) => <NextButtonBase
        {...props}
    />;
