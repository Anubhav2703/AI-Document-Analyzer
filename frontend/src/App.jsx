import { useState } from "react";
import axios from "axios";
import {
  FaSpinner,
  FaFilePdf,
  FaCopy,
  FaVolumeUp,
  FaStop
} from "react-icons/fa";
import jsPDF from "jspdf";

function App() {

  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");

  const [keywords, setKeywords] = useState([]);

  const [quiz, setQuiz] = useState([]);

  const [answers, setAnswers] = useState({});

  const [score, setScore] = useState(null);

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const uploadPDF = async () => {

    if (!file) {
      alert("Please choose a PDF");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      setSummary("");

      setKeywords([]);

      setQuiz([]);

      setAnswers({});

      setScore(null);

      setProgress(10);

      const response = await axios.post(
        "http://127.0.0.1:8000/summarize",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round(
                (event.loaded * 100) / event.total
              );

              setProgress(percent);
            }
          },
        }
      );

      setProgress(100);

      setSummary(response.data.summary || "");

      setKeywords(response.data.keywords || []);

      setQuiz(response.data.quiz || []);

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Unable to connect to backend.");
      }

    } finally {

      setLoading(false);

      setTimeout(() => {
        setProgress(0);
      }, 1000);

    }

  };

  const copySummary = async () => {

    await navigator.clipboard.writeText(summary);

    alert("Summary copied.");

  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("AI Document Summary", 20, 20);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(summary, 170);

    doc.text(lines, 20, 35);

    doc.save("AI_Document_Summary.pdf");

  };

  const speakSummary = () => {

    const speech = new SpeechSynthesisUtterance(summary);

    speech.lang = "en-US";

    speech.rate = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

  };

  const stopSpeech = () => {

    window.speechSynthesis.cancel();

  };

  const selectAnswer = (questionIndex, option) => {

    setAnswers({
      ...answers,
      [questionIndex]: option,
    });

  };

  const calculateScore = () => {

    let marks = 0;

    quiz.forEach((q, index) => {

      if (answers[index] === q.answer) {

        marks++;

      }

    });

    setScore(marks);

  };

  return (

<div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

<div className="w-full max-w-6xl bg-slate-900 rounded-3xl shadow-2xl p-10">

<h1 className="text-5xl font-bold text-center text-blue-400 mb-10">

📄 AI Document Analyzer

</h1>

<div className="border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center">

<p className="text-gray-300 text-2xl mb-8">

Upload your PDF document

</p>

<input

type="file"

accept=".pdf"

id="pdfFile"

className="hidden"

onChange={(e)=>setFile(e.target.files[0])}

/>

<label

htmlFor="pdfFile"

className="cursor-pointer inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl"

>

<FaFilePdf/>

Choose PDF

</label>

{file && (

<div className="mt-8 bg-slate-800 rounded-xl p-5">

<h3 className="text-white text-xl font-bold">

📄 {file.name}

</h3>

<p className="text-gray-400 mt-2">

Size : {(file.size/1024/1024).toFixed(2)} MB

</p>

</div>

)}

<button

onClick={uploadPDF}

disabled={loading}

className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 mx-auto"

>

{loading ? (

<>

<FaSpinner className="animate-spin"/>

Generating Summary...

</>

) : (

"Generate Summary"

)}

</button>

{loading && (

<div className="mt-8">

<div className="flex justify-between text-gray-300 mb-2">

<span>Uploading...</span>

<span>{progress}%</span>

</div>

<div className="w-full h-3 bg-slate-700 rounded-full">

<div

className="h-3 bg-blue-500 rounded-full"

style={{width:`${progress}%`}}

></div>

</div>

</div>

)}

</div>
      {summary && (
        <div className="mt-12">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-blue-400">
              📝 AI Summary
            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={copySummary}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaCopy />
                Copy
              </button>

              <button
                onClick={downloadPDF}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                ⬇ PDF
              </button>

              <button
                onClick={speakSummary}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaVolumeUp />
                Read
              </button>

              <button
                onClick={stopSpeech}
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaStop />
                Stop
              </button>

            </div>

          </div>

          <div className="bg-slate-800 rounded-2xl p-8 text-gray-200 whitespace-pre-wrap leading-8 shadow-lg">

            {summary}

          </div>

        </div>
      )}

      {keywords.length > 0 && (

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-blue-400 mb-6">

            🔑 Keywords

          </h2>

          <div className="flex flex-wrap gap-3">

            {keywords.map((keyword, index) => (

              <span
                key={index}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg"
              >
                {keyword}
              </span>

            ))}

          </div>

        </div>

      )}

      {quiz.length > 0 && (

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-blue-400 mb-8">

            📝 AI Quiz

          </h2>

          {quiz.map((q, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 mb-8"
            >

              <h3 className="text-xl font-semibold text-white mb-5">

                Q{index + 1}. {q.question}

              </h3>

              <div className="space-y-3">

                {q.options.map((option, i) => (

                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer bg-slate-700 hover:bg-slate-600 p-3 rounded-xl"
                  >

                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() =>
                        selectAnswer(index, option)
                      }
                    />

                    <span className="text-white">

                      {option}

                    </span>

                  </label>

                ))}

              </div>

            </div>

          ))}

          <button
            onClick={calculateScore}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-bold"
          >
            Submit Quiz
          </button>

          {score !== null && (

            <div className="mt-8 bg-green-700 rounded-xl p-5 text-center">

              <h2 className="text-3xl font-bold text-white">

                🎉 Your Score : {score} / {quiz.length}

              </h2>

            </div>

          )}

        </div>

      )}

    </div>

  </div>

);

}

export default App;