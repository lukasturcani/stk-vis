import * as React from 'react';


export interface BaseProps
{
    sortType: 'ascending' | 'descending';
    setSortType: (sortType: 'ascending' | 'descending') => void;
    collection: string;
    setCollection: (collection: string) => void;
    collections: string[];
}


type Empty = Record<string, unknown>;

interface Props extends BaseProps
{
    container: React.FunctionComponent<Empty>;
    formControl: React.FunctionComponent<Empty>;
    label: React.FunctionComponent<Empty>;
    select: React.FunctionComponent<SelectProps>;
    menuItem: React.FunctionComponent<MenuItemProps>;
    radio: React.FunctionComponent<RadioProps>;
}

export interface SelectProps
{
    value: string;
    onChange: (event: {target: {value: string}}) => void;
}


export interface MenuItemProps
{
    key: string;
    value: string;
}


export interface RadioProps
{
    value: 'ascending' | 'descending';
    onChange:
        (event: {target: {value: 'ascending' | 'descending'}}) => void;
}


export function Form(
    props: Props,
)
{
    return (
        <props.container>
            <props.formControl>
                <props.label />
                <props.select
                    value={props.collection}
                    onChange={e => props.setCollection(e.target.value)}
                >
                    <props.menuItem key='' value=''>
                        <em>None</em>
                    </props.menuItem>
                    {
                        props.collections.map(name => (
                            <props.menuItem key={name} value={name}>
                                {name}
                            </props.menuItem>
                        ))
                    }
                </props.select>
            </props.formControl>
            <props.radio
                value={props.sortType}
                onChange={e => props.setSortType(e.target.value)}
            />
        </props.container>
    );
}
