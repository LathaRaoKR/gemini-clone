import { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import  {Context}  from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultdata,
    input,
    setInput,
  } = useContext(Context); //use context hook

  return (
    <div className="main">
      <div className="nav">
        {/*navbar of main component*/}
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? ( //if showresult is false,display the following
          <>
            <div className="greet">
              <p>
                <span>Hello Dev,</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? ( //if loading is true display three lines
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultdata}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="main-bottom">
        <div className="searchbox">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div className="search-icons">
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />

            <img
              onClick={() => onSent(input)}
              src={assets.send_icon}
              alt="Send Icon"
            />
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its answers.
        </p>
      </div>
    </div>
  );
};

export default Main;
