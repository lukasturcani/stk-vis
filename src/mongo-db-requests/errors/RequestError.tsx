export class RequestError
{
    error: Error;

    constructor(message: string = '')
    {
        this.error = new Error(message);
    }
}
