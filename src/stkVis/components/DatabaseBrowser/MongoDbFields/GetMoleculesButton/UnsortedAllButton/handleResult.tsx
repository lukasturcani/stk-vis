import {
    IResult,
    ResultKind
} from 'mongo-db-requests/unsorted-all';
import {
    Payload,
} from 'actions/updateTable';
import {
    getPayload,
} from './getPayload';


interface Options
{
    updateTable: (payload: Payload) => void;
}


export function handleResult(
    options: Options,
)
    : (result: IResult) => void
{
    return (result: IResult) =>
    {
        switch (result.kind)
        {
            case ResultKind.Success:
            {
                options.updateTable(getPayload(result));
                break;
            }

            case ResultKind.DatabaseConnectionError:
            {
                break;
            }

            case ResultKind.CollectionConnectionError:
            {
                break;
            }

            case ResultKind.UncategorizedError:
            {
                break;
            }

            default:
            {
                assertNever(result);
                break;
            }
        }
    };
}


function assertNever(arg: never): never { throw new Error(); }
