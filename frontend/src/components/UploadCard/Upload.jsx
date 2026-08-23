import "./UploadCard.css";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

function UploadCard({ onSelect }) {

    const fileInput = useRef();

    return (

        <div
            className="upload-card"
            onClick={() => fileInput.current.click()}
        >

            <UploadCloud size={70} />

            <h2>Upload Resume</h2>

            <p>

                Drag & Drop your resume here

                <br />

                or click to browse

            </p>

            <input
                type="file"
                accept=".pdf"
                hidden
                ref={fileInput}
                onChange={(e)=>onSelect(e.target.files[0])}
            />

        </div>

    );

}

export default UploadCard;