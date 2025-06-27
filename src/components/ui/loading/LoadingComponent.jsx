export default function LoadingComponent({color = 'text-primary'}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
    <span className={`loading loading-infinity loading-xl ${color}`}></span>
    </div>
  );
}