import React, { useState, useEffect } from 'react';
import { X, Upload, User } from 'lucide-react';
import { FacultyRecord, facultyPhotoUrl } from '../lib/api';

interface FacultyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; qualification: string; designation: string; photoFile: File | null }) => Promise<void>;
  editingFaculty: FacultyRecord | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const FacultyFormModal: React.FC<FacultyFormModalProps> = ({ isOpen, onClose, onSubmit, editingFaculty }) => {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [designation, setDesignation] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(editingFaculty?.name ?? '');
      setQualification(editingFaculty?.qualification ?? '');
      setDesignation(editingFaculty?.designation ?? '');
      setPhotoFile(null);
      setPreviewUrl(editingFaculty ? facultyPhotoUrl(editingFaculty.photo) : null);
      setFileError(null);
      setFormError(null);
    }
  }, [isOpen, editingFaculty]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileError(null);

    if (!file) {
      setPhotoFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Only JPG, JPEG, and PNG images are allowed.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Image must be smaller than 5 MB.');
      e.target.value = '';
      return;
    }

    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !qualification.trim() || !designation.trim()) {
      setFormError('Name, qualification, and designation are all required.');
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        qualification: qualification.trim(),
        designation: designation.trim(),
        photoFile,
      });
      onClose();
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {editingFaculty ? 'Edit Staff' : 'Add New Staff'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center mb-3">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              <Upload size={16} />
              Upload Photo
              <input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" className="hidden" onChange={handleFileChange} />
            </label>
            {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
            <p className="text-xs text-gray-400 mt-1">JPG or PNG, up to 5 MB</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. PRIYA S"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Qualification</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. MCA., M.Phil., SET., NET., Ph.D."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Guest Lecturer"
            />
          </div>

          {formError && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {formError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyFormModal;
