function WorkflowStep({ icon, title, description }) {
  return (
    <div className="relative bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">

      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400 leading-7">
        {description}
      </p>

    </div>
  );
}

export default WorkflowStep;