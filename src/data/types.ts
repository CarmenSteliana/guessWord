export enum LetterState {
    Default,
    Correct,
    Wrong
}

export interface Data {
    category: CategoryType
    data: string[]

}

export enum CategoryType {
    Cities = "Cities",
    Movies = "Movies",
    Cars = "Cars"
}

