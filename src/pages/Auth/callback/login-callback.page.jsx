import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "src/components";
import useStore from "src/stores";

const LoginCallback = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState(
    "yudha.afriansyah@kiranatama.com",
  );
  const [sessionInput, setSessionInput] = useState();
  const session_key = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME);
  const email = Cookies.get(import.meta.env.VITE_COOKIE_EMAIL_NAME);
  console.log(session_key, email, import.meta.env.VITE_COOKIE_SESSION_NAME, import.meta.env.VITE_COOKIE_EMAIL_NAME)

  const { setSession } = useStore((state) => ({
    setSession: state.setSession,
  }));

  useEffect(() => {
    if (session_key && email) {
      setSession(session_key);
      navigate("/pilih-sekolah");
    } else {
      !import.meta.env.VITE_DEV && import.meta.env.VITE_ENV !== "LOCAL"
        ? (window.location.href = `${import.meta.env.VITE_IDENTITY_SERVER_URL}?redirectUri=${btoa(import.meta.env.VITE_BASE_URL)}`)
        : null;
    }
  }, []);

  const handleSave = () => {
    try {
      if (!emailInput || !sessionInput) {
        console.log("❌ Email atau session tidak boleh kosong");
        return;
      }

      Cookies.set(import.meta.env.VITE_COOKIE_SESSION_NAME, sessionInput);
      Cookies.set(import.meta.env.VITE_COOKIE_EMAIL_NAME, emailInput);
      setSession(sessionInput);
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
          <h2>Email</h2>
          <input
            style={{ width: "100%" }}
            placeholder="Paste Email here..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <h2>Session</h2>
          <textarea
            rows={10}
            style={{ width: "100%" }}
            placeholder="Paste Session here..."
            value={sessionInput}
            onChange={(e) => setSessionInput(e.target.value)}
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
