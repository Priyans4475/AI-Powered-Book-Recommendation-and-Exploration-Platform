import { useLocation, useNavigate } from "react-router-dom";

export default function Recommend(){

  const location = useLocation();
  const navigate = useNavigate();

  const rec = location.state?.rec || [];

  return (
    <div style={{
      background:"#0f172a",
      minHeight:"100vh",
      color:"white",
      padding:"40px"
    }}>

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={()=>navigate("/")}
        style={{
          marginBottom:"20px",
          padding:"8px 12px",
          borderRadius:"6px"
        }}
      >
        ⬅ Back
      </button>

      <h1>⭐ Recommended Books</h1>

      {rec.length === 0 && <h3>No Recommendations Found</h3>}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
        gap:"20px"
      }}>
        {rec.map((b,i)=>(
          <div key={i} style={{
            background:"#1e293b",
            padding:"12px",
            borderRadius:"12px"
          }}>
            <img src={b.image} style={{width:"100%"}} />
            <h4>{b.title}</h4>
            <p>{b.author}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
