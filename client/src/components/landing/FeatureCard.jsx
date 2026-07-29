function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="group bg-[#111827] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">{title}</h3>

      <p className="text-gray-400 leading-7">{description}</p>
    </div>
  );
}

export default FeatureCard;
