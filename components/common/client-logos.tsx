export default function ClientLogos() {
    return (
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {["Harvard", "Stanford", "MIT", "Berkeley", "Yale"].map((name) => (
          <div key={name} className="text-gray-500 font-semibold text-lg md:text-xl">
            {name}
          </div>
        ))}
      </div>
    )
  }
  