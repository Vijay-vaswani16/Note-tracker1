//es version:6
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../src/context/AuthContext";

function NewApp() {
  const [notes, setNotes] = useState([]);
  
  // const [userData, setUserData] = useState({
  //   title: "",
  //   content: ""
  // });

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const { googleSignIn, user } = UserAuth();///
  console.log(" newapp file working ");//
  const navigate = useNavigate();//
  let Id;
  useEffect(() => {
    console.log(user);
              // console.log(user?.reloadUserInfo?.providerUserInfo?.[0]?.rawId);
            // Id = user?.reloadUserInfo?.providerUserInfo?.[0]?.rawId;
    if (!(user && user.email)) {
      navigate("/");
      window.location.pathname = "/";
    }
    // eslint-disable-next-line
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  const submitNote = async function(event) {
    event.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(user.uid,"\n");
        console.log(user.email);
      }
 })
    if (note.title && note.content) {
     
      addNote(note);
      const res = await fetch(
      
        "https://keeper-app-cb0c3-default-rtdb.firebaseio.com/userDataRecords/.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      console.log("hello " , res.Id);

      if (res) {
        setNote({
          title: "",
          content: "",
        });
        alert("data stored");
      } else {
        alert("plz fill the data");
      }
    } else {
      alert("plz fill the data");
    }
  };

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <div>
        <form method="POST">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <button onClick={ submitNote }>Add</button>
        </form>
      </div>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default NewApp;
