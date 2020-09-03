export enum FileTypeEnum {
    Text = 1,
    Image = 2,
    Video = 3,
    Binary = 4,
}

export function getFileType(fileName: string): FileTypeEnum {
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.bmp')
    || fileName.endsWith('.jpeg') || fileName.endsWith('.gif')) {
        return FileTypeEnum.Image;
    }
    return FileTypeEnum.Text;
}

export class Tone {
    constructor(
        public name: string,
        public level: number) {}
}

export const TONE_LIST = [
    // mod 12
    new Tone('C#', 1),
    new Tone('Db', 1),
    new Tone('D#', 3),
    new Tone('Eb', 3),
    new Tone('F#', 6),
    new Tone('Gb', 6),
    new Tone('G#', 8),
    new Tone('Ab', 8),
    new Tone('A#', 10),
    new Tone('Bb', 10),


    new Tone('C', 0),
    new Tone('D', 2),
    new Tone('E', 4),
    new Tone('F', 5),
    new Tone('G', 7),
    new Tone('A', 9),
    new Tone('B', 11),

];