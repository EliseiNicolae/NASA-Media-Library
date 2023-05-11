import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Search from "../views/Search";
import Show from "../views/Show";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/search"} />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/show"} element={<Show />} />
      </Routes>
    </BrowserRouter>
  )
}