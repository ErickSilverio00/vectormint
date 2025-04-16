import IndexPage from "@/pages/index";
import NotFound from "@/pages/not-found";
import UploadPage from "@/pages/upload";
import { Route, Routes } from "react-router-dom";

const FinalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default FinalRoutes;
