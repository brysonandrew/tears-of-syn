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
    ),
    new PortfolioProject(
        "Gemini Pearl",
        [
            [
                "In my life, should have gone, should have stayed away",
                "Now I can't breathe, for my life, like I live in outer space",
                "In this land, not my home, (I'm) more foreign that outer space",
                "All these things, make me love so much, in accordance to my level of hate",
            ],
            [
                "Broken bones have made me strong, and you make me weak dare I say",
                "Who are you... to ask meall these personal questions?"
            ],
            [
                "Around I turn to find an effigy of meaning",
                "With great poise, I march forward, burning away all being",
                "Gemini Pearl, by my side, the prophecy a beacon",
                "Feel the warmth of her light, let the dark continue bleeding"
            ]
        ]
    ),
    new PortfolioProject(
        "Sikke",
        [
            [
                "If that broken table, could still stand",
                "On all fours",
                "What a find thing to eat off",
                "And hold the weight of my knife"
            ],
            [
                "And no plan you've ever had could ever stop me",
                "Cause you're already blown to the wind my little flower",
                "...and I don't miss you at all"
            ],
            [
                "If that broken candle could still shine",
                "In the darkest of rooms",
                "It would be significant",
                "To the walls closing in"
            ]
        ]
    ),
    new PortfolioProject(
        "Hidden Body",
        [
            [
                "I saw you after dark",
                "With your fake dog tags",
                "You came up from behind",
                "And made me feel so out of place",
                "In an empty room, I couldn't have stopped you"
            ],
            [
                "You taught me how a heart",
                "Could make me beat again",
                "It takes strength",
                "And a lot of adrenaline",
                "A wooden stake couldn't stop you"
            ],
            [
                "You insisted that I see",
                "Your new armoury (enemies)",
                "With your new moves",
                "But I was still recovering",
                "From the time you had choked me out",
                "And beat me so bad I could't make it this time"
            ]
        ]
    )
];

export const PAGES: IDictionary<IPage> = PAGE_LIST.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
