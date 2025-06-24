import { useEffect, useRef, useState } from "react";

const useTappingHooks = (url = "ws://localhost:8081", retryDelay = 2000) => {
  const [uid, setUid] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef();
  const retryTimeout = useRef();

  const connect = () => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      setUid(event.data);
      console.log(event);
      console.log("📥 UID:", event.data);
    };

    socket.onclose = () => {
      setConnected(false);
      console.warn("⚠️ WebSocket closed, retrying...");
      retry();
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
      socket.close();
    };
  };

  const retry = () => {
    if (retryTimeout.current) clearTimeout(retryTimeout.current);
    retryTimeout.current = setTimeout(() => {
      connect();
    }, retryDelay);
  };

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, [url]);

  return { uid, setUid, connected };
};

export default useTappingHooks;
