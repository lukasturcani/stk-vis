import * as React from 'react';
import { connect } from 'react-redux';
import * as smilesDrawer from 'smiles-drawer';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ErrorIcon from '@material-ui/icons/Error';
import {
    ILoadedDatabaseBrowser,
    IMolecule,
} from '../../../models';
import {
    getMolecules,
    getSelectedMolecule,
} from '../../../selectors';
import {
    Maybe,
    MaybeKind,
    Nothing,
} from '../../../utilities';
import {
    getSmiles,
    elementColors,
} from './utilities';
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';


function assertNever(arg: never): never { throw Error(); }


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
        margin: 'auto',
        width: 200,
        height: 200,
    },
  }),
);


interface ITwoDViewerProps
{
    smiles: Maybe<string>;
    selectedMolecule: number;
}


function TwoDViewer(props: ITwoDViewerProps)
{

    switch (props.smiles.kind)
    {
        case MaybeKind.Nothing:
            return <ErrorViewer />;

        case MaybeKind.Just:
            return <TwoDViewerImpl
                smiles={ props.smiles.value }
                selectedMolecule={ props.selectedMolecule }
            />;


        default:
            assertNever(props.smiles);
    }

}



function ErrorViewer()
{
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container
            style={{
                height: '100%',
                width: '100%',
            }}
            alignItems='center'
            justify='center'
            direction='row'
        >
            <Grid container
                alignItems='center'
                justify='center'
                direction='row'
            >
                <Grid item >
                    <ErrorIcon className={ classes.icon } />
                </Grid>
            </Grid>

            <Grid container
                alignItems='center'
                justify='center'
                direction='row'
            >
                <Grid item>
                    <h2>
                        There are too many heavy atoms for a 2D
                        projection.
                    </h2>
                </Grid>
            </Grid>
        </Grid>
    );
}

interface ITwoDViewerImplProps
{
    smiles: string;
    selectedMolecule: number;
}


function TwoDViewerImpl(props: ITwoDViewerImplProps)
{

    React.useEffect(() => {
        const viewer = document.getElementById('TwoDViewer');
        // Remove the content of the rendering container. It's
        // only there to force the rendering of a new molecule.
        (viewer as any).innerHTML = '';

        const drawer: any
            = new smilesDrawer.Drawer({
                bondThickness: 2,
                width: (viewer as HTMLElement).clientWidth,
                height: (viewer as HTMLElement).clientHeight,
                themes: {
                    dark: elementColors,
                },
            });

        smilesDrawer.parse(
            props.smiles,
            (tree: any) => {
                drawer.draw(
                    tree,
                    'TwoDViewer',
                    'dark',
                    false,
                );
            },
            (err: any) => {
                console.log(err);
            },
        );

    });

    return (
        <canvas
            id={ 'TwoDViewer' }
            style={{
                height: '100%',
                width: '100%',
            }}
            // Use the selected molecule as the div content, so that
            // the div is forced to re-render when the selected
            // molecule changes. If this is not the case, the rendered
            // molecule does not change, even when a new molecule is
            // selected.
        >
            { props.selectedMolecule }
        </canvas>
    );
}



function mapStateToProps(state: ILoadedDatabaseBrowser)
{
    const selectedMolecule: number
        = getSelectedMolecule(state);

    const molecule: IMolecule
        = getMolecules(state)[selectedMolecule];

    if (tooManyHeavyAtoms(molecule, 150))
    {
        return {
            smiles: new Nothing(),
            selectedMolecule: selectedMolecule,
        };
    }

    return {
        smiles: getSmiles(molecule),
        selectedMolecule: selectedMolecule,
    }
}


function tooManyHeavyAtoms(
    molecule: IMolecule,
    maxHeavy: number,
)
    : boolean
{
    if (molecule.atoms.length < maxHeavy)
    {
        return false;
    }

    let numHeavyAtoms: number = 0;

    for (let index: number = 0; index < molecule.atoms.length; ++index)
    {
        if (molecule.atoms[index][0] > 1)
        {
            numHeavyAtoms += 1;
            if (numHeavyAtoms > maxHeavy)
            {
                return true;
            }
        }
    }

    return false;
}



export const TwoDViewerComponent
    = connect(mapStateToProps)(TwoDViewer);
