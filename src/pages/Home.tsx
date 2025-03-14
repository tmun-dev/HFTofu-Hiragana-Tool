import hero from '../assets/hero.png';
//
const Home = () => {
  return (
    <div className="w-full bg-white ">
      <div className="container mx-auto px-4  ">
        {/* Hero section with overlay text */}
        <div className="w-screen   relative left-1/2 right-1/2 -mx-[50vw] mb-8 sm:mb-12">
          <img
            src={hero}
            className="w-full h-full object-cover"
          ></img>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto transform -translate-y-70 pb-4  ">
          <main className="mb-4">
            <div className="inline-block bg-[#268bd2] p-2 whitespace-nowrap text-left font-bebas">
              <h1 className="text-5xl text-white mb-2 font-bebas">
                WELCOME TO HANDS FREE TOFU
              </h1>
            </div>
            <br></br>
            <div className="inline-block bg-[#268bd2] p-2 whitespace-nowrap text-left font-bebas">
              <p className="text-2xl text-white">
                LEARN HIRAGANA WITH OUT HANDS FREE APPLICATION
              </p>
            </div>
            <br></br>
            <div className="inline-block bg-[#1d689d] p-2 font-bebas">
              <p className="text-white text-2xl">
                CREATED BY NIMC
              </p>
            </div>
          </main>
          <div className="bg-white p-16 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]  text-2xl ">
            <p className="text-[#3c3f41] mb-4">
              To learn hiragana is to create a foundation for the rest of your
              Japanese. By learning hiragana, you will learn the basics of
              Japanese pronunciation. It will also open doors in terms of the
              Japanese resources you can use.
            </p>

            <p className="text-[#3c3f41] mb-4">
              The goal of Hand Free Tofu is to help supplement your learning of
              hiragana. I recommend{" "}
              <a
                className="text-[#268bd2]"
                href="https://www.tofugu.com/japanese/learn-hiragana/"
              >
                Tofugu{" "}
              </a>
              to get started with learning hiragana. Once done, we aim to
              provide a different way to do excercises in your understanding of
              hiragana. And soon Katakana!
            </p>

            <p className="text-[#3c3f41] mb-4">
              To make this possible, the application will employ a few important
              methods.
            </p>
            <ol className="list-decimal list-inside text-[#3c3f41]">
              <li>
                <b className="font-semibold text-[#373a3c]">Voice control </b>{" "}
                so you can practice when doing chores
              </li>
              <li>
                <b className="font-semibold text-[#373a3c] ">
                  Randomly generated{" "}
                </b>{" "}
                set of characters to practice with
              </li>

              <li>
                <b className="font-semibold text-[#373a3c]">
                  A way to track your progress{" "}
                </b>
              </li>
            </ol>
            <p className="text-[#3c3f41] mb-4 mt-4">
              If you want to learn more about how I use this tool and why I've
              made it, please check out the video below. Timestamps will be
              included so you can skip where necessary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 