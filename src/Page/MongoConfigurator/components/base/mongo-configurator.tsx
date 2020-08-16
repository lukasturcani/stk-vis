import * as React from 'react';
import { BaseProps as InputFieldsProps  } from './input-fields';
import Grid from '@material-ui/core/Grid';
import {
    Props as BaseProps,
} from 'Page.MongoConfigurator';


export interface DispatchProps<a>
{
    dispatch: (action: a) => void
}

export type CoreProps<a> = BaseProps<a> & DispatchProps<a>;

interface Props<a> extends BaseProps<a>, DispatchProps<a>
{
    component: React.FunctionComponent<Record<string, unknown>>;
    inputFields: React.FunctionComponent<InputFieldsProps>;
    button: React.FunctionComponent<ButtonProps>;
    successSnackbar: React.FunctionComponent<SnackbarProps>;
    errorSnackbar: React.FunctionComponent<SnackbarProps>;
}

export interface ButtonProps
{
    disabled: boolean;
    onClick: () => void;
}

export interface SnackbarProps
{
    open: boolean;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
    message: string;
}

interface Snackbar
{
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}


export function MongoConfigurator<a>(
    props: Props<a>,
)
{
    const successSnackbar: Snackbar
        = getSnackbar();

    const errorSnackbar: Snackbar
        = getSnackbar();

    const [url, setUrl]
        = React.useState(props.url);

    const [moleculeKey, setMoleculeKey]
        = React.useState(props.moleculeKey);

    const [database, setDatabase]
        = React.useState(props.database);

    const [moleculeCollection, setMoleculeCollection]
        = React.useState(props.moleculeCollection);

    const [
        constructedMoleculeCollection,
        setConstructedMoleculeCollection,
    ]
        = React.useState(props.constructedMoleculeCollection);

    const [positionMatrixCollection, setPositionMatrixCollection]
        = React.useState(props.positionMatrixCollection);

    const [
        buildingBlockPositionMatrixCollection,
        setBuildingBlockPositionMatrixCollection,
    ]
        = React.useState(
            props.buildingBlockPositionMatrixCollection
        );

    const [numEntriesPerPage, setNumEntriesPerPage]
        = React.useState(props.numEntriesPerPage);

    const [selectBuildingBlocks, setSelectBuildingBlocks]
        = React.useState(props.selectBuildingBlocks);

    const [selectConstructedMolecules, setSelectConstructedMolecules]
        = React.useState(props.selectConstructedMolecules);

    return (
        <props.component>
            <props.inputFields
                url={ url }
                setUrl={ setUrl }

                moleculeKey={ moleculeKey }
                setMoleculeKey={ setMoleculeKey }

                database={ database }
                setDatabase={ setDatabase }

                moleculeCollection={ moleculeCollection }
                setMoleculeCollection={ setMoleculeCollection }

                constructedMoleculeCollection={
                    constructedMoleculeCollection
                }
                setConstructedMoleculeCollection={
                    setConstructedMoleculeCollection
                }

                positionMatrixCollection={ positionMatrixCollection }
                setPositionMatrixCollection={
                    setPositionMatrixCollection
                }

                buildingBlockPositionMatrixCollection={
                    buildingBlockPositionMatrixCollection
                }
                setBuildingBlockPositionMatrixCollection={
                    setBuildingBlockPositionMatrixCollection
                }

                numEntriesPerPage={ numEntriesPerPage }
                setNumEntriesPerPage={ setNumEntriesPerPage }

                selectBuildingBlocks={ selectBuildingBlocks }
                setSelectBuildingBlocks={ setSelectBuildingBlocks }

                selectConstructedMolecules={
                    selectConstructedMolecules
                }
                setSelectConstructedMolecules={
                    setSelectConstructedMolecules
                }
            />
            <Grid item>
                <props.button
                    disabled={
                        !selectConstructedMolecules
                        &&
                        !selectBuildingBlocks
                    }
                    onClick={() => {
                        props.getMoleculesButton.onClick
                            ()
                            (props.dispatch)
                            ({
                                success: successSnackbar,
                                error: errorSnackbar,
                            })
                            ({
                                url,
                                moleculeKey,
                                database,
                                moleculeCollection,
                                constructedMoleculeCollection,
                                positionMatrixCollection,
                                buildingBlockPositionMatrixCollection,
                                numEntriesPerPage,
                                selectBuildingBlocks,
                                selectConstructedMolecules,
                            })
                    }}
                />
                <props.successSnackbar
                    open={successSnackbar.open}
                    onClose={successSnackbar.onClose}
                    message={successSnackbar.message}
                />
                <props.errorSnackbar
                    open={errorSnackbar.open}
                    onClose={errorSnackbar.onClose}
                    message={errorSnackbar.message}
                />
            </Grid>
        </props.component>
    );
}

function getSnackbar(): Snackbar
{
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const onClose = (event?: React.SyntheticEvent, reason?: string) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        setOpen(false);
    };

    return {
        open,
        setOpen,
        message,
        setMessage,
        onClose,
    };
}
