const FS = require("fs");
const moduleFiles = require("../moduleFiles.helpers");
const paths = require("../paths.helpers");

function argvGetComponentType() {
  var componentType = process.argv[2];

  if (componentType === undefined || componentType.length === 0
    || (componentType !== "module" && componentType !== "component")) {
    throw new Error("Invalid component type (arg 1), A component type should be \"module\" or \"component\"");
  }

  return componentType;
}

function argvGetParentPath() {
  var parent = paths.root.apply(null, process.argv[3].split("/"));

  if (parent === undefined || parent.length === 0) {
    throw new Error("Invalid parent module path! (arg 2)");
  }

  if (!parent.endsWith("/")) {
    parent += "/";
  }

  return parent;
}

function argvGetComponentName() {
  var componentName = process.argv[4];

  if (componentName === undefined || !componentName.match(/^[A-Z]/)) {
    throw new Error("Invalid component name (arg 3), A component name should be in TitleCase");
  }

  return componentName;
}

function mkDir(path) {
  try {
    FS.mkdirSync(path);
  } catch (e) {
    // Only throw the erorr if it's anything other than existing an existing dir
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
}

function generateModule(parentPath, moduleName, componentSelector) {
  parentPath += "+" + componentSelector + "/";

  console.log("Generating module " + moduleName + " in " + parentPath);

  // Create module directory
  FS.mkdirSync(parentPath);

  moduleFiles.createTemplateFile(parentPath, moduleName);
  moduleFiles.createComponentFile(parentPath, moduleName, componentSelector);
  moduleFiles.createModuleFile(parentPath, moduleName);
}

function generateComponent(parentPath, componentName, componentSelector) {
  console.log("Generating component " + componentName + " in " + parentPath);

  if (!parentPath.match(/declarations\/?$/) && !parentPath.match(/components\/?$/)) {
    parentPath += "declarations/";
  }

  mkDir(parentPath);

  moduleFiles.createTemplateFile(parentPath, componentName);
  moduleFiles.createComponentFile(parentPath, componentName, componentSelector);
}

(function () {
  var componentType = argvGetComponentType();
  var parentPath = argvGetParentPath();
  var componentName = argvGetComponentName();
  var componentSelector = moduleFiles.titleCaseToDashedLowercase(componentName);

  switch (componentType) {
    case "module":
      generateModule(parentPath, componentName, componentSelector);
      break;
    case "component":
      generateComponent(parentPath, componentName, componentSelector);
  }
})();
