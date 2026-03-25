import Link from "next/link";

export default function PackageDetails({ pkg }: any) {
  const categories = pkg.Categories?.split(", ") || [];

  return (
    <div className="bg-background-primary p-4 md:p-8 ">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link href="/packages#packages-section">
          <button className="bg-white text-background-primary px-4 py-2 rounded-full text-sm font-medium font-heading flex items-center gap-2 shadow-sm hover:bg-gray-100 transition-all">
            <span className="text-sm md:text-base font-heading">←</span> Back to Packages
          </button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-white font-heading text-2xl md:text-3xl text-center font-bold mb-8 px-4">
        {pkg.PackageName}
      </h1>

      <div className="max-w-6xl mx-auto space-y-4 ">
        {/* Info Header - Stacked on mobile, row on desktop */}
        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm shadow-sm">
          <p className="text-black font-body">
            <b className="text-black font-heading">Gender:</b> Male & Female
          </p>
          <p className="text-black font-body">
            <b className="text-black font-heading">Fasting:</b> {pkg.Fasting}
          </p>
          <p className="text-black font-body">
            <b className="text-black font-heading">Reports:</b> {pkg.Reporting}
          </p>
        </div>

        {/* Overview */}
        {pkg.Description && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-2 text-black font-heading">Overview</h2>
            <p className="text-black leading-relaxed text-sm font-body">
              {pkg.Description}
            </p>
          </div>
        )}

        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4 text-black font-heading">Key Benefits</h2>
            <ul className="space-y-2 text-sm text-black font-body">
              <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold"> Early detection</li>
              <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold">{pkg.ParametersCovered || "70+"} Parameters Covered</li>
              <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold"> Lifestyle tracking</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4 text-black font-heading">Who should take this test?</h2>
            <p className="text-black text-sm leading-relaxed font-body">
              {pkg.WhoShouldTake || "A comprehensive full-body health check-up designed to assess your wellness."}
            </p>
          </div>
        </div>

        {/* Dynamic Tests Included Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-bold text-lg mb-4 text-black font-heading">Tests Included</h2>
          <div className="space-y-3 text-sm leading-relaxed font-body">
            {pkg.TestGroups ? (
              pkg.TestGroups.map((group: any, index: number) => (
                <p key={index} className="text-black font-body">
                  <b className="text-black font-heading">{group.groupName}</b> - {group.tests}
                </p>
              ))
            ) : (
              <p className="text-black font-body">
                <b className="text-black font-heading">Includes:</b> {pkg.TestInclued} test groups covering full-body health.
              </p>
            )}
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg gap-4">
          <p className="font-bold text-black sm:ml-4 font-heading text-center sm:text-left">
            Home Collection Available
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-green-600 font-heading">₹{pkg.DiscountedPrice}</span>
                <span className="text-slate-400 line-through text-sm font-semibold font-heading">₹{pkg.Price}</span>
              </div>
            </div>
            <button className="bg-background-primary hover:bg-red-700 text-white w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all shadow-md font-heading">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}