export const enum MoleculeRequestStateKind {
    RequestSucceeded = "Request Succeeded",
    RequestFailed = "Request Failed",
    RequestSent = "Request Sent",
}


export interface IRequestSucceeded {
    kind: MoleculeRequestStateKind.RequestSucceeded;
}


export interface IRequestFailed {
    kind: MoleculeRequestStateKind.RequestFailed;
}


export interface IRequestSent {
    kind: MoleculeRequestStateKind.RequestSent;
}


export type IMoleculeRequestState =
    | IRequestSucceeded
    | IRequestFailed
    | IRequestSent
