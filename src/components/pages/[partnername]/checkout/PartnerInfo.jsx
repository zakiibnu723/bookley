export default function PartnerInfo({ partner }) {
  return (
    <div className="bg-base-100 rounded-lg border border-base-300 p-4 mb-6">
      <h3 className="font-medium text-neutral">{partner?.name}</h3>
      <div className="text-sm text-gray-500">{partner?.location}</div>
    </div>
  );
}