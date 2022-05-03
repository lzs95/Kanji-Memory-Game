import React,{ useState, useEffect } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const kanjiNums = ["一", "二", "三", "四", "五"];
  const [users, setUsers] = useState([]);

  const getLeaderBoard = async () => {
    const res = await axios.get("/leaderboard");
    const leadUsers = res.data;
    leadUsers.splice(5);

    const sortedUsers = leadUsers.sort((a, b) => a.score - b.score)
    setUsers(sortedUsers);
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div className="leader-board">
      <div className="board-title">Best Scores</div>
      {users.map((user, index)=>
        (<div className="ranking" key ={index}>
          <div className="rank">{kanjiNums[index]}. </div>
          <div className="user-name">{user.name}</div>
          <div className="user-score-title">score :</div>
          <div className="user-score">{user.score}</div>
          <div>&#128081;</div>
        </div>)
      )}
    </div>
  );
};

export default LeaderBoard;
