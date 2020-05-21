export const enum MoleculeRequestStateKind {
    NoRequestSent = "No Request Sent",
    RequestSucceeded = "Request Succeeded",
    RequestFailed = "Request Failed",
    RequestSent = "Request Sent",
}


export interface INoRequestSent {
    kind: MoleculeRequestStateKind.NoRequestSent;
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
    | INoRequestSent
    | IRequestSucceeded
    | IRequestFailed
    | IRequestSent
