interface HiraganaChar {
  character: string;
  romajiAnswer: string;
}

interface HiraganaGroup {
  groupName: string;
  characters: HiraganaChar[];
  enabled: boolean;
}

// Basic Hiragana Groups
const basicHiraganaData: HiraganaGroup[] = [
  {
    groupName: "あ/a",
    enabled: false,
    characters: [
      {
        character: "あ",
        romajiAnswer: "A",
      },
      {
        character: "い",
        romajiAnswer: "I",
      },
      {
        character: "え",
        romajiAnswer: "E",
      },
      {
        character: "お",
        romajiAnswer: "O",
      },
      {
        character: "う",
        romajiAnswer: "U",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "か/ka",
    enabled: false,
    characters: [
      {
        character: "か",
        romajiAnswer: "KA",
      },
      {
        character: "き",
        romajiAnswer: "KI",
      },
      {
        character: "く",
        romajiAnswer: "KU",
      },
      {
        character: "け",
        romajiAnswer: "KE",
      },
      {
        character: "こ",
        romajiAnswer: "KO",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "さ/sa",
    enabled: false,
    characters: [
      {
        character: "さ",
        romajiAnswer: "SA",
      },
      {
        character: "し",
        romajiAnswer: "SHI",
      },
      {
        character: "す",
        romajiAnswer: "SU",
      },
      {
        character: "せ",
        romajiAnswer: "SE",
      },
      {
        character: "そ",
        romajiAnswer: "SO",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "た/ta",
    enabled: false,
    characters: [
      {
        character: "た",
        romajiAnswer: "TA",
      },
      {
        character: "ち",
        romajiAnswer: "CHI",
      },
      {
        character: "つ",
        romajiAnswer: "TSU",
      },
      {
        character: "て",
        romajiAnswer: "TE",
      },
      {
        character: "と",
        romajiAnswer: "TO",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "な/na",
    enabled: false,
    characters: [
      {
        character: "な",
        romajiAnswer: "NA",
      },
      {
        character: "に",
        romajiAnswer: "NI",
      },
      {
        character: "ぬ",
        romajiAnswer: "NU",
      },
      {
        character: "ね",
        romajiAnswer: "NE",
      },
      {
        character: "の",
        romajiAnswer: "NO",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "は/ha",
    enabled: false,
    characters: [
      {
        character: "は",
        romajiAnswer: "HA",
      },
      {
        character: "ひ",
        romajiAnswer: "HI",
      },
      {
        character: "ふ",
        romajiAnswer: "FU",
      },
      {
        character: "へ",
        romajiAnswer: "HE",
      },
      {
        character: "ほ",
        romajiAnswer: "HO",
      },

      // Add more characters as needed
    ],
  },
  {
    groupName: "ま/ma",
    enabled: false,
    characters: [
      {
        character: "ま",
        romajiAnswer: "MA",
      },
      {
        character: "み",
        romajiAnswer: "MI",
      },
      {
        character: "む",
        romajiAnswer: "MU",
      },
      {
        character: "め",
        romajiAnswer: "ME",
      },
      {
        character: "も",
        romajiAnswer: "MO",
      },

      // Add more characters as needed
    ],
  },
  {
    groupName: "や/ya",
    enabled: false,
    characters: [
      {
        character: "や",
        romajiAnswer: "YA",
      },
      {
        character: "ゆ",
        romajiAnswer: "YU",
      },
      {
        character: "よ",
        romajiAnswer: "YO",
      },

      // Add more characters as needed
    ],
  },
  {
    groupName: "ら/ra",
    enabled: false,
    characters: [
      {
        character: "ら",
        romajiAnswer: "RA",
      },
      {
        character: "り",
        romajiAnswer: "RI",
      },
      {
        character: "る",
        romajiAnswer: "RU",
      },
      {
        character: "れ",
        romajiAnswer: "RE",
      },
      {
        character: "ろ",
        romajiAnswer: "RO",
      },
      // Add more characters as needed
    ],
  },
  {
    groupName: "わ/wa",
    enabled: false,
    characters: [
      {
        character: "わ",
        romajiAnswer: "WA",
      },
      {
        character: "を",
        romajiAnswer: "WO",
      },
      {
        character: "ん",
        romajiAnswer: "N",
      },

      // Add more characters as needed
    ],
  },
];

// Dakuten Hiragana Groups
const dakutenHiraganaData: HiraganaGroup[] = [
  {
    groupName: "が/ga",
    enabled: false,
    characters: [
      {
        character: "が",
        romajiAnswer: "GA",
      },
      {
        character: "ぎ",
        romajiAnswer: "GI",
      },
      {
        character: "ぐ",
        romajiAnswer: "GU",
      },
      {
        character: "げ",
        romajiAnswer: "GE",
      },
      {
        character: "ご",
        romajiAnswer: "GO",
      },
    ],
  },
  {
    groupName: "ざ/za",
    enabled: false,
    characters: [
      {
        character: "ざ",
        romajiAnswer: "ZA",
      },
      {
        character: "じ",
        romajiAnswer: "JI",
      },
      {
        character: "ず",
        romajiAnswer: "ZU",
      },
      {
        character: "ぜ",
        romajiAnswer: "ZE",
      },
      {
        character: "ぞ",
        romajiAnswer: "ZO",
      },
    ],
  },
  {
    groupName: "だ/da",
    enabled: false,
    characters: [
      {
        character: "だ",
        romajiAnswer: "DA",
      },
      {
        character: "ぢ",
        romajiAnswer: "ZI/DI",
      },
      {
        character: "づ",
        romajiAnswer: "ZU/DU",
      },
      {
        character: "で",
        romajiAnswer: "DE",
      },
      {
        character: "ど",
        romajiAnswer: "DO",
      },
    ],
  },
  {
    groupName: "ば/ba",
    enabled: false,
    characters: [
      {
        character: "ば",
        romajiAnswer: "BA",
      },
      {
        character: "び",
        romajiAnswer: "BI",
      },
      {
        character: "ぶ",
        romajiAnswer: "BU",
      },
      {
        character: "べ",
        romajiAnswer: "BE",
      },
      {
        character: "ぼ",
        romajiAnswer: "BO",
      },
    ],
  },
  {
    groupName: "ぱ/pa",
    enabled: false,
    characters: [
      {
        character: "ぱ",
        romajiAnswer: "PA",
      },
      {
        character: "ぴ",
        romajiAnswer: "PI",
      },
      {
        character: "ぷ",
        romajiAnswer: "PU",
      },
      {
        character: "ぺ",
        romajiAnswer: "PE",
      },
      {
        character: "ぽ",
        romajiAnswer: "PO",
      },
    ],
  },
];

// Combination Hiragana Groups (Youon)
const combinationHiraganaData: HiraganaGroup[] = [
  {
    groupName: "きゃ/kya",
    enabled: false,
    characters: [
      {
        character: "きゃ",
        romajiAnswer: "KYA",
      },
      {
        character: "きゅ",
        romajiAnswer: "KYU",
      },
      {
        character: "きょ",
        romajiAnswer: "KYO",
      },
    ],
  },
  {
    groupName: "ぎゃ/gya",
    enabled: false,
    characters: [
      {
        character: "ぎゃ",
        romajiAnswer: "GYA",
      },
      {
        character: "ぎゅ",
        romajiAnswer: "GYU",
      },
      {
        character: "ぎょ",
        romajiAnswer: "GYO",
      },
    ],
  },
  {
    groupName: "しゃ/sha",
    enabled: false,
    characters: [
      {
        character: "しゃ",
        romajiAnswer: "SHA",
      },
      {
        character: "しゅ",
        romajiAnswer: "SHU",
      },
      {
        character: "しょ",
        romajiAnswer: "SHO",
      },
    ],
  },
  
  {
    groupName: "じゃ/ja",
    enabled: false,
    characters: [
      {
        character: "じゃ",
        romajiAnswer: "JYA",
      },
      {
        character: "じゅ",
        romajiAnswer: "JYU",
      },
      {
        character: "じょ",
        romajiAnswer: "JYO",
      },
    ],
  },
  {
    groupName: "ちゃ/cha",
    enabled: false,
    characters: [
      {
        character: "ちゃ",
        romajiAnswer: "CHA",
      },
      {
        character: "ちゅ",
        romajiAnswer: "CHU",
      },
      {
        character: "ちょ",
        romajiAnswer: "CHO",
      },
    ],
  },
  {
    groupName: "ぢゃ/dya",
    enabled: false,
    characters: [
      {
        character: "ぢゃ",
        romajiAnswer: "DYA",
      },
      {
        character: "ぢゅ",
        romajiAnswer: "DYU",
      },
      {
        character: "ぢょ",
        romajiAnswer: "DYO",
      },
    ],
  },
  {
    groupName: "にゃ/nya",
    enabled: false,
    characters: [
      {
        character: "にゃ",
        romajiAnswer: "NYA",
      },
      {
        character: "にゅ",
        romajiAnswer: "NYU",
      },
      {
        character: "にょ",
        romajiAnswer: "NYO",
      },
    ],
  },
  {
    groupName: "ひゃ/hya",
    enabled: false,
    characters: [
      {
        character: "ひゃ",
        romajiAnswer: "HYA",
      },
      {
        character: "ひゅ",
        romajiAnswer: "HYU",
      },
      {
        character: "ひょ",
        romajiAnswer: "HYO",
      },
    ],
  },
  {
    groupName: "びゃ/bya",
    enabled: false,
    characters: [
      {
        character: "びゃ",
        romajiAnswer: "BYA",
      },
      {
        character: "びゅ",
        romajiAnswer: "BYU",
      },
      {
        character: "びょ",
        romajiAnswer: "BYO",
      },
    ],
  },
  {
    groupName: "ぴゃ/pya",
    enabled: false,
    characters: [
      {
        character: "ぴゃ",
        romajiAnswer: "PYA",
      },
      {
        character: "ぴゅ",
        romajiAnswer: "PYU",
      },
      {
        character: "ぴょ",
        romajiAnswer: "PYO",
      },
    ],
  },
  {
    groupName: "みゃ/mya",
    enabled: false,
    characters: [
      {
        character: "みゃ",
        romajiAnswer: "MYA",
      },
      {
        character: "みゅ",
        romajiAnswer: "MYU",
      },
      {
        character: "みょ",
        romajiAnswer: "MYO",
      },
    ],
  },
  {
    groupName: "りゃ/rya",
    enabled: false,
    characters: [
      {
        character: "りゃ",
        romajiAnswer: "RYA",
      },
      {
        character: "りゅ",
        romajiAnswer: "RYU",
      },
      {
        character: "りょ",
        romajiAnswer: "RYO",
      },
    ],
  },



];

// Combine all data
const hiraganaData: HiraganaGroup[] = [...basicHiraganaData, ...dakutenHiraganaData, ...combinationHiraganaData];

// Export everything
export default hiraganaData;
export { basicHiraganaData, dakutenHiraganaData, combinationHiraganaData };
export type { HiraganaChar, HiraganaGroup };
