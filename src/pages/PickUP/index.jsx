import "./index.css";
import { Button } from "src/components";
import usePickupStore from "./stores/pickup.z-store";
import BarcodeSection from "./components/BarcodeSection";
import TappingSection from "./components/TappingSection";
import { useNavigate } from "react-router-dom";

const PickUp = () => {
  const { type, setType } = usePickupStore();
  const navigate = useNavigate();

  return (
    <div className="h-full bg-pickup-page flex flex-col items-center py">
      <div className="my-auto flex flex-col items-center">
        {type === "barcode" ? <BarcodeSection /> : <TappingSection />}
        <div className="mt-3 flex gap-3">
          {type === "barcode" ? (
            <Button
              type="button"
              className="bg-primary-700 text-white px-6 py-2 rounded-md"
              onClick={() => setType("qr")}
            >
              Tapping Card
            </Button>
          ) : (
            <Button
              type="button"
              className="bg-primary-700 text-white px-6 py-2 rounded-md"
              onClick={() => setType("barcode")}
            >
              Scan Barcode
            </Button>
          )}

          <Button
            type="button"
            className="bg-primary-700 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/pick-up-list")}
          >
            Daftar Penjemput
          </Button>
          <Button
            type="button"
            className="bg-primary-700 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/class-list")}
          >
            Kelas Selesai
          </Button>
          <Button
            type="button"
            className="bg-primary-700 text-white px-6 py-2 rounded-md"
            onClick={() => navigate("/class-done-list")}
          >
            List Kelas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PickUp;
