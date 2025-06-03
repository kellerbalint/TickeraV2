function TicketSelector({
  adultCount,
  studentCount,
  seniorCount,
  handleAdultChange,
  handleStudentChange,
  handleSeniorChange,
  totalPrice,
}) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Jegyvásárlás</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Felnőtt jegy (2500 Ft):</label>
          <input
            type="number"
            value={adultCount}
            onChange={handleAdultChange}
            min="0"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          /> {adultCount * 2500}Ft
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Diák jegy (2000 Ft):</label>
          <input
            type="number"
            value={studentCount}
            onChange={handleStudentChange}
            min="0"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          /> {studentCount * 2000}Ft
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Nyugdíjas jegy (1800 Ft):</label>
          <input
            type="number"
            value={seniorCount}
            onChange={handleSeniorChange}
            min="0"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          /> {seniorCount * 1800}Ft
        </div>
      </form>
      <div className="mt-4">
        <p className="text-lg">Teljes összeg: {totalPrice} Ft</p>
      </div>
    </div>
  );
}

export default TicketSelector;
