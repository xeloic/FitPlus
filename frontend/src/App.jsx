import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";

function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<LandingPage/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/training"
element={<Training/>}
/>

</Routes>

</BrowserRouter>

);

}

export default App;