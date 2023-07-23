import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [incidents, setIncidents] = useState(() => {
    const localValue = localStorage.getItem('incidents');
    if(localValue == null) return [];
    return JSON.parse(localValue) 
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  },[incidents])

  useEffect(() => {
    if(!selectedFile){
      setPreview(undefined);
      setImage(undefined)
      return;
    }
    const objectURL = URL.createObjectURL(selectedFile);
    setPreview(objectURL);
    // setImage(preview)
    return () => URL.revokeObjectURL(objectURL);
  }, [selectedFile])

  

  const onSelectFile = e => {
    if(!e.target.files || e.target.files.length === 0){
      setSelectedFile(undefined);
      return;
    }
    setFile(e.target.value);
    setSelectedFile(e.target.files[0]);
    // setImage(preview)
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIncidents((currentIncidents) => {
      return [
        ...currentIncidents,
        {
          id: crypto.randomUUID(),
          name: name,
          description: description,
          location: location,
          date: date,
          file: file,
          completed: false,
        },
      ];
    });
    // console.log(date);
    console.log(file);
    setName("");
    setDescription("");
    setLocation("");
    setDate("");
    setFile("");
    // setSelectedFile(undefined);
    // setPreview(undefined);
  }

  function deleteIncident(id) {
    setIncidents((currentIncidents) => {
      return currentIncidents.filter((incident) => incident.id !== id);
    });
  }


  return (
    <>
      <h1 id="head">Incident Tracker</h1>
      <form
        onSubmit={handleSubmit}
        className="new-item-form"
        method="post"
        encType="multipart/form-data"
      >
        <div className="form-row">
          <label htmlFor="name">Title</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter title..."
          />
          <label htmlFor="description">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="description"
            placeholder="Enter description..."
          />
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            placeholder="Enter location..."
          />
          <label htmlFor="date">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
          />
          {/* <label htmlFor="file">Upload File</label>
          <input
            value={file}
            // onChange={(e) => {
            //   setFile(e.target.value)
            //   console.log(e.target.files[0]);
            // }}
            onChange={onSelectFile}
            type="file"
            id="file"
            accept="image/jpeg, image/png, image/jpg"
          /> */}
        </div>
        <button className="btn">Add Incident</button>
      </form>
      <h1>Incidents</h1>
      <table className="list">
        {/* {incidents.length === 0 && "No incidents"} */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        {incidents.map((incident) => {
          return (
            <tbody key={incident.id}>
              <tr >
                <td>{incident.name}</td>
                <td>{incident.description}</td>
                <td>{incident.location}</td>
                <td>{incident.date}</td>
                <td>
                  <button
                  className="btn btn-danger"
                  onClick={() => deleteIncident(incident.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
            
          );
        })}
      </table>
    </>
  );
}


