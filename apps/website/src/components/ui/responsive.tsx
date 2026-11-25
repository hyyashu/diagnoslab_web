/* Text that is shorter on phones: `mobile` below md, `desktop` from md up. */
export default function Responsive({ desktop, mobile }: { desktop: string; mobile?: string }) {
  if (!mobile || mobile === desktop) return <>{desktop}</>;
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="hidden md:inline">{desktop}</span>
    </>
  );
}
