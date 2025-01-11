import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(), "projects");
const branchName = "projects";

// Функция для рекурсивного копирования директорий
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

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
  try {
    const gitLsOutput = execSync("git ls-files").toString().trim();
    if (gitLsOutput) {
      console.log("Удаление всех файлов...");
      execSync("git rm -r --cached . -f");
      execSync("git rm -rf . -f");
    } else {
      console.log("Нет файлов для удаления.");
    }
  } catch (error) {
    console.warn("Ошибка при очистке файлов, возможно, они уже удалены.");
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

  console.log("Создание .gitignore для исключения node_modules...");
  fs.writeFileSync(".gitignore", "node_modules/\n", { flag: "w" });

  console.log("Добавление изменений в Git...");
  execSync("git add .");
  execSync('git commit -m "Add all projects to projects branch"');

  console.log("Отправка ветки в удалённый репозиторий...");
  execSync(`git push -u origin ${branchName}`);

  console.log("Проекты успешно загружены в ветку projects.");
} catch (error) {
  console.error("Произошла ошибка:", error.message);
  process.exit(1);
}
