import React from "react";
import ReactDOM from "react-dom/client";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import "./index.css";
import App from "./router";
import { MdClose } from "react-icons/md";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import queryClient from "./app/query-client";
import { LoaderProvider } from "./providers/loader";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Apps Provider */}
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </DndProvider>
    </QueryClientProvider>

    {/* React Toastify */}
    <Toaster position="top-right">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <MdClose
                  size={20}
                  onClick={() => toast.dismiss(t.id)}
                  className="cursor-pointer hover:text-red-500 hover:animate-pulse"
                />
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  </React.StrictMode>
);
