import * as React from 'react';
import { connect } from 'react-redux';
import {
    IState,
    SearchKind,
} from '../../../models';
import Button from '@material-ui/core/Button';
import { getPageMolecules } from '../../../actions';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
    updateMongoDbFields,
    IMongoDbFields,
} from '../../../actions';
import {
    Maybe,
    MaybeKind,
} from '../../../utilities';
import SearchIcon from '@material-ui/icons/Search';
import {
    getSearchKind
} from './utilities';


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
    moleculeKey: string;
    database: string;
    moleculeCollection: string;
    constructedMoleculeCollection: string;
    positionMatrixCollection: string;
    buildingBlockPositionMatrixCollection: string;
    getFirstPage: (options: getFirstPageOptions) => () => void;
    dispatchUpdateMongoDbFields: (fields: IMongoDbFields) => void;
    numEntriesPerPage: number;
    selectBuildingBlocks: boolean;
    selectConstructedMolecules: boolean;
}


interface ButtonImplProps extends IGetMoleculesButtonProps
{
    searchKind: SearchKind;
}


function DisabledButton()
{
    return (
        <Button disabled={ true }>
            <SearchIcon />
        </Button>
    );
}


function ButtonImpl(
    props: ButtonImplProps,
)
{
    const successSnackbar: ISnackbar
        = createSnackbar();

    const errorSnackbar: ISnackbar
        = createSnackbar();

    return (
        <div>
            <Button
                onClick={
                    () => {
                        props.dispatchUpdateMongoDbFields({
                            url:
                                props.url,

                            moleculeKey:
                                props.moleculeKey,

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

                            searchKind:
                                props.searchKind,
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


function GetMoleculesButton(
    props: IGetMoleculesButtonProps,
)
{

    const searchKind: Maybe<SearchKind>
        = getSearchKind(
            props.selectBuildingBlocks,
            props.selectConstructedMolecules,
        );

    switch (searchKind.kind)
    {
        case MaybeKind.Nothing:
            return <DisabledButton />;

        case MaybeKind.Just:
            return <ButtonImpl
                {...props}
                searchKind={
                    searchKind.value
                }
            />;

        default:
            assertNever(searchKind);

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


function assertNever(arg: never): never { throw Error(); }
