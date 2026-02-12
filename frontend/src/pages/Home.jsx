import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home(){

  const [books,setBooks] = useState([]);

  // ⭐ recommender search
  const [query,setQuery] = useState("");
  const [suggest,setSuggest] = useState([]);

  // ⭐ google details search
  const [detailQuery,setDetailQuery] = useState("");

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  // ==============================
  // LOAD POPULAR BOOKS
  // ==============================
  useEffect(()=>{
    axios.get("http://localhost:8000/top-books")
      .then(res=>setBooks(res.data))
      .catch(err=>console.log(err));
  },[]);

  // ==============================
  // RECOMMENDER AUTO SUGGEST
  // ==============================
  const handleSearch = (value) => {

    setQuery(value);

    if(value.length < 2){
      setSuggest([]);
      return;
    }

    axios.get(`http://localhost:8000/search/${encodeURIComponent(value)}`)
      .then(res=>{
        console.log("Suggest:",res.data); // ⭐ debug
        setSuggest(res.data);
      })
      .catch(err=>console.log(err));
  };

  // ==============================
  // GO TO RECOMMEND PAGE (ML)
  // ==============================
  const goRecommend = async (name) => {

    if(!name) return;

    setLoading(true);

    try{

      const res = await axios.get(
        `http://localhost:8000/recommend/${encodeURIComponent(name)}`
      );

      setLoading(false);

      navigate("/recommend",{
        state:{rec:res.data}
      });

    }catch(err){
      console.log(err);
      setLoading(false);
    }
  };

  // ==============================
  // GOOGLE DETAILS SEARCH
  // ==============================
  const fetchBookDetails = async () => {

    if(!detailQuery) return;

    setLoading(true);

    try{

      const res = await axios.get(
        `http://localhost:8000/google-search/${encodeURIComponent(detailQuery)}`
      );

      setLoading(false);

      navigate("/details",{
        state:{google:res.data}
      });

    }catch(err){
      console.log(err);
      setLoading(false);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div style={{
      background:"#0f172a",
      minHeight:"100vh",
      color:"white",
      padding:"40px",
      fontFamily:"Arial"
    }}>

      <h1 style={{fontSize:"32px",marginBottom:"30px"}}>
        📚 ML Book Recommender
      </h1>

      {/* 🔎 RECOMMENDER SEARCH BAR */}
      <div style={{marginBottom:"30px",position:"relative"}}>

        <h3>⭐ Recommender Search</h3>

        <input
          value={query}
          onChange={(e)=>handleSearch(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              goRecommend(query);
            }
          }}
          placeholder="Search book for recommendations..."
          style={{
            padding:"10px",
            width:"300px",
            borderRadius:"8px"
          }}
        />

        {/* ⭐ Suggestions Dropdown */}
        {suggest.length > 0 && (
          <div style={{
            position:"absolute",
            background:"#1e293b",
            width:"300px",
            borderRadius:"8px",
            marginTop:"5px",
            zIndex:1000
          }}>
            {suggest.map((s,i)=>(
              <div
                key={i}
                onClick={()=>goRecommend(s.title || s)}
                style={{
                  padding:"10px",
                  cursor:"pointer",
                  borderBottom:"1px solid #333"
                }}
              >
                {s.title || s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📖 GOOGLE DETAILS SEARCH BAR */}
      <div style={{
        marginBottom:"40px",
        background:"#1e293b",
        padding:"20px",
        borderRadius:"12px"
      }}>

        <h3>📖 Book Details & Summary</h3>

        <input
          value={detailQuery}
          onChange={(e)=>setDetailQuery(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              fetchBookDetails();
            }
          }}
          placeholder="Search any book for details..."
          style={{
            padding:"10px",
            width:"300px",
            borderRadius:"8px",
            marginRight:"10px"
          }}
        />

      </div>

      {/* ⏳ LOADER */}
      {loading && <h3>Loading...</h3>}

      {/* 🔥 POPULAR BOOKS */}
      <h2>🔥 Popular Books</h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",
        gap:"20px"
      }}>
        {books.map((b,i)=>(
          <div key={i} style={{
            background:"#1e293b",
            padding:"12px",
            borderRadius:"12px"
          }}>
            <img
              src={b.image}
              alt=""
              style={{width:"100%",borderRadius:"8px"}}
            />

            <h4>{b.title}</h4>
            <p style={{color:"#94a3b8"}}>{b.author}</p>

            <button onClick={()=>goRecommend(b.title)}>
              Recommend
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
