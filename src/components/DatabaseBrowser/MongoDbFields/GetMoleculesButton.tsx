import * as React from 'react';
import { connect } from 'react-redux';
import {
    IState,
    IMoleculeSelectionType,
    MoleculeSelectionTypeKind,

} from '../../../models';
import Button from '@material-ui/core/Button';
import { getPageMolecules } from '../../../actions';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
    updateMongoDbFields,
    IMongoDbFields,
} from '../../../actions';
import SearchIcon from '@material-ui/icons/Search';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface getFirstPageOptions
{
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
}


interface IGetMoleculesButtonProps
{
    url: string;
    database: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    getFirstPage: (options: getFirstPageOptions) => () => void;
    dispatchUpdateMongoDbFields: (fields: IMongoDbFields) => void;
    numEntriesPerPage: number;
    moleculeTypeSelectionError: boolean;
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
}


function GetMoleculesButton(
    props: IGetMoleculesButtonProps,
)
{
    const successSnackbar: ISnackbar
        = createSnackbar();

    const errorSnackbar: ISnackbar
        = createSnackbar();

    return (
        <div>
            <Button
                disabled={ props.moleculeTypeSelectionError }
                onClick={
                    () => {
                        props.dispatchUpdateMongoDbFields({
                            url:
                                props.url,

                            database:
                                props.database,

                            moleculeCollection:
                                props.moleculeCollection,

                            constructedMoleculeCollection:
                                props.constructedMoleculeCollection,

                            positionMatrixCollection:
                                props.positionMatrixCollection,

                            buildingBlockPositionMatrixCollection:
                                props
                                .buildingBlockPositionMatrixCollection,

                            numEntriesPerPage:
                                props.numEntriesPerPage,

                            moleculeSelectionType:
                                getMoleculeSelectionType(
                                    props.selectBuildingBlocks,
                                    props.selectConstructedMolecules,
                                ),
                        });
                        props.getFirstPage({
                            successSnackbar: successSnackbar.activate,
                            errorSnackbar: errorSnackbar.activate,
                        })();
                    }
                }
            >
                <SearchIcon />
            </Button>
            <Snackbar
                open={ successSnackbar.open }
                autoHideDuration={6000}
                onClose={ successSnackbar.handleClose }
            >
                <Alert
                    severity='success'
                    onClose={ successSnackbar.handleClose }
                >
                    { successSnackbar.message }
                </Alert>
            </Snackbar>
            <Snackbar
                open={ errorSnackbar.open }
                autoHideDuration={6000}
                onClose={ errorSnackbar.handleClose }
            >
                <Alert
                    severity='error'
                    onClose={ errorSnackbar.handleClose }
                >
                    { errorSnackbar.message }
                </Alert>
            </Snackbar>
        </div>
    );
}


function getMoleculeSelectionType(
    selectBuildingBlocks: boolean,
    selectConstructedMolecules: boolean,
)
    : IMoleculeSelectionType
{
    if (selectBuildingBlocks && selectConstructedMolecules)
    {
        return {
            kind: MoleculeSelectionTypeKind.Both,
        };
    }
    else if (selectBuildingBlocks)
    {
        return {
            kind: MoleculeSelectionTypeKind.BuildingBlocks,
        };
    }
    else if (selectConstructedMolecules)
    {
        return {
            kind: MoleculeSelectionTypeKind.ConstructedMolecules,
        };
    }
    else
    {
        console.log(
            'User unchecked both building block and constructed '
            + 'molecule selection, yet somehow the GetMoleculesButton '
            + 'was pressed. This should basically never happen... '
            + 'Behaving as though both selections were checked.'
        );
        return {
            kind: MoleculeSelectionTypeKind.Both,
        };
    }

}


function createSnackbar()
    : ISnackbar
{
    const [open, setOpen] = React.useState(false);

    const [message, setMessage]
        = React.useState('Placeholder');

    const activate = (message: string) => {
        setMessage(message);
        setOpen(true);
    };
    const handleClose
        = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };
    return {
        open,
        setOpen,
        message,
        setMessage,
        handleClose,
        activate,
    };
}


interface ISnackbar
{
    open: any;
    setOpen: any;
    message: any;
    setMessage: any;
    handleClose: any;
    activate: (message: string) => void;
}


function mapStateToProps(
    state: IState,
)
{
    return {
    };
}


function mapDispatchToProps(
    dispatch: (action: any) => void,
)
{
    return {
        getFirstPage:
            (options: getFirstPageOptions) => () => dispatch(
                getPageMolecules({
                    pageIndex: 0,
                    ...options,
                })
            ),

        dispatchUpdateMongoDbFields:
            (fields: IMongoDbFields) => dispatch(
                updateMongoDbFields(fields)
            ),
    };
}



export const GetMoleculesButtonComponent
    = connect(mapStateToProps, mapDispatchToProps)(GetMoleculesButton);
