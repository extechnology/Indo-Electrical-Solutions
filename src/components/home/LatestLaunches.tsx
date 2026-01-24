import React from "react";
import { Link } from "react-router-dom";


type LaunchCard = {
  id: number;
  title: string;
  subtitle: string;
  priceText?: string;
  oldPriceText?: string;
  description?: string;
  cta: string;
  image: string;
  bgType: "light" | "dark";
};

const latestLaunches: LaunchCard[] = [
  {
    id: 1,
    title: "Armoured Cable (Heavy Duty)",
    subtitle: "Safe Power. Strong Build.",
    description: "Starting at ₹1,499*",
    cta: "Shop now",
    image:
      "data:image/jpeg;base64,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ASOpTI0hhrFOqwIYHUG44St4t+qt2i2UNs46rlqU6AcHgy06j9htY2WxnR+ENpDnHDG/rNTqHyF9JV6DVAL02cLxNNWIynuH1eozpwtXEVKi0qe/eo2gVXZm/lNMPA8Kz7sY8fJyeRv1VhTaW0+IwzX9Y0X97HhOf5XtFswOFLg8QaFRr/rE+4yxp6MseyqxxaqxAJU1KhynquNDPmp6NNpcBiqbd9aqPZllsfC8GX1jFfk8mftTMRsvF1XAbDsuhAVaTWGhtfTr65J8kaWHNHNUFBXVyC1Uu5N9Rloi3xk03o32oBYV6Z7BXqD9ya6Po72mr513VNzcM61BY34twuDpfQeXCb82PD1kwq3Flyb++JLD7Nw55wo1KvE5nVcPSHhYaeE2haRNlqUKZ9XDU97U+2B90msL6OUspq4iq72F2Kq2vZvA1hJGnyEo/Wr4th6u9VF+zTVRPJuPRpA7MoU6bFXQrnZG3+LqILMhuCKJPTw4jjPqrWRVa1VkLBQ6ZWzEVapYthdbgfSK5Q3AdMnU5AYRWzLvFPWGW/2it/bJWlsJFAGes1jTN2YMfmiSupHRcyu06cPJnDvmao7FgQFQ6a0hc0s2n5yzMW7xLJNOHw6oAqgADoAt4zdCSIiAiIgeP/kvrerS+3/xmfyZVv6un9sfdPX4mvzZKdI8e/JlW/qk/aD7ppq+jXFWsEUW4HOvlx8Z7PEfLTo8TwHo42krWBo0xfUs+Yd+UA6+Uu+H9H1PKu8qsz25xVFCk9gYEgeJl1iUudW6xTx6P6A/pK3mvuy2m0chaB+k9Rv0gn8OktcR2p1irryIoDg9YeK28ipm78UKHXU81/hliiR2p1iu/idh+pvJP4ZzYz0f4Kr9NGJ6DcAjW/EDXx65a4k9qdYrGyeQeCw1TepTJYcM5zAX00XgNJNtsqgeNGie+mv3TsiRumoi25O4Q8cLh/2SfdOrCbPpUb7unTp345EC377DWdUSEgmLTMQMWi0zEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP//Z",
    bgType: "light",
  },
  {
    id: 2,
    title: "Premium Wash Basin Mixer",
    subtitle: "Smooth Flow. Modern Finish.",
    oldPriceText: "₹2,499",
    priceText: "₹1,890",
    cta: "Buy now",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    bgType: "dark",
  },
];

const LatestLaunches: React.FC = () => {
  return (
    <section className="w-full bg-[#0B0B0D] py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl sm:text-2xl font-medium">
            Latest Launches
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {latestLaunches.map((item) => (
            <div
              key={item.id}
              className="
                relative overflow-hidden rounded-md
                border border-[#2A2C33]
                bg-[#121216]
                min-h-[230px]
                sm:min-h-[260px]
                lg:min-h-[280px]
                transition
                hover:border-[#E02C2C]
                hover:shadow-2xl hover:shadow-black/60
              "
            >
              {/* Background */}
              {item.bgType === "light" ? (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/60 to-white/30" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-[#0B0B0D] via-[#121216] to-[#1B1C22]" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </>
              )}

              {/* Accent Glow */}
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#E02C2C]/15 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 p-6 sm:p-8">
                {/* Text */}
                <div className="max-w-[60%]">
                  <p
                    className={`text-xs font-semibold tracking-wide ${
                      item.bgType === "light"
                        ? "text-black/60"
                        : "text-white/60"
                    }`}
                  >
                    INDO MART
                  </p>

                  <h3
                    className={`mt-2 text-2xl sm:text-3xl font-extrabold leading-tight ${
                      item.bgType === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm sm:text-base font-semibold ${
                      item.bgType === "light"
                        ? "text-black/70"
                        : "text-white/75"
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  {/* price block */}
                  {(item.priceText || item.description) && (
                    <div className="mt-3 flex items-center gap-2">
                      {item.oldPriceText && (
                        <span
                          className={`text-sm line-through ${
                            item.bgType === "light"
                              ? "text-black/50"
                              : "text-white/40"
                          }`}
                        >
                          {item.oldPriceText}
                        </span>
                      )}
                      {item.priceText && (
                        <span
                          className={`text-lg font-extrabold ${
                            item.bgType === "light"
                              ? "text-black"
                              : "text-white"
                          }`}
                        >
                          {item.priceText}
                        </span>
                      )}
                      {item.description && (
                        <span
                          className={`text-sm font-semibold ${
                            item.bgType === "light"
                              ? "text-black/70"
                              : "text-white/70"
                          }`}
                        >
                          {item.description}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <Link to={`/exclusive`}
                    className="
                      mt-5 inline-flex items-center justify-center
                      rounded-xl bg-[#E02C2C]
                      px-5 py-2.5 text-sm font-bold text-white
                      hover:bg-[#B91C1C] transition
                    "
                  >
                    {item.cta}
                  </Link>

                  {/* Note text (optional like screenshot small note) */}
                  {item.id === 1 && (
                    <p
                      className={`mt-2 text-[11px] ${
                        item.bgType === "light"
                          ? "text-black/50"
                          : "text-white/40"
                      }`}
                    >
                      *including bank discount
                    </p>
                  )}
                </div>

                {/* Image */}
                <div className="relative w-[40%] h-full flex items-center justify-end">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      h-[170px] sm:h-[190px] lg:h-[210px]
                      w-auto object-contain
                      drop-shadow-2xl
                      transition duration-500
                      hover:scale-[1.03]
                    "
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;
