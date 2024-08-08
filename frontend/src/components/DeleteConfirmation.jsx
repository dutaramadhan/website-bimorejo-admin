import Modal from "react-modal";

export default function DeleteConfirmation({ isOpen, setIsOpen, onClick }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="flex justify-center items-center absolute inset-0 bg-white p-4 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p>Apakah Anda yakin ingin menghapus item ini?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClick}
          >
            Hapus
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
}