import { useRef, useReducer } from "react";
import hiraganaData, {
  basicHiraganaData,
  dakutenHiraganaData,
  combinationHiraganaData,
  HiraganaGroup,
  HiraganaChar,
} from "../data/hiraganaData";
import "../styles/quiz.css";
import { useVoiceCommands } from "../hooks/useVoiceCommands";
import { Mic, MicOff } from "lucide-react";

const Learn = () => {
  const groupsRef = useRef<HiraganaGroup[]>(hiraganaData);
  const enabledGroupsRef = useRef<HiraganaGroup[]>([]);
  const isQuizStarted = useRef(false);
  const quizCharacters = useRef<HiraganaChar[]>([]);
  const wrongAnswers = useRef<number[]>([]);
  const correctAnswers = useRef<number[]>([]);
  const showResults = useRef(false);
  const answerToggle = useRef(false);
  const usersPosition = useRef(0);
  const answered = useRef(false);
  const animationState = useRef<"none" | "correct" | "incorrect">("none");

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const backToSelection = () => {
    showResults.current = false;
    isQuizStarted.current = false;
    quizCharacters.current = [];
    wrongAnswers.current = [];
    correctAnswers.current = [];
    usersPosition.current = 0;
    answered.current = false;
    answerToggle.current = false;
    forceUpdate();
  };

  const retrySameCharacters = () => {
    console.log("Retrying with same characters");
    const randomizedChars = shuffleArray(quizCharacters.current);
    quizCharacters.current = randomizedChars;
    showResults.current = false;
    wrongAnswers.current = [];
    correctAnswers.current = [];
    usersPosition.current = 0;
    answered.current = false;
    answerToggle.current = false;
    isQuizStarted.current = true;
    forceUpdate();
  };

  const { isListening, toggleListening, error } = useVoiceCommands({
    commands: {
      main: () => {
        console.log("Enabling Main Kana");
        enableBasicGroups();
      },
      additional: () => {
        console.log("Enabling Additional Kana");
        enableDakutenGroups();
      },
      combination: () => {
        console.log("Enabling Combination Kana");
        enableCombinationGroups();
      },
      all: () => {
        console.log("Enabling All Kana");
        toggleAllGroups();
      },
      "start quiz": () => {
        console.log("Voice command: Starting quiz");
        const enabledChars = enabledGroupsRef.current.flatMap(
          (group) => group.characters
        );
        console.log(
          "Voice command: Found",
          enabledChars.length,
          "characters from ref"
        );

        if (enabledChars.length === 0) {
          console.log("Voice command: No characters enabled");
          alert("Please select at least one group before starting the quiz!");
          return;
        }

        console.log("Voice command: Starting quiz with characters");
        const randomizedChars = shuffleArray(enabledChars);
        quizCharacters.current = randomizedChars;
        wrongAnswers.current = [];
        correctAnswers.current = [];
        usersPosition.current = 0;
        answered.current = false;
        answerToggle.current = false;
        showResults.current = false;
        isQuizStarted.current = true;
        forceUpdate();
      },
      correct: () => {
        console.log("Marking answer as correct");
        answerCorrect();
      },
      incorrect: () => {
        console.log("Marking answer as incorrect");
        answerIncorrect();
      },
      next: () => {
        console.log("Moving to next character");
        nextCharacter();
      },
      finish: () => {
        console.log("Voice command: Finishing quiz");
        if (
          isQuizStarted.current &&
          usersPosition.current >= quizCharacters.current.length - 1
        ) {
          showResults.current = true;
        }
      },
      retry: () => {
        console.log("Voice command: Retrying with same characters");
        if (showResults.current) {
          retrySameCharacters();
        }
      },
      back: () => {
        console.log("Voice command: Going back to selection");
        backToSelection();
      },
    },
    continuous: true,
    autoStart: false,
  });

  const nextCharacter = () => {
    if (answered.current) {
      answerToggle.current = false;
      answered.current = false;
      usersPosition.current = usersPosition.current + 1;
      animationState.current = "none";
      forceUpdate();
    } else {
      alert("Please answer the question before moving on!");
    }
  };

  const answerCorrect = () => {
    answerToggle.current = true;
    answered.current = true;
    animationState.current = "correct";
    forceUpdate();
    setTimeout(() => {
      animationState.current = "none";
      forceUpdate();
    }, 1000);
    if (
      !wrongAnswers.current.includes(usersPosition.current) &&
      !correctAnswers.current.includes(usersPosition.current)
    ) {
      correctAnswers.current = [
        ...correctAnswers.current,
        usersPosition.current,
      ];
      forceUpdate();
    }
  };

  const answerIncorrect = () => {
    answerToggle.current = true;
    answered.current = true;
    animationState.current = "incorrect";
    forceUpdate();
    setTimeout(() => {
      animationState.current = "none";
      forceUpdate();
    }, 820);
    if (correctAnswers.current.includes(usersPosition.current)) {
      correctAnswers.current = correctAnswers.current.filter(
        (pos) => pos !== usersPosition.current
      );
    }
    if (!wrongAnswers.current.includes(usersPosition.current)) {
      wrongAnswers.current = [...wrongAnswers.current, usersPosition.current];
    }
    forceUpdate();
  };

  const shuffleArray = (array: HiraganaChar[]): HiraganaChar[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getEnabledCharacters = (): HiraganaChar[] => {
    return groupsRef.current
      .filter((group) => group.enabled)
      .flatMap((group) => group.characters);
  };

  const updateGroups = (newGroups: HiraganaGroup[]) => {
    groupsRef.current = newGroups;
    const enabled = newGroups.filter((group) => group.enabled);
    enabledGroupsRef.current = enabled;
    forceUpdate();
  };

  const toggleGroup = (index: number) => {
    const newGroups = groupsRef.current.map((group, idx) =>
      idx === index ? { ...group, enabled: !group.enabled } : group
    );
    updateGroups(newGroups);
  };

  const toggleAllGroups = () => {
    const newGroups = groupsRef.current.map((group) => ({
      ...group,
      enabled: !group.enabled,
    }));
    updateGroups(newGroups);
  };

  const enableBasicGroups = () => {
    const newGroups = groupsRef.current.map((group) => ({
      ...group,
      enabled: basicHiraganaData.some(
        (basic) => basic.groupName === group.groupName
      )
        ? !group.enabled
        : group.enabled,
    }));
    updateGroups(newGroups);
  };

  const enableDakutenGroups = () => {
    const newGroups = groupsRef.current.map((group) => ({
      ...group,
      enabled: dakutenHiraganaData.some(
        (dakuten) => dakuten.groupName === group.groupName
      )
        ? !group.enabled
        : group.enabled,
    }));
    updateGroups(newGroups);
  };

  const enableCombinationGroups = () => {
    const newGroups = groupsRef.current.map((group) => ({
      ...group,
      enabled: combinationHiraganaData.some(
        (combo) => combo.groupName === group.groupName
      )
        ? !group.enabled
        : group.enabled,
    }));
    updateGroups(newGroups);
  };

  const startQuiz = () => {
    console.log("Starting quiz");
    const enabledChars = getEnabledCharacters();

    if (enabledChars.length === 0) {
      alert("Please select at least one group before starting the quiz!");
      return;
    }
    const randomizedChars = shuffleArray(enabledChars);
    quizCharacters.current = randomizedChars;
    isQuizStarted.current = true;
    forceUpdate();
  };

  const SelectionScreen2 = () => (
    <>
      <div className="mb-6 text-center">
        <p className="text-lg sm:text-xl w-full sm:w-3/4 md:w-1/2 mx-auto mt-4 sm:mt-10 mb-8 px-4">
          The purpose of this tool is to help you learn hiragana, without using
          your hands and testing your memory + self honesty! Use it to practice
          whilst doing other things e.g. washing dishes, or putting clothes
          away, etc. KATAKANA COMING SOON!
        </p>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <button
          onClick={toggleAllGroups}
          className={`border-8 p-4 w-full text-center ${
            groupsRef.current.every((group) => group.enabled)
              ? "border-green-500 bg-[#268bd2] text-white"
              : "border-[#268bd2] text-[#268bd2]"
          } cursor-pointer hover:border-[#268bd2]`}
        >
          {groupsRef.current.every((group) => group.enabled)
            ? "DISABLE ALL KANA"
            : "ENABLE ALL KANA"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row w-full text-center mt-10 gap-4">
        <div className="w-full md:w-1/3 gap-y-4">
          <h1 className="text-3xl font-bebas font-bold text-[#268bd2] mb-4 text-center">
            Main Kana
          </h1>
          <button
            className={`border-8 p-4 w-full text-center mb-4 ${
              groupsRef.current
                .slice(0, basicHiraganaData.length)
                .every((group) => group.enabled)
                ? "border-green-500 bg-[#268bd2] text-white"
                : "border-[#268bd2] text-[#268bd2]"
            } cursor-pointer hover:border-[#268bd2]`}
            onClick={enableBasicGroups}
          >
            All Main Kana
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {groupsRef.current
              .slice(0, basicHiraganaData.length)
              .map((group, index) => (
                <div
                  key={group.groupName}
                  className={`p-4 border-8 text-center ${
                    group.enabled
                      ? "border-green-500 bg-[#268bd2] text-white"
                      : "border-[#268bd2] text-[#268bd2]"
                  } cursor-pointer hover:border-[#268bd2]`}
                  onClick={() => toggleGroup(index)}
                >
                  <div className="flex justify-center items-center">
                    <span className="font-medium">{group.groupName}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 gap-y-4">
          <h1 className="text-3xl font-bebas font-bold text-[#268bd2] mb-4 text-center">
            Dakuten Kana
          </h1>
          <button
            className={`border-8 p-4 w-full text-center mb-4 ${
              groupsRef.current
                .slice(
                  basicHiraganaData.length,
                  basicHiraganaData.length + dakutenHiraganaData.length
                )
                .every((group) => group.enabled)
                ? "border-green-500 bg-[#268bd2] text-white"
                : "border-[#268bd2] text-[#268bd2]"
            } cursor-pointer hover:border-[#268bd2]`}
            onClick={enableDakutenGroups}
          >
            All Dakuten Kana
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-1 gap-3">
            {groupsRef.current
              .slice(
                basicHiraganaData.length,
                basicHiraganaData.length + dakutenHiraganaData.length
              )
              .map((group, index) => (
                <div
                  key={group.groupName}
                  className={`p-4 border-8 text-center ${
                    group.enabled
                      ? "border-green-500 bg-[#268bd2] text-white"
                      : "border-[#268bd2] text-[#268bd2]"
                  } cursor-pointer hover:border-[#268bd2]`}
                  onClick={() => toggleGroup(index + basicHiraganaData.length)}
                >
                  <div className="flex justify-center items-center">
                    <span className="font-medium">{group.groupName}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 gap-y-4">
          <h1 className="text-3xl font-bebas font-bold text-[#268bd2] mb-4 text-center">
            Combination Kana
          </h1>
          <button
            className={`border-8 p-4 w-full text-center mb-4 ${
              groupsRef.current
                .slice(basicHiraganaData.length + dakutenHiraganaData.length)
                .every((group) => group.enabled)
                ? "border-green-500 bg-[#268bd2] text-white"
                : "border-[#268bd2] text-[#268bd2]"
            } cursor-pointer hover:border-[#268bd2]`}
            onClick={enableCombinationGroups}
          >
            All Combination Kana
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {groupsRef.current
              .slice(basicHiraganaData.length + dakutenHiraganaData.length)
              .map((group, index) => (
                <div
                  key={group.groupName}
                  className={`p-4 border-8 text-center ${
                    group.enabled
                      ? "border-green-500 bg-[#268bd2] text-white"
                      : "border-[#268bd2] text-[#268bd2]"
                  } cursor-pointer hover:border-[#268bd2]`}
                  onClick={() =>
                    toggleGroup(
                      index +
                        basicHiraganaData.length +
                        dakutenHiraganaData.length
                    )
                  }
                >
                  <div className="flex justify-center items-center">
                    <span className="font-medium">{group.groupName}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={startQuiz}
          className="px-8 py-3 bg-[#268bd2] text-white rounded-lg text-lg font-bebas hover:bg-[#268bd2] transform hover:scale-105 transition-all"
        >
          Start Quiz ({getEnabledCharacters().length} Characters)
        </button>
      </div>
    </>
  );

  const ResultsScreen = () => (
    <div className="results-container">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bebas mb-6 text-[#268bd2] font-bold">
          Quiz Results
        </h2>
        <div className="flex gap-4 sm:gap-8 mb-8">
          <div className="text-center px-2 sm:px-4">
            <p className="text-xl sm:text-2xl font-bebas text-[#2fca2f]">
              Correct
            </p>
            <p className="text-3xl sm:text-4xl font-bold">
              {correctAnswers.current.length}
            </p>
          </div>
          <div className="text-center px-2 sm:px-4">
            <p className="text-xl sm:text-2xl font-bebas text-[#e64141]">
              Incorrect
            </p>
            <p className="text-3xl sm:text-4xl font-bold">
              {wrongAnswers.current.length}
            </p>
          </div>
          <div className="text-center px-2 sm:px-4">
            <p className="text-xl sm:text-2xl font-bebas text-[#268bd2]">
              Total
            </p>
            <p className="text-3xl sm:text-4xl font-bold">
              {quizCharacters.current.length}
            </p>
          </div>
        </div>

        <div className="w-full max-w-4xl px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bebas mb-4 text-[#2fca2f]">
            Characters You Got Right:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 mb-8">
            {correctAnswers.current.map((index) => (
              <div
                key={quizCharacters.current[index].character}
                className="p-3 sm:p-4 border-2 border-[#2fca2f] rounded-lg bg-white"
              >
                <div className="text-xl sm:text-2xl mb-1">
                  {quizCharacters.current[index].character}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {quizCharacters.current[index].romajiAnswer}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-bebas mb-4 text-[#e64141]">
            Characters You Got Wrong:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 mb-8">
            {wrongAnswers.current.map((index) => (
              <div
                key={quizCharacters.current[index].character}
                className="p-3 sm:p-4 border-2 border-[#e64141] rounded-lg bg-white"
              >
                <div className="text-xl sm:text-2xl mb-1">
                  {quizCharacters.current[index].character}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {quizCharacters.current[index].romajiAnswer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full px-4 sm:px-0 sm:w-auto">
          <button
            onClick={backToSelection}
            className="w-full sm:w-auto px-8 py-3 bg-[#268bd2] text-white rounded-lg text-lg font-bebas hover:bg-[#268bd2] transform hover:scale-105 transition-all"
          >
            Back to Selection
          </button>
          <button
            onClick={retrySameCharacters}
            className="w-full sm:w-auto px-8 py-3 bg-[#268bd2] text-white rounded-lg text-lg font-bebas hover:bg-[#268bd2] transform hover:scale-105 transition-all"
          >
            Retry Same Characters
          </button>
        </div>
      </div>
    </div>
  );

  const QuizScreen = () => {
    const progress =
      ((usersPosition.current + 1) / quizCharacters.current.length) * 100;

    const getStatusColor = (position: number) => {
      if (correctAnswers.current.includes(position)) return "bg-[#2fca2f]";
      if (wrongAnswers.current.includes(position)) return "bg-[#e64141]";
      return "bg-gray-200";
    };

    return (
      <div className="quiz-container">
        <div>
          <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 justify-between">
            <h2 className="font-bebas text-center text-[#268bd2] text-4xl font-bold">
              Hiragana Quiz
            </h2>
            <button
              onClick={backToSelection}
              className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm ml-auto"
            >
              Back to Selection
            </button>
          </div>
          <div>
            <ul className="list-disc text-lg">
              <li>
                <h3>
                  <span>
                    Made for voice control but you're welcome to use it as a
                    normal quiz!
                  </span>
                </h3>
              </li>
              <li>
                <h3>
                  <span>
                    If you know the answer, press or say "correct" to track
                    progressl!
                  </span>
                </h3>
              </li>
              <li>
                <h3>
                  <span>
                    If you don't know the answer, press or say "incorrect" to
                    track progress!
                  </span>
                </h3>
              </li>
              <li>
                <h3>
                  <span>
                    Press or say "next" to move on to the next character!
                  </span>
                </h3>
              </li>
              <li>
                <h3>
                  <span>
                    Be honest with yourself to get the most out of this tool!
                  </span>
                </h3>
              </li>

              <li>
                <h3>
                  <span>
                    Be honest with yourself to get the most out of this tool!
                  </span>
                </h3>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden sm:block sm:flex-1"></div>

          <div
            className={`quiz-panel w-full sm:w-[400px] p-3 border rounded-lg bg-[#268bd2] aspect-[4/5] sm:h-[500px] relative transition-colors duration-300 ${
              animationState.current === "correct"
                ? "panel-correct"
                : animationState.current === "incorrect"
                  ? "panel-incorrect"
                  : ""
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-7xl sm:text-9xl text-white font-bebas font-bold">
                  {quizCharacters.current[usersPosition.current]?.character}
                </h1>
                {answerToggle.current && (
                  <p className="text-3xl sm:text-5xl text-white font-bebas mt-8 font-semibold">
                    {
                      quizCharacters.current[usersPosition.current]
                        ?.romajiAnswer
                    }
                  </p>
                )}
              </div>

              <div className="w-full flex flex-row gap-4 mt-4">
                <button
                  className="bg-[#e64141] text-white p-4 rounded-lg w-1/2 shadow-lg transform hover:scale-105 transition-all font-semibold"
                  onClick={answerIncorrect}
                >
                  Incorrect
                </button>
                <button
                  className={`bg-[#2fca2f] text-white p-4 rounded-lg w-1/2 shadow-lg transform hover:scale-105 transition-all font-semibold ${
                    wrongAnswers.current.includes(usersPosition.current)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={answerCorrect}
                  disabled={wrongAnswers.current.includes(
                    usersPosition.current
                  )}
                >
                  Correct
                </button>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto sm:flex-1 flex justify-center sm:justify-end">
            {usersPosition.current < quizCharacters.current.length - 1 ? (
              <button
                className="w-full sm:w-40 bg-[#268bd2] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all font-semibold h-16 sm:h-20"
                onClick={nextCharacter}
              >
                Next
              </button>
            ) : (
              <button
                className="w-full sm:w-40 bg-[#268bd2] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all font-semibold h-16 sm:h-20"
                onClick={() => {
                  showResults.current = true;
                }}
              >
                Finish
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 w-full px-4 sm:px-0">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Progress: {usersPosition.current + 1} /{" "}
              {quizCharacters.current.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="flex h-full">
              {quizCharacters.current.map((_, index) => (
                <div
                  key={index}
                  className={`${getStatusColor(index)} transition-all duration-300`}
                  style={{
                    width: `${100 / quizCharacters.current.length}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50 py-4 sm:py-6 md:py-8">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md z-50 max-w-md">
          {error}
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <button
            onClick={toggleListening}
            className={`px-4 h-12 rounded-full flex align-middle items-center justify-center transition-colors duration-200 ${
              isListening
                ? "bg-[#268bd2] text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            title={isListening ? "Stop voice control" : "Start voice control"}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                <span className="font-bebas">STOP</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                <span className="font-bebas">START</span>
              </>
            )}
          </button>
        </div>
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-4xl sm:text-5xl mt-4 font-bold font-bebas text-[#268bd2] ">
            HFTOFU's Learn Kana Tool!
          </h1>
        </div>

        {showResults.current ? (
          <ResultsScreen />
        ) : !isQuizStarted.current ? (
          <SelectionScreen2 />
        ) : (
          <QuizScreen />
        )}
      </div>
    </div>
  );
};

export default Learn;
