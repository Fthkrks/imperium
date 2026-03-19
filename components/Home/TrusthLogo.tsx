"use client";
import type { CSSProperties, MouseEvent } from "react";

const sectionStyle: CSSProperties = {
  width: "100vw",
  padding: "16px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Poppins, sans-serif",
};

const wrapperStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
  width: "100%",
};

const logosRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  flexWrap: "wrap",
};

const interactiveStyle: CSSProperties = {
  textDecoration: "none",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

const logoHeightStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: "40px",
};

const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "scale(1.05)";
};

const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = "scale(1)";
};

export default function TrustLogos() {
  return (
    <section className="my-20!" style={sectionStyle}>
      <div style={wrapperStyle}>
        <div style={logosRowStyle}>
          {/* Google */}
          <a
            href="https://www.google.com/search?q=lets+fix+it+applaince+tepair&ie=UTF-8&oe=UTF-8&hl=tr-us&client=safari"
            target="_blank"
            rel="noopener noreferrer"
            style={interactiveStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={logoHeightStyle}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#4285F4",
                }}
              >
                G
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#EA4335",
                }}
              >
                o
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#FBBC05",
                }}
              >
                o
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#4285F4",
                }}
              >
                g
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#34A853",
                }}
              >
                l
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#EA4335",
                }}
              >
                e
              </span>
            </div>
          </a>

          {/* Yelp */}
          <a
            href="https://m.yelp.com/biz/lets-fix-it-appliance-repair-lago-vista-2"
            target="_blank"
            rel="noopener noreferrer"
            style={interactiveStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={logoHeightStyle}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2MpoXSiwee-qfb2G91SABKnJCka3oWKtv0mDhAGcUjQdNbOnfSOYztoJ2vWo5Zm8v_Q&usqp=CAU"
                alt="Yelp"
                style={{
                  height: "40px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </a>

          {/* Thumbtack */}
          <div
            style={{
              ...logoHeightStyle,
              ...interactiveStyle,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                background: "#009FD1",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
              }}
            >
              <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>T</span>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#009FD1",
              }}
            >
              Thumbtack
            </span>
          </div>

          {/* Trustpilot */}
          <div
            style={{
              ...logoHeightStyle,
              ...interactiveStyle,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginRight: "8px",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "#00B67A", fontSize: "16px" }}>
                  ★
                </span>
              ))}
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#00B67A",
              }}
            >
              Trustpilot
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile responsive for trust logos */
        @media (max-width: 768px) {
          div[style*="gap: 40px"] {
            gap: 20px !important;
          }
          /* Mobilde fontları küçült */
          div[style*="fontSize: '24px'"] span {
            font-size: 18px !important;
          }
          div[style*="fontSize: '20px'"] span {
            font-size: 16px !important;
          }
          div[style*="fontSize: '14px'"] span {
            font-size: 12px !important;
          }
          div[style*="fontSize: '16px'"] {
            font-size: 14px !important;
          }
          div[style*="fontSize: '12px'"] span {
            font-size: 10px !important;
          }
        }
      `}</style>
    </section>
  );
} 