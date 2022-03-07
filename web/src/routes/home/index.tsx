import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import hljs from "highlight.js";
// import "highlight.js/styles/night-owl.css";
import "highlight.js/styles/atom-one-dark.css";
import ChevronUp from "../../components/icons/ChevronUp";
import ChevronDown from "../../components/icons/ChevronDown";
import { Paste } from "../../lib/types";

const Home: FunctionalComponent = () => {
  const [formData, setFormData] = useState<Paste>({
    text: "",
    author: "",
    language: "",
  });
  const handleValueChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [pasteText, setPasteText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const saveText = async () => {
    const data = await fetch("http://localhost:6969").then((res) => res.json());
    console.log({ data });
  };
  return (
    <div className="min-w-screen bg-primary bg-opacity-95 pt-5 min-h-screen">
      <div className="w-full h-full grid grid-cols-2 gap-4 px-4">
        <div className="">
          <textarea
            className="border-black bg-primary border w-full h-44 text-primaryGrey p-5"
            value={formData.text}
            name="text"
            onChange={({ currentTarget }) =>
              handleValueChange(currentTarget.name, currentTarget.value)
            }
            placeholder="Paste Your Text Here"
          />
        </div>
        <div className="mt-4 px-4 w-full">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-xl text-primaryGreen font-semibold tracking-widest">
              Preview
            </h1>
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
          <div className="flex space-x-4 items-center">
            <label htmlFor="author" className="text-primaryRed">
              Author
            </label>
            <input
              type="text"
              name="author"
              onChange={({ currentTarget }) =>
                handleValueChange(currentTarget.name, currentTarget.value)
              }
              className="bg-primary text-primaryGrey p-2 border-black"
              placeholder="Author Name"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          console.log(formData);
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
