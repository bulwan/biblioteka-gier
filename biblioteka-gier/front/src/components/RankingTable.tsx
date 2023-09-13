import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function RankingTable(props) {
  const [ranking, setRanking] = useState();
  function compareByCompletedLength(a, b) {
    return b[props.type].length - a[props.type].length;
  }
  function compareByCompletedLength2(a, b) {
    return a[props.type].length - b[props.type].length;
  }
  const fetchData = () => {
    axios.get(`http://localhost:1337/api/users?populate=*`).then((response) => {
      let table = response.data;
      table.sort(compareByCompletedLength);
      setRanking(table.slice(0, 5));
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columnColor =
    props.type === "completed"
      ? "#6a994e"
      : props.type === "abandoned"
      ? "#bc4749"
      : props.type === "inPlans"
      ? "#1982c4"
      : props.type === "playing"
      ? "#c09c3b"
      : "#454545";
  return (
    <div className="ranking-table">
      <h2 className="ranking-title" style={{ backgroundColor: columnColor }}>
        {props.type}
      </h2>
      <table className="ranking-header">
        <colgroup>
          <col></col>
          <col style={props.type === "completed" ? { backgroundColor: columnColor } : null}></col>
          <col style={props.type === "inPlans" ? { backgroundColor: columnColor } : null}></col>
          <col style={props.type === "abandoned" ? { backgroundColor: columnColor } : null}></col>
          <col style={props.type === "playing" ? { backgroundColor: columnColor } : null}></col>
        </colgroup>
        <tr>
          <th className="ranking-header-first">Username</th>
          <th>Completed</th>
          <th>In Plans</th>
          <th>Playing</th>
          <th>Abandoned</th>
        </tr>
        {ranking?.map((item) => (
          <tr>
            <td className="record record-username">{item.username}</td>
            <td className="record record-number">{item.completed.length}</td>
            <td className="record record-number">{item.inPlans.length}</td>
            <td className="record record-number">{item.abandoned.length}</td>
            <td className="record record-number">{item.playing.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default RankingTable;
