import React from "react";
import Signin from "./Signin";
import NewApp from "./NewApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    // const [notes, setNotes] = useState([]);
    // const [isUserSignedIn, setIsUserSignedIn] = useState(false);

   
    return (
        <AuthContextProvider>
            <Router basename="/">
                <Routes>
                    <Route path="/" element={<Signin />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/newapp" element={<NewApp />} />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;