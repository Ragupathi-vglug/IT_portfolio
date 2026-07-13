import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, User, LogOut, ArrowLeft } from 'lucide-react';
import {
  FacultyRecord,
  fetchFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  facultyPhotoUrl,
} from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import FacultyFormModal from '../components/FacultyFormModal';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const AdminDashboard: React.FC = () => {
  const [faculty, setFaculty] = useState<FacultyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyRecord | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<FacultyRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const loadFaculty = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchFaculty();
      setFaculty(data);
    } catch (err) {
      setLoadError('Could not load faculty data. Please check that the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFaculty();
  }, [loadFaculty]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openAddForm = () => {
    setEditingFaculty(null);
    setIsFormOpen(true);
  };

  const openEditForm = (member: FacultyRecord) => {
    setEditingFaculty(member);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: {
    name: string;
    qualification: string;
    designation: string;
    photoFile: File | null;
  }) => {
    if (editingFaculty) {
      await updateFaculty(editingFaculty.id, data);
    } else {
      await createFaculty(data);
    }
    await loadFaculty();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteFaculty(deleteTarget.id);
      setDeleteTarget(null);
      await loadFaculty();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-1"
            >
              <ArrowLeft size={14} />
              Back to website
            </Link>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Faculty Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              Signed in as <span className="font-medium text-gray-700 dark:text-gray-200">{username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Faculty Members</h2>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Add New Staff
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-gray-400">Loading faculty members…</div>
          ) : loadError ? (
            <div className="p-10 text-center text-red-500">{loadError}</div>
          ) : faculty.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No faculty members yet. Click "Add New Staff" to create the first one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-3 font-medium">Photo</th>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Qualification</th>
                    <th className="px-6 py-3 font-medium">Designation</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {faculty.map((member) => {
                    const photoUrl = facultyPhotoUrl(member.photo);
                    return (
                      <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                        <td className="px-6 py-3">
                          <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            {photoUrl ? (
                              <img src={photoUrl} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={18} className="text-gray-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3 font-medium text-gray-800 dark:text-white">{member.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{member.qualification}</td>
                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{member.designation}</td>
                        <td className="px-6 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditForm(member)}
                              className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(member)}
                              className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <FacultyFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingFaculty={editingFaculty}
      />

      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        facultyName={deleteTarget?.name ?? ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminDashboard;
