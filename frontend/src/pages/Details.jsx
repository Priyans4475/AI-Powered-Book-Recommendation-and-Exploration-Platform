import { useLocation, useNavigate } from "react-router-dom";

export default function Details() {

  const location = useLocation();
  const navigate = useNavigate();

  const books = location.state?.google || [];

  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      color: "white",
      padding: "50px 20px",
      fontFamily: "Arial"
    }}>

      {/* ⭐ TOP BAR */}
      <div style={{
        maxWidth: "1000px",
        margin: "auto",
        marginBottom: "40px"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#22c55e",
            color: "white"
          }}
        >
          ⬅ Back
        </button>

        <h1 style={{ marginTop: "20px" }}>
          📖 Book Details & Summary
        </h1>
      </div>

      {/* ⭐ BOOK LIST */}
      <div style={{
        maxWidth: "1000px",
        margin: "auto"
      }}>

        {books.length === 0 && (
          <h3>No books found</h3>
        )}

        {books.map((book, i) => (

          <div key={i} style={{
            display: "flex",
            gap: "30px",
            marginBottom: "60px",
            borderBottom: "1px solid #334155",
            paddingBottom: "40px",
            animation: "fadeIn 0.5s ease"
          }}>

            {/* ⭐ LEFT IMAGE */}
            <div style={{ flex: "0 0 160px" }}>
              <img
                src={book.image}
                alt={book.title}
                onClick={() =>
                  window.open(book.infoLink || book.preview, "_blank")
                }
                style={{
                  width: "160px",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                  cursor: "pointer"
                }}
              />
            </div>

            {/* ⭐ RIGHT TEXT */}
            <div>

              <h2
                onClick={() =>
                  window.open(book.infoLink || book.preview, "_blank")
                }
                style={{
                  marginBottom: "5px",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#22c55e"
                }}
              >
                {book.title}
              </h2>

              <p style={{
                color: "#94a3b8",
                marginBottom: "15px"
              }}>
                {book.author}
              </p>

              <p style={{
                lineHeight: "1.8",
                fontSize: "16px",
                color: "#e2e8f0",
                textAlign: "justify"
              }}>
                {book.summary}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* ⭐ FADE ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity:0; transform:translateY(10px);}
            to {opacity:1; transform:translateY(0);}
          }
        `}
      </style>

    </div>
  );
}
