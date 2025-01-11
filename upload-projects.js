import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(), "projects");
const branchName = "projects";

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Исключаем node_modules и dist
    if (entry.name === "node_modules" || entry.name === "dist") continue;

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(projectsDir)) {
  console.error("Папка 'projects' не найдена. Убедись, что она существует.");
  process.exit(1);
}

try {
  console.log("Переключение на ветку projects...");
  execSync(`git checkout -B ${branchName}`);

  console.log("Очистка предыдущих файлов...");
  const gitLsOutput = execSync("git ls-files").toString().trim();
  if (gitLsOutput) {
    console.log("Удаление всех файлов...");
    execSync("git rm -r --cached .");
  } else {
    console.log("Нет файлов для удаления.");
  }

  console.log("Добавление проектов...");
  const projectFolders = fs.readdirSync(projectsDir).filter((folder) =>
      fs.lstatSync(path.join(projectsDir, folder)).isDirectory()
  );

  for (const project of projectFolders) {
    const srcPath = path.join(projectsDir, project);
    const destPath = path.join(process.cwd(), project);

    console.log(`Добавление проекта: ${project}`);
    copyDirectory(srcPath, destPath);
  }

  console.log("Создание .gitignore...");
  fs.writeFileSync(".gitignore", "node_modules/\ndist/\n", { flag: "w" });

  console.log("Добавление изменений в Git...");
  execSync("git add .");
  execSync('git commit -m "Add projects to projects branch"');

  console.log("Отправка ветки...");
  execSync(`git push -u origin ${branchName}`);

  console.log("Проекты успешно загружены.");
} catch (error) {
  console.error("Ошибка:", error.message);
  process.exit(1);
}
