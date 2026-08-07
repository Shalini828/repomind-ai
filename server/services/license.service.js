const fs = require("fs");
const path = require("path");

exports.detectLicense = (repoPath) => {
  const files = [
    "LICENSE",
    "LICENSE.md",
    "LICENSE.txt",
  ];

  for (const file of files) {
    const filePath = path.join(repoPath, file);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");

      if (content.includes("MIT License"))
        return "MIT";

      if (content.includes("Apache License"))
        return "Apache-2.0";

      if (content.includes("GNU GENERAL PUBLIC LICENSE"))
        return "GPL";

      return "Custom";
    }
  }

  return "Not Found";
};