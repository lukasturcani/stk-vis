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
}


export function MoleculeBrowser(
    props: Props,
)
{
    return <div></div>;
}
