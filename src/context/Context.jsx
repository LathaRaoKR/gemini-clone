import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini"; // Make sure this function exists and works

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    const newChat = () =>{
        setLoading(false);
        setShowResult(false)
    }
    const onSent = async (prompt) => {
    try {
      setShowResult(true); // Show result container
      setLoading(true); // Show loading indicator
      setRecentPrompt(input); // Update current prompt
      setResultData(""); // Clear previous result

      const response = await run(prompt); // Call Gemini API

      // Format response: bold between ** and line breaks for \n
      let responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          formattedResponse += `<br><b>${responseArray[i]}</b><br>`;
        } else {
          formattedResponse += responseArray[i];
        }
      }

      formattedResponse = formattedResponse.replace(/\n/g, "<br/>");

      setResultData(formattedResponse); // Show formatted result
      setLoading(false);
      setInput(""); // Clear input field
    } catch (err) {
      console.error("Error in onSent:", err);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts, delayPara,newChat,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    onSent,
    run, // Expose run function if needed elsewhere
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
