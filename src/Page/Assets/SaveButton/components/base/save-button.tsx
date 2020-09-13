import * as React from 'react';
import {
    Props as SaveButtonProps,
} from 'Page.SaveButton';


type Empty = Record<string, unknown>;

export type CoreProps = SaveButtonProps;


interface Props extends CoreProps
{
    container: React.FunctionComponent<Empty>;
    buttonGroup: React.FunctionComponent<ButtonGroupProps>;
    button: React.FunctionComponent<ButtonProps>;
    dropDownButton: React.FunctionComponent<DropDownButtonProps>;
    popper: React.FunctionComponent<PopperProps>;
}

export interface ButtonGroupProps
{
    anchorRef: React.RefObject<HTMLDivElement>;
}

export interface ButtonProps
{
    onClick: () => void;
    label: string;
}

export interface DropDownButtonProps
{
    onClick: () => void;
    open: boolean;
}

export interface PopperProps
{
    open: boolean;
    anchorEl: HTMLDivElement | null;

    onClickAway:
        (event: React.MouseEvent<Document, MouseEvent>) => void;

    selectedIndex: number;

    writers: string[];

    handleMenuItemClick:
        ( event: React.MouseEvent<HTMLLIElement, MouseEvent>
        , index: number
        ) => void;
}

export function SaveButton(
    props: Props,
)
{
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        const content: string = props.writers[selectedIndex].write();
        console.log(content);
    }

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose
        = (event: React.MouseEvent<Document, MouseEvent>) => {
            if (
                anchorRef.current
                &&
                anchorRef.current.contains(event.target as HTMLElement)
            ) {
              return;
            }

            setOpen(false);

        };

    return (
        <props.container>
            <props.buttonGroup
                anchorRef={anchorRef}
            >
                <props.button
                    onClick={handleClick}
                    label={props.writers[selectedIndex].name}
                />
                <props.dropDownButton
                    onClick={handleToggle}
                    open={open}
                />
            </props.buttonGroup>
            <props.popper
                open={open}
                anchorEl={anchorRef.current}
                onClickAway={handleClose}
                selectedIndex={selectedIndex}
                handleMenuItemClick={handleMenuItemClick}
                writers={props.writers.map(writer => writer.name)}
            />
        </props.container>
    );
}
