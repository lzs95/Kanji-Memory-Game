import React,{ useState, useEffect } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  const getLeaderBoard = async () => {
    const res = await axios.get("/leaderboard");
    const leadUsers = res.data;
    const sortedUser = leadUsers.sort((a, b) => b.score - a.score)
    
    setUsers(sortedUser);
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div className="leader-board">
      <div>Leader Board</div>
        {users.map((user, key)=>
        (<div className="lanking" key ={key}>
          <div className="user-name">&#128081;{user.name}</div>
          <div className="user-score">score:{user.score}</div>
        </div>)
        )}
    </div>
  );
};

export default LeaderBoard;

