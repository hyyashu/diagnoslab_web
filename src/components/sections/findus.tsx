import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";

const FindUs = () => {
  return (
    <section className="relative py-10 md:py-12 px-4 mb-2 md:mb-6 overflow-hidden">
      <div className="absolute  w-[500px] h-[500px]  rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-center mb-10">
          Find us
        </h2>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">

          {/* Left Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-background-primary p-3 rounded-full text-white">
                <MapPin size={20} />
              </div>

              <div>
                <h3 className=" font-heading text-2xl md:text-3xl font-bold text-black">
                  Diagnos Lab
                </h3>
                <p className="font-body text-sm text-gray-600">
                  Jamshedpur, Jharkhand
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir//1st+Floor+Building+No.142,+Diagnos+Lab,+Rishab+Shanti+Apartment,+Dhalbhum+Road,+above+Belgian+Waffle,+near+Union+Bank+of+India,+SNP+Area,+Ambagan,+Sakchi,+Jamshedpur,+Jharkhand+831001/@22.8075629,86.2029272,16.25z/data=!4m16!1m7!3m6!1s0x39f5e3088f40bb2b:0x46180907852da273!2sDiagnos+Lab!8m2!3d22.8088744!4d86.2029601!16s%2Fg%2F1260h0qk1!4m7!1m0!1m5!1m1!1s0x39f5e3088f40bb2b:0x46180907852da273!2m2!1d86.2029601!2d22.8088744!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D/"
              target="_blank"
              className="inline-flex items-center gap-2 bg-background-primary border border- font-heading text-white px-5 py-2 rounded-full text-sm hover:bg-red-700 transition"
            >
              Get Directions
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Location Diagram */}
          <div className="rounded-2xl overflow-hidden bg-gray-300 border border-gray-200 h-[400px] md:h-[320px]">
            <Image
              src="/images/map.avif"
              alt="Location Map"
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 h-[400px] md:h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.86435722095376!2d86.2028780830967!3d22.808772796468762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3088f40bb2b%3A0x46180907852da273!2sDiagnos%20Lab!5e0!3m2!1sen!2sin!4v1772863062022!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;