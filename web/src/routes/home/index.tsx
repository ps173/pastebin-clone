import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import hljs from "highlight.js";
// import "highlight.js/styles/night-owl.css";
import "highlight.js/styles/atom-one-dark.css";

const Home: FunctionalComponent = () => {
  const [pasteText, setPasteText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className="w-full mt-5">
      <div className="m-5">
        <textarea
          className="border-black border w-1/2 h-72 text-black"
          value={pasteText}
          onChange={({ currentTarget }) => {
            setPasteText(currentTarget.value);
          }}
          placeholder="Paste Your Text Here"
        />
      </div>
      <div className="mt-4 px-4 w-full">
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-xl font-bold"> Preview </h1>
          <button
            onClick={() => {
              setShowPreview(!showPreview);
            }}
          >
            {showPreview ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {showPreview && pasteText !== "" && (
          <div className="whitespace-pre hljs p-4">
            <code
              className="w-full "
              dangerouslySetInnerHTML={{
                __html: hljs.highlightAuto(pasteText).value,
              }}
            />
          </div>
        )}
      </div>
      <button
        onClick={() => {
          alert("I save Paste");
        }}
        className="m-5 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Save Paste
      </button>
    </div>
  );
};

const ChevronDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

const ChevronUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
};

export default Home;
