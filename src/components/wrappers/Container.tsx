




export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1000px] w-full mx-auto">
      {children}
    </div>
  );
}