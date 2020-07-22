import * as React from 'react';

import {
    BaseProps,
    DispatchProps,
    MoleculeBrowser as MoleculeBrowserBase
} from 'molecule-browser/components/molecule-browser';


export function MoleculeBrowser(
    props: BaseProps & DispatchProps,
)
{
    return <MoleculeBrowserBase
        component={ Component }
        {...props}
    />;
}


const Component: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <div
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
            }}
        >
        </div>
    );
