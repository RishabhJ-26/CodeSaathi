import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(``)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (code.length === 0) return;
    setLoading(true);
    try {
      const response = await axios.post('https://codesaathi-2.onrender.com//ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      setLoading(false);
    }
  }

  function clearReview() {
    setReview(''); // Clears the review state
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            {code === '' && <div className="placeholder">Write your code here...</div>}
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "none",
                borderRadius: "5px",
                height: "calc(100% - 3rem)",  
                width: "100%",
                overflow: "auto",
                outline: "none",
                border:"none",
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            disabled={code.length === 0 || loading}
            className="review"
            style={{
              opacity: code.length === 0 ? "0.2" : "1",
              cursor: code.length === 0 || loading ? "not-allowed" : "pointer",
              backgroundColor: code.length < 100 ? (code.length < 50 ? "violet" : "green") : "white"
            }}
          >
            {loading ? "Loading..." : "Review"}
          </button>
        </div>
        <div className="right">
          {code.length === 0 ? (
            <div style={{ textAlign: "center", opacity: "0.5", fontSize: "1rem" ,userSelect: "none" }}>Kindly write something to review</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
       <footer className='footer'>Made with <img style={{width:"2rem"}} src="./public/images/heart.png" alt="" /> <a target='_blank' href="https://github.com/RishabhJ-26">  by RISHABH JAIN</a></footer>
    </>
  )
}

export default App
