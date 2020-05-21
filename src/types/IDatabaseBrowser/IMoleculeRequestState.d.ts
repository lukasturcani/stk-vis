declare enum MoleculeRequestStateKind {
    NoRequestSent = "No Request Sent",
    RequestSucceeded = "Request Succeeded",
    RequestFailed = "Request Failed",
    RequestSent = "Request Sent",
}


interface INoRequestSent {
    kind: MoleculeRequestStateKind.NoRequestSent;
}


interface IRequestSucceeded {
    kind: MoleculeRequestStateKind.RequestSucceeded;
}


interface IRequestFailed {
    kind: MoleculeRequestStateKind.RequestFailed;
}


interface IRequestSent {
    kind: MoleculeRequestStateKind.RequestSent;
}


type IMoleculeRequestState =
    | INoRequestSent
    | IRequestSucceeded
    | IRequestFailed
    | IRequestSent
