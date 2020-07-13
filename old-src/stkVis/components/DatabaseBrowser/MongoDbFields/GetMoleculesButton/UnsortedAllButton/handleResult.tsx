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
                console.log('database connection error');
                break;
            }

            case ResultKind.CollectionConnectionError:
            {
                console.log('collection connection error');
                break;
            }

            case ResultKind.UncategorizedError:
            {
                console.log('uncategorized error');
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
