import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function TryOn() {
  const modelInputRef = useRef(null);
  const garmentInputRef = useRef(null);
  const navigate = useNavigate();

  const [personImage, setPersonImage] = useState(null);
  const [personPreview, setPersonPreview] = useState(null);

  const [garmentImage, setGarmentImage] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);

  const [resultImage, setResultImage] = useState(null);

  const [status, setStatus] = useState("idle");
  // idle | generating | success
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ===============================
     Upload handlers
  =============================== */

  const handleModelUpload = (file) => {
    setPersonImage(file);
    setPersonPreview(URL.createObjectURL(file));
  };

  const handleGarmentUpload = (file) => {
    setGarmentImage(file);
    setGarmentPreview(URL.createObjectURL(file));
  };

  /* ===============================
     Poll TryOn status
  =============================== */

  const pollTryOnStatus = async (jobId) => {
    let p = 10;
    setProgress(p);

    while (true) {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/tryon/status/${jobId}`
      );
      const payload = await res.json();
      const data = payload.data;

      console.log("📡 STATUS:", data);

      p = Math.min(p + 8, 90);
      setProgress(p);

      const success =
        data?.status === "completed" ||
        data?.status === "succeeded" ||
        data?.state === "completed" ||
        data?.state === "succeeded";

      if (success) {
        const imageUrl =
          data?.output?.image_url ||
          data?.output?.imageUrl ||
          data?.result?.imageUrl ||
          data?.imageUrl ||
          data?.outputUrl;

        if (!imageUrl) {
          throw new Error("No image URL returned");
        }

        setProgress(100);
        return imageUrl;
      }

      if (
        data?.status === "failed" ||
        data?.state === "failed"
      ) {
        throw new Error("Try-on failed");
      }

      await new Promise((r) => setTimeout(r, 3000));
    }
  };

  /* ===============================
     Start TryOn
  =============================== */

  const generateTryOn = async () => {
    if (!personImage || !garmentImage) {
      alert("Please upload both model and clothing images.");
      return;
    }

    const formData = new FormData();
    formData.append("person", personImage);
    formData.append("garment", garmentImage);

    setStatus("generating");
    setLoading(true);
    setProgress(5);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tryon`, {
        method: "POST",
        body: formData,
      });

      const startData = await res.json();
      if (!startData.jobId) {
        throw new Error("No jobId returned");
      }

      const imageUrl = await pollTryOnStatus(startData.jobId);

      setResultImage(imageUrl);
      setStatus("success");

      // Save to wardrobe
      const user = auth.currentUser;
      if (user) {
        await addDoc(
          collection(db, "users", user.uid, "tryons"),
          {
            imageUrl,
            createdAt: serverTimestamp(),
          }
        );
      }
    } catch (err) {
      console.error("❌ TRYON ERROR:", err);
      alert("Try-on failed");
      setStatus("idle");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     Reset / Cancel
  =============================== */

  const cancelTryOn = () => {
    setStatus("idle");
    setProgress(0);
  };

  const resetTryOn = () => {
    setPersonImage(null);
    setPersonPreview(null);
    setGarmentImage(null);
    setGarmentPreview(null);
    setResultImage(null);
    setProgress(0);
    setStatus("idle");
  };

  /* ===============================
     UI
  =============================== */

  return (
    <div className="min-h-screen flex text-white">

      {/* LEFT — MODEL */}
      <aside className="w-[260px] p-4 space-y-4 border-r border-white/10">
        <h2 className="text-xs text-white/60">YOUR MODEL</h2>

        <div className="h-40 bg-white/10 rounded overflow-hidden">
          {personPreview && (
            <img
              src={personPreview}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div
          onClick={() => modelInputRef.current.click()}
          className="h-28 border border-dashed border-white/20 bg-[#7C3AED] rounded-lg hover:bg-purple-600
                     flex items-center justify-center cursor-pointer text-xs"
        >
          Upload Model
        </div>

        <input
          ref={modelInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleModelUpload(e.target.files[0])}
        />
      </aside>

      {/* CENTER — RESULT / PROGRESS / SUCCESS */}
      <main className="flex-1 flex flex-col items-center justify-center">

        <div className="h-[560px] w-full max-w-3xl bg-black rounded-xl 
                        flex items-center justify-center text-white/50">
          {status === "success" ? (
            <img
              src={resultImage}
              className="h-full object-contain"
            />
          ) : (
            "IMAGE PREVIEW"
          )}
        </div>

        {/* Progress bar */}
        {status === "generating" && (
          <div className="w-full max-w-md mt-4">
            <div className="h-2 bg-white/10 rounded">
              <div
                className="h-2 bg-[#7C3AED] rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">
              Generating… {progress}%
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex gap-4">
          {status === "idle" && (
            <button
              onClick={generateTryOn}
              className="px-6 py-3 bg-[#7C3AED] hover:bg-purple-600 hover:cursor-pointer rounded-lg"
            >
              Generate Try-On
            </button>
          )}

          {status === "generating" && (
            <button
              onClick={cancelTryOn}
              className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg"
            >
              Cancel
            </button>
          )}

          {status === "success" && (
            <>
              <button
                onClick={resetTryOn}
                className="px-6 py-3 bg-[#7C3AED] rounded-lg"
              >
                Create Another
              </button>

              <button
                onClick={() => navigate("/wardrobe")}
                className="px-6 py-3 bg-white/10 rounded-lg"
              >
                View Saved Styles
              </button>
            </>
          )}
        </div>
      </main>

      {/* RIGHT — CLOTHING */}
      <aside className="w-[300px] p-4 space-y-4 border-l border-white/10">
        <h2 className="text-xs text-white/60">YOUR CLOTHING</h2>

        <div className="h-40 bg-white/10 rounded overflow-hidden">
          {garmentPreview && (
            <img
              src={garmentPreview}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div
          onClick={() => garmentInputRef.current.click()}
          className="h-28 border border-dashed border-white/20 bg-[#7C3AED] rounded-lg hover:bg-purple-600
                     flex items-center justify-center cursor-pointer text-xs"
        >
          Upload Clothing
        </div>

        <input
          ref={garmentInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleGarmentUpload(e.target.files[0])}
        />
      </aside>

    </div>
  );
}
