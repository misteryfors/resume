import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import MainLayout from "./components/layouts/MainLayout.tsx";

const AppRouter:React.FC=()=>{
    return(
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                </Routes>
            </MainLayout>
        </Router>
    )
}

export default AppRouter;