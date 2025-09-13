import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ 
  onImageUpload, 
  currentImage, 
  className = "",
  aspectRatio = "aspect-square",
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('لطفاً یک فایل تصویری انتخاب کنید');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`حجم فایل نباید بیشتر از ${Math.round(maxSize / 1024 / 1024)}MB باشد`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `images/${timestamp}_${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setPreview(downloadURL);
      onImageUpload(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const event = { target: { files: [file] } };
      handleFileSelect(event);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        تصویر
      </label>
      
      {preview ? (
        <div className="relative">
          <div className={`${aspectRatio} relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${aspectRatio} relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-400 transition-colors`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload').click()}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8 mb-2" />
                <p className="text-sm">برای آپلود کلیک کنید یا فایل را بکشید</p>
                <p className="text-xs mt-1">PNG, JPG, GIF تا {Math.round(maxSize / 1024 / 1024)}MB</p>
              </>
            )}
          </div>
        </div>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {uploading && (
        <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
          <Loader2 className="h-4 w-4 animate-spin ml-1" />
          در حال آپلود...
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
