export const enum InitialRequestStateKind {
    NoRequestSent = "No Request Sent",
    RequestSucceeded = "Request Succeeded",
    RequestFailed = "Request Failed",
    RequestSent = "Request Sent",
}


export interface INoRequestSent {
    kind: InitialRequestStateKind.NoRequestSent;
}


export interface IIntialRequestSucceeded {
    kind: InitialRequestStateKind.RequestSucceeded;
}


export interface IInitialRequestFailed {
    kind: InitialRequestStateKind.RequestFailed;
}


export interface IInitialRequestSent {
    kind: InitialRequestStateKind.RequestSent;
}


export type IInitialRequestState =
    | INoRequestSent
    | IIntialRequestSucceeded
    | IInitialRequestFailed
    | IInitialRequestSent
