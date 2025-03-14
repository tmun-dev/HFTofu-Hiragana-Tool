// Example usage in any component
import Accordion from "../components/Accordion";
const About = () => {
  const faqItems = [
    {
      title: "How to use voice commands?",
      content: (
        <div>
          <p className="mb-2">On the Learn tab, you can use the following voice commands:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>"Main" - toggle main kana</li>
            <li>"Additional" - toggle additional kana</li>
            <li>"Combination" - toggle combination kana</li>
            <li>"All" - toggle all kana</li>
            <li>"Start Quiz" - begin the quiz</li>
            <li>"Correct" - mark answer as correct</li>
            <li>"Incorrect" - mark answer as incorrect</li>
            <li>"Next" - go to next character</li>
            <li>"Finish" - end quiz and see results</li>
            <li>"Retry" - retry the quiz with the same characters</li>
            <li>"Back" - go back to the selection screen</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Why is this application free?",
      content: (
        <div>
          <p>I made it for me! I made what was missing from other applications and I hope you find it useful! </p>
    
          <p>I'm not a professional Japanese speaker, so I'm sure there are many things that could be improved. </p>

        </div>
      ),
    },
    {
      title: "Suggestions?",
      content: (
        <div>
             <p>
          If you have any suggestions, please let me know! I'm always looking for ways to improve the application.
        </p>
        <p>
          Katakana is coming soon!
        </p>
        </div>
     
      ),
    },
    {
      title: "Contact Information?",
      content: (
        <p>
          PlaceHolder
        </p>
      ),
    },
  ];
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Hero section with overlay text */}
        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-8 sm:mb-12">
          <img
            src="../public/images/hero.png"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto transform -translate-y-70 pb-4">
          <main className="mb-4">
            <div className="inline-block bg-[#268bd2] p-2 whitespace-nowrap text-left font-bebas">
              <h1 className="text-5xl text-white mb-2 font-bebas">
                ABOUT HANDS FREE TOFU
              </h1>
            </div>
            <br />
            <div className="inline-block bg-[#268bd2] p-2 whitespace-nowrap text-left font-bebas">
              <p className="text-2xl text-white">
                THE STORY BEHIND THE PROJECT
              </p>
            </div>
          </main>
          <div className="bg-white p-16 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] text-2xl">
              <h2 className="text-2xl font-bebas text-[#268bd2] mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
