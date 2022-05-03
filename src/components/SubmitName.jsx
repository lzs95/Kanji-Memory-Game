import React, { useState }  from "react";
import axios from "axios";

const SubmitName = ({ turns, setShowSubmitName }) => {
  const [name, setName] = useState("");

  const submitScore = async () => {
    if (name) {
      const score = {
        name: name,
        score: turns,
      };
      await axios.post("/leaderboard", score);
      setShowSubmitName(false);
    }
  };

  return (
    <div className="submit-name">
      <h5>You won!</h5>
      <h5>Enter your name!</h5> 
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submitScore}>Submit</button>
    </div>
  );
};

export default SubmitName;
