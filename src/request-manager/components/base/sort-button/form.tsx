import * as React from 'react';
import {
    ISortType
} from 'RequestManager.SortType';


export interface BaseProps
{
    sortType: ISortType;
    setSortType: (sortType: ISortType) => void;
    collection: string;
    setCollection: (collection: string) => void;
    collections: string[];
}


type Empty = Record<string, unknown>;

interface Props extends BaseProps
{
    formControl: React.FunctionComponent<Empty>;
    label: React.FunctionComponent<Empty>;
    select: React.FunctionComponent<SelectProps>;
    menuItem: React.FunctionComponent<MenuItemProps>;
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


export function Form(
    props: Props,
)
{
    return (
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
    );
}
