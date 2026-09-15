"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import GetCanvasObject from "./modules/getCanvasObject";
import Canvas from "./modules/canvas";
import "./page.css";
import Loading from "../adr/loading";
import searchForUser from "../reusableModules/searchForUser";

export default function Skunkworks() {
  const [userName, setUserName] = useState("");
  const [canvasData, setCanvasData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedUserName, setSubmittedUserName] = useState(""); // Track submitted username
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (
        (event.key === "Enter" || event.key === "ArrowRight") &&
        activeIndex !== -1
      ) {
        event.preventDefault();
        const selectedName = suggestions[activeIndex];
        if (selectedName !== "...") {
          selectUser(selectedName);
        }
      } else if (event.key === "Enter") {
        setSubmittedUserName(userName);
        setSuggestions([]);
      }
    } else if (event.key === "Enter") {
      setSubmittedUserName(userName);
    }
  };

  const suggestionClicked = (name) => {
    setSuggestions([]);
    selectUser(name);
  };

  const selectUser = (name) => {
    setSuggestions([]);
    setUserName(name);
    setSubmittedUserName(name);
  };

  useEffect(() => {
    if (!(userName.length >= 3 && userName !== submittedUserName)) {
      setSuggestions([]);
      return;
    }
    let ignore = false;
    const t = setTimeout(async () => {
      try {
        const data = await searchForUser(userName);
        if (!ignore) setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!ignore) {
          console.error("Suggestion fetch failed", err);
          setSuggestions([]);
        }
      }
    }, 200);
    return () => {
      ignore = true;
      clearTimeout(t);
    };
  }, [userName, submittedUserName]);

  useEffect(() => {
    if (!submittedUserName) {
      setCanvasData(null);
      return;
    }

    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetCanvasObject(submittedUserName);
        if (!ignore) setCanvasData(data);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [submittedUserName]);

  return (
    <div className="masterboxbuilder">
      <div className="logoboxbuilder">
        <Link href={"/"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <img
              src="/15thmeu-Logo.png"
              alt="15th MEU"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "contain",
              }}
            />

            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "22px",
                  fontWeight: "700",
                  lineHeight: 1,
                }}
              >
                15th MEU
              </div>

              <div
                style={{
                  color: "#b11226",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  marginTop: "4px",
                }}
              >
                UNIFORM BUILDER
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="inputboxbuilder">
        <div className="inputboxflex">
          <input
            type="text"
            value={userName}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Please enter a 15th MEU Username"
          />
          {suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((name, index) => (
                <div
                  key={index}
                  className={`${name === "..." ? "suggestion-more" : "suggestion-item"
                    } ${index === activeIndex ? "active" : ""}`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                  onClick={() => name !== "..." && suggestionClicked(name)}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {loading && <Loading />}
      {error && (
        <div className="canvasboxbuilder">
          <div className="errorbox">
            <h3 className="errorheader">Network Error!</h3>
            {error.message}
          </div>
        </div>
      )}
      {canvasData && !loading && !error && (
        <div className="canvasboxbuilder">
          <Canvas data={canvasData} />
        </div>
      )}
    </div>
  );
}
