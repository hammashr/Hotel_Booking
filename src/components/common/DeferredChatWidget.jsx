import { useEffect } from "react";

const TAWK_SRC = "https://embed.tawk.to/69b8f5dd638dee1c39980859/1jjt80r6u";

const DeferredChatWidget = () => {
  useEffect(() => {
    let timeoutId;
    let idleId;
    let cancelled = false;

    const loadChat = () => {
      if (cancelled || document.querySelector(`script[src="${TAWK_SRC}"]`)) {
        return;
      }

      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.async = true;
      script.src = TAWK_SRC;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    };

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadChat, { timeout: 5000 });
        return;
      }

      timeoutId = window.setTimeout(loadChat, 2500);
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      window.addEventListener("load", scheduleLoad, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleLoad);

      if (typeof idleId === "number" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
};

export default DeferredChatWidget;
