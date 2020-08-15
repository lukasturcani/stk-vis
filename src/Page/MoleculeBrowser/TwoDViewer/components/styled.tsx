import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
    TwoDViewer as TwoDViewerBase,
    CanvasProps,
} from './base';
import {
    Props as TwoDViewerProps,
} from 'Page.MoleculeBrowser.TwoDViewer'


export const TwoDViewer: React.FunctionComponent<TwoDViewerProps>
    = (props) => <TwoDViewerBase
        container={Container}
        canvas={Canvas}
        {...props}
    />;


const Canvas: React.FunctionComponent<CanvasProps>
    = (props) => (
        <canvas
            style={{
                height: '100%',
                width: '100%',
            }}
            {...props}
        >
            {props.children}
        </canvas>
    );

const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Box
            paddingBottom={1.5}
            style={ {
                height: '50%',
                width: '100%',
            } }
        >
            <Grid item
                xs={12}
                style={ { height: '100%'  } }
            >
                <Paper
                    style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {props.children}
                </Paper>
            </Grid>
        </Box>
    );
