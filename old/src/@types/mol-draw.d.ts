declare module 'mol-draw'
{
    export type Mesh = Record<string, unknown>;
    export type Scene = Record<string, unknown>;

    export interface SceneOptions
    {
        containerId: string;
        backgroundColor: string;
    }

    export const drawMol: (scene: Scene) => void;
    export const scene:
        (options: SceneOptions) => (meshes: Mesh[]) => Scene;
}
