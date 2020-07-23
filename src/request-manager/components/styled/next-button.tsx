import * as React from 'react';
import {
    NextButton as NextButtonBase
} from 'request-manager/base/next-button';
import {
    NextButtonProps,
} from 'MoleculeBrowser.MoleculeBrowser'


export const NextButton: React.FunctionComponent<NextButtonProps>
    = (props) => <NextButtonBase
        {...props}
    />;
