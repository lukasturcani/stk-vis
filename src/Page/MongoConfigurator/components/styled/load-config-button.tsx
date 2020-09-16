import * as React from 'react';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/Button';
import {
    LoadConfigButton as LoadConfigButtonBase,
    ButtonProps,
} from '../base/load-config-button';



export function LoadConfigButton()
{
    return <LoadConfigButtonBase
        button={StyledButton}
    />;
}



const StyledButton: React.FunctionComponent<ButtonProps>
    = props => (
        <Grid item>
            <ButtonBase
                variant='contained'
                color='secondary'
                startIcon={<LibraryAddIcon />}
                {...props}
            >
                Load Config
            </ButtonBase>
        </Grid>
    );
