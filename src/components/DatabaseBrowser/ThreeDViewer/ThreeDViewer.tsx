import React, { useEffect } from 'react';
import * as md from 'mol-draw';


export function ThreeDViewerComponent()
{
    const maybeMolecule = md.maybeParseV3000(`
          0  0  0  0  0  0  0  0  0  0999 V3000
        M  V30 BEGIN CTAB
        M  V30 COUNTS 4 3 0 0 0
        M  V30 BEGIN ATOM
        M  V30 1 C -0.06 -0.17 0 0
        M  V30 2 Cl -1.35 1.04 -0.04 0 CHG=1
        M  V30 3 Br 1.65 0.73 -0.06 0
        M  V30 4 H -0.15 -0.88 -0.87 0
        M  V30 5 H -0.09 -0.72 0.97 0
        M  V30 END ATOM
        M  V30 BEGIN BOND
        M  V30 1 1 1 2
        M  V30 2 1 1 3
        M  V30 3 1 1 4
        M  V30 4 1 1 5
        M  V30 END BOND
        M  V30 END CTAB
        M  END
    `);
    /*
    const geometryData = md.fromRight()(maybeMolecule);
    useEffect(() => {
        console.log('hi');
        // md.drawMol({})({ containerId: ' ThreeDViewer' })(geometryData);
    });
     */
    return (<div id='ThreeDViewer'
        style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'red',
        }}
    ></div>);
}
