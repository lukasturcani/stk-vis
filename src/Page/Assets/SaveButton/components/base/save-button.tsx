import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SaveIcon from '@material-ui/icons/Save';

const options: string[]
    = [
        'MOL',
        'XYZ',
        'PDB',
        'MOL2',
    ];

export function SaveButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

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
        <Grid item>
            <ButtonGroup
                variant="contained"
                color="secondary"
                ref={anchorRef}
                aria-label="split button"
            >
                <Button
                    onClick={handleClick}
                >
                    <SaveIcon
                        style={{
                            marginRight: '1em',
                        }}
                    />
                    {options[selectedIndex]}
                </Button>
                <Button
                    color="secondary"
                    size="small"
                    aria-controls={
                        open ? 'split-button-menu' : undefined
                    }
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
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
                                onClickAway={handleClose}
                            >
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={
                                                index === selectedIndex
                                            }
                                            onClick={(event) =>
                                                handleMenuItemClick(
                                                    event,
                                                    index,
                                                )
                                            }
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Grid>
  );
}
