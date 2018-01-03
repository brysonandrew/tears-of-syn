import { toPath } from './helpers/toPath';
import { IDictionary, IPage } from './models';

function PortfolioProject(name, paragraphs) {
    this.name = name;
    this.paragraphs = paragraphs;
    this.path = toPath(this.name);
}

export const PAGE_LIST: IPage[] = [
    new PortfolioProject(
        "See you soon",
        [
            [
                "I wanna take you away",
                "To a place that feels like fire",
                "I wanna find your pain",
                "Yeah that fuels your desires",
            ],
            [
                "I wanna show you somewhere",
                "The angels know your name",
                "Love is free to breathe",
                "Where it comes in and out like the sea"
            ],
            [
                "If you're ready - here I am"
            ]
        ]
    ),
    new PortfolioProject(
        "Amour fou",
        [
            [
                "'Cause I wanna hear your story",
                "I wanna touch you too",
                "I wanna feel the feeling you're feeling",
                "Exactly the way you do",
            ],
            [
                "'Cause I wanna take part",
                "Be your Amour Fou",
                "A hero or a villian",
                "Appre moi, de deluge",
            ],
            [
                "An astral homing soul mass crushes down on my heart",
                "Everytime I see you smile"
            ],
            [
                "A sea of chaos bed vestiges engulf me",
                "Everytime I wave good-bye"
            ]
        ]
    )
];

export const PAGES: IDictionary<IPage> = PAGE_LIST.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
