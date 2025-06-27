export default function CustomerInfo({ name, setName, phone, setPhone, note, setNote }) {
  return (
    <div className="bg-base-100 rounded-lg border border-base-300 p-4 mb-6">
      <h3 className="font-medium text-neutral mb-2">Data Pemesan</h3>
      <div className="flex flex-col gap-2">
        <input
          className="input input-bordered w-full text-black"
          placeholder="Nama Lengkap"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full text-black"
          placeholder="No. HP (opsional)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full text-black"
          placeholder="Catatan (opsional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>
    </div>
  );
}