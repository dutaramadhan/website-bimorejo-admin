import React, { useState, useEffect } from 'react';

export default function EditArticleModal({ open, onClose, onSave, article }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (open && article) {
      setTitle(article.title);
      setContent(article.content);
      setWriter(article.writer);
    }
  }, [open, article]);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", writer);
    formData.append("image", image);
    onSave(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error('Ukuran file terlalu besar. Maksimal 2MB.');
      setImage(null);
      setImagePreview(null);
      e.target.value = ""; 
    } else {
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Article
          </h3>
          <div className="mt-2">
            <label className="block text-left text-sm font-medium text-gray-700">
              Judul
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="block text-left text-sm font-medium text-gray-700 mt-4">
              Konten
              <textarea
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Konten"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <label className="block text-left text-sm font-medium text-gray-700 mt-4">
              Penulis
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Penulis"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
              />
            </label>
            <label className="block text-left text-sm font-medium text-gray-700 mt-4">
              Gambar
                <input
                    className="mt-2 block w-full text-sm text-gray-500"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }}
                    />
                )}
              <p className="mt-1 text-xs text-gray-500">Ukuran maksimal 1 MB.</p>
            </label>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              Simpan
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mt-2"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
