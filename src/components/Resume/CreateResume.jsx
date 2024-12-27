import React, { useState } from "react";
import Design1 from "./Design1";
import Design2 from "./Design2";
import Design3 from "./Design3";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CreateResume = () => {
  const [selectedDesign, setSelectedDesign] = useState("Design 1");
  const [isFullView, setIsFullView] = useState(false);

  const handleDesignSelection = (design) => {
    setSelectedDesign(design);
  };

  // Function to render the selected design component
  const renderSelectedDesign = () => {
    switch (selectedDesign) {
      case "Design 1":
        return <Design1 />;
      case "Design 2":
        return <Design2 />;
      case "Design 3":
        return <Design3 />;
      default:
        return <div className="text-gray-500">Please select a design</div>;
    }
  };

  // Handle Full View
  const handleFullView = () => {
    setIsFullView(true);
  };

  const handleDownload = async () => {
    const designContainer = document.getElementById("design-preview");
  
    // Capture the design container as a canvas
    const canvas = await html2canvas(designContainer, { useCORS: true });
  
    // Get image data
    const imgData = canvas.toDataURL("image/png");
  
    // Define A4 dimensions in millimeters
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 220; // A4 width in mm
    const pdfHeight = 250; // A4 height in mm
  
    // Directly fit the image to A4 dimensions
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
    // Save the PDF
    pdf.save(`${selectedDesign}.pdf`);
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Select Design</h2>
        <div className="space-y-4">
          {["Design 1", "Design 2", "Design 3"].map((design) => (
            <button
              key={design}
              onClick={() => handleDesignSelection(design)}
              className={`w-full px-4 py-2 rounded-md ${
                selectedDesign === design
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {design}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleFullView}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Full View
          </button>
          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Download Resume
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Design Preview</h1>
        <div
          id="design-preview"
          className="w-full h-full flex items-center justify-center border border-gray-300 bg-gray-50 p-4"
        >
          {renderSelectedDesign()}
        </div>
      </div>

      {/* Full View Modal */}
      {isFullView && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsFullView(false)}
        >
          <div
            className="bg-white p-8 rounded-md max-w-4xl w-full h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSelectedDesign()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateResume;
