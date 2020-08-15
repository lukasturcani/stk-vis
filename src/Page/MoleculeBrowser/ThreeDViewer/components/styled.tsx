import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
    CanvasProps,
    ThreeDViewer as ThreeDViewerBase,
} from './base';
import {
    Props as ThreeDViewerProps,
} from 'Page.MoleculeBrowser.ThreeDViewer'


export const ThreeDViewer: React.FunctionComponent<ThreeDViewerProps>
    = (props) => <ThreeDViewerBase
        container={Container}
        canvas={Canvas}
        {...props}
    />;


const Container: React.FunctionComponent<Record<string, unknown>>
    = (props) => (
        <Box
            paddingTop={1.5}
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
                        overflow: 'auto',
                    }}
                >
                    {props.children}
                </Paper>
            </Grid>
        </Box>
    );

const Canvas: React.FunctionComponent<CanvasProps>
    = (props) => (
        <div
            style={{
                height: '100%',
                width: '100%',
            }}
            {...props}
        >
            {props.children}
        </div>
    );

