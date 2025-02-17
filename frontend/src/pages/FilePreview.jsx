const FilePreview = ({ files, removeFile }) => {
    return (
      <div className="mt-4 space-y-2">
        {files.map((fileObj, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-white shadow">
            <div className="flex items-center space-x-3">
              {fileObj.preview ? (
                <img src={fileObj.preview} alt="Preview" className="w-16 h-16 object-cover rounded" />
              ) : fileObj.file.type === "application/pdf" ? (
                <iframe
                  src={URL.createObjectURL(fileObj.file)}
                  title="PDF Preview"
                  className="w-20 h-20 border rounded"
                ></iframe>
              ) : (
                <span className="text-gray-500">{fileObj.file.name}</span>
              )}
              <span className="text-sm font-medium">{fileObj.file.name}</span>
            </div>
            <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
              ✖
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default FilePreview;