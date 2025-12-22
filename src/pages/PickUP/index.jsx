import "./style.css";
import { Button } from "src/components";
import BarcodeSection from "./components/BarcodeSection";
import { useNavigate } from "react-router-dom";

const PickUp = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-pickup-page flex flex-col items-center py">
      <div className="my-auto flex flex-col items-center">
        <BarcodeSection />
        <div className="mt-3 flex gap-3">
          <Button
            type="button"
            className="bg-primary-700 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/pick-up-list")}
          >
            Daftar Penjemput
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PickUp;
