import React, { useState } from "react";
import "./App.css";

function App() {
  const [formFields, setFormFields] = useState([
    { name: "", gender: "", errors: { name: "", gender: "" } },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...formFields];
    updated[index][field] = value;
    updated[index].errors[field] = "";
    setFormFields(updated);
  };

  const handleAdd = () => {
    setFormFields([
      ...formFields,
      { name: "", gender: "", errors: { name: "", gender: "" } },
    ]);
  };

  const handleDelete = (index) => {
    if (formFields.length === 1) return;
    const updated = [...formFields];
    updated.splice(index, 1);
    setFormFields(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const updated = formFields.map((f) => {
      const errors = {
        name: f.name.trim() ? "" : "Name is required",
        gender: f.gender ? "" : "Gender is required",
      };
      if (errors.name || errors.gender) hasError = true;
      return { ...f, errors };
    });
    setFormFields(updated);
    setSubmitted(!hasError);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div className="row" key={index}>
            <div className="column">
              <input
                type="text"
                placeholder="Enter name"
                value={field.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
              {field.errors.name && <div className="error">{field.errors.name}</div>}
            </div>
            <div className="column">
              <select
                value={field.gender}
                onChange={(e) => handleChange(index, "gender", e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {field.errors.gender && <div className="error">{field.errors.gender}</div>}
            </div>
            <button
              type="button"
              className="delete-btn"
              title="Delete this row"
              onClick={() => handleDelete(index)}
              disabled={formFields.length === 1}
            >
              🗑️
            </button>
          </div>
        ))}
        <div className="actions">
          <button type="button" onClick={handleAdd}>
            ➕ Add More
          </button>
          <button type="submit">✅ Submit</button>
        </div>
      </form>

      {submitted && (
        <>
          <div className="output">
            <h2>Form Data (H3 format)</h2>
            {formFields.map((f, i) => (
              <div key={i}>
                <h3>Name: {f.name}</h3>
                <h3>Gender: {f.gender}</h3>
              </div>
            ))}
          </div>

          <div className="output">
            <h2>Form Data (Table format)</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {formFields.map((f, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{f.name}</td>
                    <td>{f.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
