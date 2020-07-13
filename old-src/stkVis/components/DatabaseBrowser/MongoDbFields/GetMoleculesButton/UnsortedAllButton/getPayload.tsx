import {
    Payload,
    IMolecule as PayloadMolecule,
    PageKind as PayloadPageKind,

} from 'actions/updateTable';
import { IResult } from 'mongo-db-requests/unsorted-all';
import {
    IMolecule as RequestMolecule,
    PageKind as RequestPageKind,
} from 'mongo-db-requests';


export function getPayload(
    result: IResult,
)
    : Payload
{
    return {
        molecules: result.molecules.map(getMolecule),
        pageKind: getPageKind(result.pageKind),
        valueCollections: result.valueCollections,
        pageIndex: 0,
    };
}



function getMolecule(
    molecule: Readonly<RequestMolecule>,
)
    : PayloadMolecule
{
    return {
        columnValues: new Map([
            ...molecule.propertyValues,
            ...molecule.keys,
        ]),
        atoms: molecule.atoms,
        bonds: molecule.bonds,
        positionMatrix: molecule.positionMatrix,
    };
}



function getPageKind(
    pageKind: Readonly<RequestPageKind>,
)
    : PayloadPageKind
{
    switch (pageKind)
    {
        case RequestPageKind.First:
        {
            return PayloadPageKind.First;
        }
        case RequestPageKind.Middle:
        {
            return PayloadPageKind.Middle;
        }
        case RequestPageKind.LastComplete:
        {
            return PayloadPageKind.LastComplete;
        }
        case RequestPageKind.LastIncomplete:
        {
            return PayloadPageKind.LastIncomplete;
        }
        case RequestPageKind.OnlyComplete:
        {
            return PayloadPageKind.OnlyComplete;
        }
        case RequestPageKind.OnlyIncomplete:
        {
            return PayloadPageKind.OnlyIncomplete;
        }
        default:
        {
            assertNever(pageKind);
            return;
        }
    }
}


function assertNever(arg: never): never { throw Error(); }
