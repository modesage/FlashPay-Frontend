export function Button({ label, onClick, customClass = "" }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-white bg-[#404040] hover:bg-[#212121] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 cursor-pointer ${customClass}`}
    >
      {label}
    </button>
  );
}
