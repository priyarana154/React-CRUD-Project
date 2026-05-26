import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!name || !course || !email) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      course,
      email,
    };

    setStudents([...students, newStudent]);

    clearForm();
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);

    setStudents(updatedStudents);
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEmail(student.email);

    setEditId(student.id);
  };

  const handleUpdate = () => {
    const updatedStudents = students.map((student) =>
      student.id === editId
        ? {
            ...student,
            name,
            course,
            email,
          }
        : student,
    );

    setStudents(updatedStudents);

    clearForm();
    setEditId(null);
  };

  const clearForm = () => {
    setName("");
    setCourse("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management System</h1>
        <p>React CRUD Project</p>
      </div>

      {/* FORM */}

      <div className="form-box">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {editId ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update Student
          </button>
        ) : (
          <button className="add-btn" onClick={handleAdd}>
            Add Student
          </button>
        )}
      </div>

      {/* STUDENT LIST */}

      <div className="student-container">
        {students.length > 0 ? (
          students.map((student) => (
            <div className="student-card" key={student.id}>
              <div className="profile-circle">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <h2>{student.name}</h2>

              <p>
                <span>Course:</span> {student.course}
              </p>

              <p>
                <span>Email:</span> {student.email}
              </p>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-box">
            <h2>No Students Added</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
