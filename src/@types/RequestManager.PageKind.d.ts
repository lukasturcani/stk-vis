declare module 'RequestManager.PageKind' {

    export type PageKind = Record<string, unknown>;

    export const first: PageKind;
    export const middle: PageKind;
    export const lastComplete: PageKind;
    export const lastIncomplete: PageKind;
    export const onlyComplete: PageKind;
    export const onlyIncomplete: PageKind;
}
