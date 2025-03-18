import { useRef, useState } from "react";
import AppButton from "../AppButton"; // Ensure you import your AppButton component
import { Alert, Snackbar } from "@mui/material";

interface FileUploadButtonProps {
  onFileSelect?: (file: File) => void; // Callback function to handle file selection
  isDisabled: boolean
  accept?: string; // Allowed file types, e.g., "image/png, image/jpeg"
  maxSizeMB?: number; // Max file size (default: 5MB)
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileSelect,
  accept = "image/*", // Default to images
  isDisabled = false,
  maxSizeMB = 5, // Default max file size is 5MB
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    // Optional: Validate file type if needed (accept already handles it)
    if (accept !== "image/*" && !accept.split(",").includes(file.type)) {
      setError("Invalid file type. Please select a valid file.");
      return;
    }

    setError(null); // Clear errors on valid selection

    // Call the callback function with the selected file
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept={accept}
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <AppButton
        fullWidth
        sx={{ backgroundColor: "white", p: 2 }}
        onClick={handleClick}
        // Can change depending on requirements, added to prevent reuploading since
        disabled={isDisabled}
      >
        Upload Avatar
      </AppButton>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};

export default FileUploadButton;
