export default function hooksPlugin({ rmFiles, //默认值
beforeBuild, //可选
afterBuild, }: {
    rmFiles?: string[];
    beforeBuild?: Function;
    afterBuild?: Function;
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};
