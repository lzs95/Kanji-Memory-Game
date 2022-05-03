import React, { useState }  from "react";
import axios from "axios";

const SubmitName = ({ turns, setShowSubmitName }) => {
  const [name, setName] = useState("");

  const submitScore = async () => {
    if (name) {
      const score = { name: name, score: turns };
      await axios.post("/leaderboard", score);
      setShowSubmitName(false);
    }
  };

  return (
    <div className="submit-name">
      <h5>You won!</h5>
      <h5>Enter your name &#128081;</h5> 
      <input
        type="text"
        value={name}
        placeholder="your name"
        onChange={(e) => setName(e.target.value)}
        className="submit-input"
      />
      <div onClick={submitScore} className="submit-btn">Submit</div>
    </div>
  );
};

export default SubmitName;
