import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { Web3Storage } from "web3.storage";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4ZThBQkVDQTNmMkQ1YUIxRGJiNWY0MGE1REM3OTVlNWEyMzUzNzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI2NTc1MDAwNjgsIm5hbWUiOiJUcm92ZV9kYXBwIn0.fofYsB6AQrK_j1hIZx3E5P_qOmf_X4DBubO1XqkhNag";

const client = new Web3Storage({ token: API_TOKEN });

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );
  return (
    <button type="button" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

function UploadButton(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileContents, setBuffer] = useState("");
  const [cid, setCID] = useState("");
  const [recAdd, setAdd] = useState("");

  const [Name, setName] = useState("");
  const [Description, setDesc] = useState("");

  const contract = props.ctr;
  const account = props.acc;

  const captureFile = (event) => {
    event.preventDefault();
    const _file = event.target.files[0];
    console.log(_file);
    setFile(_file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = [new File([file], file.name)];
    const cid = await client.put(files).catch((error) => {
      console.error("Failed to add file to IPFS:", error);
      throw error; // or return error;
    });
    console.log(cid);
    setCID(cid);
    await contract.methods.AddItem(Name, Description, cid);
    // console.log(cid.path);
    console.log(contract);
    console.log("The item is added to the user account");
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    const retrievedFile = await client.get(cid);
    const files = await retrievedFile.files();
    console.log(files);
    downloadFile(files);
  };

  const downloadFile = (files) => {
    const blob = new Blob([files[0]]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = files[0].name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    await contract.methods.SendItem(recAdd, { Name, Description, cid });
    console.log("Sent the item to ", recAdd);
  };

  return (
    <div>
      <Accordion defaultActiveKey="1">
        {/* <Card> */}
          {/* <Card.Header align="center"> */}
            <CustomToggle eventKey="0">Upload to marketplace</CustomToggle>
          {/* </Card.Header> */}
          <Accordion.Collapse eventKey="0">
            {/* <Card.Body className="upload-form"> */}
              <div>
                <form className="login-form">
                  <label htmlFor="name" >Product Name</label>
                  <input
                    value={Name}
                    type="string"
                    placeholder="Enter the name of the Product"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                  />

                  <label htmlFor="description">Description</label>
                  <textarea
                    value={Description}
                    type="text"
                    placeholder="Description of the Product"
                    onChange={(e) => setDesc(e.target.value)}
                    id="description"
                    name="description"
                  />

                  <input
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={(e) => captureFile(e)}
                  />
                  <br />
                  <button
                    type="submit"
                    className="upload"
                    disabled={!file}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Upload
                  </button>
                </form>
              </div>
            {/* </Card.Body> */}
          </Accordion.Collapse>
        {/* </Card> */}
        &nbsp; &nbsp;
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </Accordion>
      &nbsp;
      &nbsp;
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="address"
          value={recAdd}
          placeholder="Enter receiver's address"
          onChange={(e) => setAdd(e.target.value)}
        ></input>
        &nbsp;
        &nbsp;
        <button type="submit" onClick={(e) => handleSend(e)}>
          Send file
        </button>
      </div>

      <div>
        &nbsp;
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "4px 2px"
          }}
          type="submit"
          
          onClick={(e) => handleRetrieve(e)}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default UploadButton;
