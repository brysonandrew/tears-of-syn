export interface IDictionary<T> {
    [key: string]: T
}

export interface IParams {
    activePagePath?: string
}

export interface IPage {
    name: string
    path: string
    paragraphs: string[][]
}
export interface IInlineStyles {
    [key: string]: IDictionary<string | number>
}
