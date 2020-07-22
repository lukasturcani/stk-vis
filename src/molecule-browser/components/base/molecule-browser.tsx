import * as React from 'react';


export interface BaseProps
{
    kind: 'Molecule Browser';
}


export interface DispatchProps
{
}


interface Props extends BaseProps, DispatchProps
{
    component: React.FunctionComponent<Record<string, unknown>>;
}


export function MoleculeBrowser(
    props: Props,
)
{
    return <props.component />;
}
