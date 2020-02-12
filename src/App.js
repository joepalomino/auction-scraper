/** @jsx jsx */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import { jsx, css, Global } from "@emotion/core";
import normalize from "normalize.css";
import { format } from "date-fns";
import { ReactComponent as Loader } from "./icons/spinner.svg";


const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

require("typeface-ibm-plex-sans");

function App() {
  const endPoint = "https://auction-scraper-api.herokuapp.com/";
  const [data, setData] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const socket = socketIOClient(endPoint);
    socket.emit("SearchFromClient", keyWord);
    socket.on("FromAPI", data => {
      setData(data);
      setLoading(false);
    });
  };

  const handleChange = event => setKeyWord(event.target.value);

  return (
    <>
      <Global
        styles={css`
          ${normalize}
          * {
            box-sizing: border-box;
          }
          body {
            background: #eff3fe;
            font-family: "IBM Plex Sans", sans-serif;
            font-size: 16px;
          }
          p {
            line-height: 1.58;
          }
        `}
      />
      <section>
        <div
          css={{
            display: "grid",
            gridTemplateColumns:
              "[left-gutter] 1fr [content] 12fr [right-gutter] 1fr"
          }}
        >
          <div
            css={{
              gridColumn: "content"
            }}
          >
            <header css={{ marginTop: "4rem" }}>
              <div>{format(new Date(), "iiii, MMMM d")}</div>
              <h1
                css={{
                  fontSize: `3rem`,
                  marginTop: "1rem",
                  [mq[1]]: {
                    fontSize: "3.75rem"
                  }
                }}
              >
                Auction Scraper
              </h1>
              <p>
                Smart Notifications to help you find the auctions you care about
              </p>
              <div>
                <p>
                  This auction scraper searches this site:{" "}
                  <span>
                    <a
                      css={{
                        textDecoration: "none",
                        padding: "4px 8px",
                        backgroundColor: "#CCFCE7",
                        color: "#009F72",
                        borderRadius: 20,
                        fontSize: 10,
                        [mq[0]]: {
                          fontSize: 14
                        }
                      }}
                      href="https://www.bidfta.com/home?selectedLocationIds=61,7"
                    >
                      https://www.bidfta.com/home?selectedLocationIds=61,7
                    </a>
                  </span>
                </p>
                <p>
                  The tool will take search term you provide below and look
                  through all of the auctions finds the ones that match your
                  term. You then will be able to set up email notifications to
                  be alerted when a new item that matches your search term gets
                  put up for auction.
                </p>
              </div>
              <form
                css={{
                  display: "flex"
                }}
                onSubmit={handleSubmit}
              >
                <div
                  css={{
                    display: "flex",
                    padding: "2px 8px",
                    alignItems: "center",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    height: 40,
                    flexBasis: 500,
                    marginRight: 8
                  }}
                >
                  <svg
                    css={{
                      flex: "0 0 20px",
                      fill: "#333"
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 28"
                    aria-hidden="true"
                  >
                    <path d="M18 13c0-3.859-3.141-7-7-7s-7 3.141-7 7 3.141 7 7 7 7-3.141 7-7zm8 13c0 1.094-.906 2-2 2a1.96 1.96 0 0 1-1.406-.594l-5.359-5.344a10.971 10.971 0 0 1-6.234 1.937c-6.078 0-11-4.922-11-11s4.922-11 11-11 11 4.922 11 11c0 2.219-.672 4.406-1.937 6.234l5.359 5.359c.359.359.578.875.578 1.406z"></path>
                  </svg>
                  <input
                    css={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: 0,
                      outline: 0,
                      boxShadow: "none",
                      flex: "1 1 100px"
                    }}
                    type="text"
                    value={keyWord}
                    onChange={handleChange}
                    placeholder="Search term, e.g. bike, headoard and more"
                    disabled={loading}
                  />
                </div>
                <button
                  css={{
                    borderRadius: 20,
                    backgroundColor: "#FEDE6F",
                    outline: 0,
                    border: 0,
                    padding: "6px 11px",
                    fontWeight: "bold",
                    color: "white",
                    cursor: "pointer",
                    minWidth: 85,
                    "&:hover": {
                      backgroundColor: "#e5c864"
                    }
                  }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "SEARCH"}
                </button>
              </form>
            </header>
            <div>
              {loading && (
                <div css={{ marginTop: "2rem" }}>
                  . . . Deploying bots for a full site search
                </div>
              )}
              {!loading && !data && (
                <div css={{ marginTop: "2rem" }}>
                  {" "}
                  Search Keyword to see current items on auction{" "}
                </div>
              )}
              {!loading && data && (
                <div>
                  <div
                    css={{
                      marginTop: "2rem",
                      backgroundColor: "white",
                      borderRadius: 20,
                      boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.12)",
                      maxWidth: 560,
                      padding: 16,
                      marginBottom: '2rem',
                      [mq[1]]: {
                        padding: 24
                      }
                    }}
                  >
                    <div
                      css={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "2rem"
                      }}
                    >
                      <h2 css={{ fontSize: 36, margin: 0 }}>Items Found</h2>
                      <di
                        css={{
                          padding: "4px 8px",
                          backgroundColor: "#FFF2F2",
                          color: "#FF8787",
                          fontWeight: "bold",
                          margin: "0 1rem",
                          fontSize: 12,
                          borderRadius: 8
                        }}
                      >
                        "{keyWord}"
                      </di>
                      <div
                        css={{
                          marginLeft: "auto",
                          width: 25,
                          height: 25,
                          padding: "16px",
                          backgroundColor: "#CCFCE7",
                          borderRadius: 50,
                          color: "#009F72",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 12
                        }}
                      >
                        {data.length}
                      </div>
                    </div>
                    {data.map(({ url, title, image }) => (
                      <div
                        css={{
                          display: "grid",
                          gridTemplateColumns: "repeat(12, 1fr)",
                          gap: 10,
                          marginBottom: "1rem",
                          alignItems: "center"
                        }}
                      >
                        <div
                          css={{
                            width: 40,
                            height: 40,
                            gridColumn: "1 / span 1",
                            [mq[1]]: {
                              width: 50,
                              height: 50
                            }
                          }}
                        >
                          <img
                            css={{
                              objectFit: "cover",
                              width: "100%",
                              borderRadius: 9
                            }}
                            src={image}
                            alt=""
                          />
                        </div>
                        <div css={{ gridColumn: "2 / span 10", fontSize: 12, [mq[1]]: {
                          gridColumn: '2 / span 8',
                          fontSize: 16
                        } }}>
                          {truncateString(title, 58)}
                        </div>
                        <div css={{ gridColumn: "9 / span 5", [mq[1]]: {
                          gridColumn: "10 / span 3"
                        } }}>
                          <a
                            css={{
                              backgroundColor: "#E9F5FD",
                              color: "#34A3F3",
                              padding: "8px 16px",
                              textDecoration: "none",
                              borderRadius: 50,
                              fontSize: 10,
                              [mq[1]]: {
                                fontSize: 12
                              }
                            }}
                            href={url}
                            target="_blank"
                          >
                            View Listing
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function truncateString(str, num) {
  if (str <= num) {
    return str;
  }

  return str.slice(0, num) + "...";
}

export default App;
