import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "src/components";
import useStore from "src/stores";

const LoginCallback = () => {
  const [jsonText, setJsonText] = useState("");
  const navigate = useNavigate();
  const session_key = Cookies.get("session");
  const email = Cookies.get("email");

  const { setSession, reset } = useStore((state) => ({
    setSession: state.setSession,
    reset: state.reset,
  }));

  useEffect(() => {
    if (import.meta.env.VITE_ENV !== "LOCAL") {
      if (session_key && email) {
        setSession(session_key);
        navigate("/pilih-sekolah");
      } else {
        reset();
        window.location.href = `${
          import.meta.env.VITE_IDENTITY_SERVER_URL
        }?redirectUri=${btoa(import.meta.env.VITE_BASE_URL)}`;
      }
    }
  }, []);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const email = parsed.email;
      const session = parsed.session;

      if (!email || !session) {
        console.log("❌ Email atau session tidak ditemukan di JSON.");
        return;
      }

      Cookies.set("email", email);
      Cookies.set("session", session);
      setSession(session);
      navigate("/pilih-sekolah");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {import.meta.env.VITE_ENV !== "LOCAL" ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div style={{ padding: "2rem", maxWidth: 600 }}>
          <h2>🔐 Paste JSON dari Staging</h2>
          <textarea
            rows="10"
            style={{ width: "100%" }}
            placeholder="Paste JSON here..."
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
          <button onClick={handleSave} style={{ marginTop: "1rem" }}>
            Save to localStorage
          </button>
        </div>
      )}
    </>
  );
};

export default LoginCallback;
