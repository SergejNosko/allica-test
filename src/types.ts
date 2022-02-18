export interface Planet {
    name: string;
}

export interface Character {
    name: string;
    gender: 'male' | 'female' | 'n/a';
    homeworld: string;
    url: string;
    hair_color: string;
    eye_color: string;
    films: string[],
}

export type CharacterCardProps = Omit<Character, 'hair_color' | 'eye_color' | 'films'>;

export interface Film {
    title: string;
}
