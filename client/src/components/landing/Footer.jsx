function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">RepoMind AI</h2>
          <p className="text-gray-400 mt-2">
            AI-powered repository intelligence with Paritok.
          </p>
        </div>

        <div className="flex gap-8 text-gray-400 mt-6 md:mt-0">
          <a href="#">GitHub</a>
          <a href="#">Documentation</a>
          <a href="#">Privacy</a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;