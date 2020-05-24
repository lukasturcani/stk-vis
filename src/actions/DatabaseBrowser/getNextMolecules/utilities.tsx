export function assertNever(arg: never): never { throw Error(); }


export interface IInchiKeyMap {
    [moleculeId: number]: string
}
