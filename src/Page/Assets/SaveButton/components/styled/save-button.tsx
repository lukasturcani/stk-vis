import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroupBase from '@material-ui/core/ButtonGroup';
import ButtonBase from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import PopperBase from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SaveIcon from '@material-ui/icons/Save';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    SaveButton as SaveButtonBase,
    CoreProps,
    PopperProps,
    ButtonGroupProps,
} from '../base/save-button';

export function SaveButton(
    props: CoreProps,
)
{
    return <SaveButtonBase
        container={Container}
        buttonGroup={ButtonGroup}
        popper={Popper}
        {...props}
    />;
}

type Empty = Record<string, unknown>;


const Container: React.FunctionComponent<Empty>
    = props => <Grid item>{props.children}</Grid>;


const ButtonGroup: React.FunctionComponent<ButtonGroupProps>
    = props => (
        <ButtonGroupBase
            variant="contained"
            color="secondary"
            ref={props.anchorRef}
            aria-label="split button"
        >
            <ButtonBase
                onClick={props.saveClick}
                style={{
                    // Keep a fixed width so that when extension
                    // is changed, the width of the button does not
                    // change due to a change in word length.
                    width: 100,
                }}
            >
                <SaveIcon
                    style={{
                        marginRight: '0.2em',
                        verticalAlign: 'middle',
                    }}
                />
                <span
                    style={{ verticalAlign: 'middle' }}
                >
                    {props.saveLabel}
                </span>
            </ButtonBase>
            <ButtonBase
                size="small"
                aria-controls={
                    props.menuOpen ? 'split-button-menu' : undefined
                }
                aria-expanded={props.menuOpen ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={props.handleToggle}
            >
                <ArrowDropDownIcon />
            </ButtonBase>
            {props.children}
        </ButtonGroupBase>
    );


const Popper: React.FunctionComponent<PopperProps>
    = props => (
        <PopperBase
            open={props.open}
            anchorEl={props.anchorEl}
            role={undefined}
            transition
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom' ?
                            'center top' : 'center bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener
                            onClickAway={props.onClickAway}
                        >
                            <MenuList id="split-button-menu">
                                {props.writers.map((writer, index) => (
                                    <MenuItem
                                        key={writer}
                                        selected={
                                            index
                                            ===
                                            props.selectedIndex
                                        }
                                        onClick={(event) =>
                                            props.handleMenuItemClick(
                                                event,
                                                index,
                                            )
                                        }
                                    >
                                        {writer}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </PopperBase>
    );
