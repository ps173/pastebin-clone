import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import hljs from "highlight.js";
// import "highlight.js/styles/night-owl.css";
import "highlight.js/styles/atom-one-dark.css";
import ChevronUp from "../../components/icons/ChevronUp";
import ChevronDown from "../../components/icons/ChevronDown";

const Home: FunctionalComponent = () => {
  const [pasteText, setPasteText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const saveText = async () => {
    const data = await fetch("http://localhost:6969").then((res) => res.json());
    console.log({ data });
  };
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
          console.log(pasteText);
          saveText();
        }}
        className="m-5 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
      >
        Save Paste
      </button>
    </div>
  );
};
export default Home;
