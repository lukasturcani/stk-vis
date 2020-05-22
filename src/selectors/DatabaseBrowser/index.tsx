import { Maybe, Just } from '../../utilities';
import { IState } from '../../models';


export function getEntry({
    state,
}: {
    state: IState,
}): Maybe<string>
{
    console.log(state.databaseBrowser);
    return new Just('');
}
