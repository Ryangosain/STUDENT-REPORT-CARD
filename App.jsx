import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([
    { name: "Aman", score: 78 },
    { name: "Riya", score: 45 },
    { name: "Karan", score: 90 },
    { name: "Neha", score: 88 },
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  // Add student
  const addStudent = (e) => {
    e.preventDefault();
    if (!name || score === "") return;

    let safeScore = Number(score);
    if (safeScore > 100) safeScore = 100;
    if (safeScore < 0) safeScore = 0;

    setStudents([...students, { name, score: safeScore }]);

    setName("");
    setScore("");
  };

  // Update score
  const updateScore = (index, value) => {
    let safeValue = Number(value);
    if (safeValue > 100) safeValue = 100;
    if (safeValue < 0) safeValue = 0;

    const updated = [...students];
    updated[index].score = safeValue;
    setStudents(updated);
  };

  // Delete student
  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  // Stats
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avg =
    students.length > 0
      ? students.reduce((acc, s) => acc + s.score, 0) / students.length
      : 0;

  return (
    <div className="container">
      <div className="box">
      <h1 className="title">
        STUDENT <span>SCOREBOARD</span>
      </h1>

      {/* Form */}
      <div className="coverForm">
        <div className="innerCover">
        <div className="formHead"><span className="glow">●</span> STUDENT REGISTER </div>
        <div><span>NEW ENTRY</span></div>
        </div>
      <form className="innerForm" onSubmit={addStudent}>
        <input
        className="formBtn"
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
        className="formBtn"
          type="number"
          placeholder="Score (0-100)"
          value={score}
          min="0"
          max="100"
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 100) value = 100;
            if (value < 0) value = 0;
            setScore(value);
          }}
        />

        <button type="submit" className="addBtn">+ ADD</button>
       
      </form>
      </div>

      {/* Stats */}
      <div className="stats">

        <span>
         < div >
          <p>TOTAL</p>
          <h2>{total}</h2>
        </div>
        </span>
        <span>
          <div >
          <p>PASSED</p>
          <h2>{passed}</h2>
        </div>
        </span>
        
          <div >
          <p>AVG SCORE</p>
          <h2>{avg.toFixed(0)}</h2>
        </div>
        
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>SCORE</th>
            <th>STATUS</th>
            <th>UPDATE</th>
            <th>REMOVE</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>

              <td className="score">{s.score}</td>

              <td>
                <span className={s.score >= 40 ? "pass" : "fail"}>
                  {s.score >= 40 ? "PASS" : "FAIL"}
                </span>
              </td>

              <td>
                <input
                  type="number"
                  value={s.score}
                  min="0"
                  max="100"
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value > 100) value = 100;
                    if (value < 0) value = 0;
                    updateScore(i, value);
                  }}
                  className="updateInput"
                />
              </td>

              <td>
                <button
                  className="deleteBtn"
                  onClick={() => deleteStudent(i)}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default App;