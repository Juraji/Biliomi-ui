const FS = require("fs");

const TEMPLATE_FILE_SUFFIX = ".template.pug";
const COMPONENT_FILE_SUFFIX = ".component.ts";
const DIRECTIVE_FILE_SUFFIX = ".directive.ts";
const MODULE_FILE_SUFFIX = ".module.ts";

function getRelativePathToSharedModule(componentPath) {
  console.log(componentPath
    .slice(0, -1)
    .split(/app[\\|/]/)
    .pop());
  return componentPath
    .slice(0, -1)
    .split(/app[\\|/]/)
    .pop()
    .split(/[\\|/]/)
    .map(function () {
      return ".."
    })
    .join("/") + "/shared";
}

function titleCaseToDashedLowercase(moduleNameTC) {
  return moduleNameTC.replace(/([A-Z]+[a-z]+)/g, "$1-").slice(0, -1).toLowerCase();
}


function createTemplateFile(moduleDirPath, moduleNameTC) {
  var templateFilePath = moduleDirPath + "/" + moduleNameTC + TEMPLATE_FILE_SUFFIX;
  var templateContents = "| Template for " + moduleNameTC;

  FS.writeFileSync(templateFilePath, templateContents);
}

function createComponentFile(moduleDirPath, moduleNameTC, dashedModuleName) {
  var componentFilePath = moduleDirPath + "/" + moduleNameTC + COMPONENT_FILE_SUFFIX;
  var componentFileContents = "import {Component, OnInit} from \"@angular/core\";\n" +
    "\n" +
    "@Component({\n" +
    "  selector: \"" + dashedModuleName + "\",\n" +
    "  templateUrl: require(\"./" + moduleNameTC + TEMPLATE_FILE_SUFFIX + "\")\n" +
    "})\n" +
    "export class " + moduleNameTC + "Component implements OnInit {\n" +
    "\n" +
    "  constructor() {\n" +
    "  }\n" +
    "\n" +
    "  public ngOnInit() {\n" +
    "  }\n" +
    "}\n";

  FS.writeFileSync(componentFilePath, componentFileContents);
}

function createDirectiveFile(moduleDirPath, moduleNameTC) {
  var directiveFilePath = moduleDirPath + "/" + moduleNameTC + DIRECTIVE_FILE_SUFFIX;
  var camelCaseName = moduleNameTC.substr(0, 1).toLowerCase() + moduleNameTC.substr(1);
  var directiveFileContents = "import {Directive} from \"@angular/core\";\n" +
    "\n" +
    "@Directive({selector: \"[" + camelCaseName + "]\"})\n" +
    "export class " + moduleNameTC + "Directive {\n" +
    "\n" +
    "  constructor() {\n" +
    "  }\n" +
    "}\n";

  FS.writeFileSync(directiveFilePath, directiveFileContents);
}

function createModuleFile(moduleDirPath, moduleNameTC) {
  var sharedDir = getRelativePathToSharedModule(moduleDirPath);
  var moduleFilePath = moduleDirPath + "/" + moduleNameTC + MODULE_FILE_SUFFIX;
  var moduleFileContents = "import {NgModule} from \"@angular/core\";\n" +
    "import {SharedModule} from \"" + sharedDir + "/Shared.module\";\n" +
    "import {RouterModule, Routes} from \"@angular/router\";\n" +
    "import {" + moduleNameTC + "Component} from \"./" + moduleNameTC + ".component\";\n" +
    "\n" +
    "const ROUTES: Routes = [\n" +
    "  {\n" +
    "    path: \"\",\n" +
    "    component: " + moduleNameTC + "Component,\n" +
    "  }\n" +
    "];\n" +
    "\n" +
    "@NgModule({\n" +
    "  imports: [\n" +
    "    SharedModule,\n" +
    "    RouterModule.forChild(ROUTES)\n" +
    "  ],\n" +
    "  declarations: [" + moduleNameTC + "Component]\n" +
    "})\n" +
    "export class " + moduleNameTC + "Module {\n" +
    "}\n";

  FS.writeFileSync(moduleFilePath, moduleFileContents);
}


exports.getRelativePathToSharedModule = getRelativePathToSharedModule;
exports.titleCaseToDashedLowercase = titleCaseToDashedLowercase;
exports.createTemplateFile = createTemplateFile;
exports.createComponentFile = createComponentFile;
exports.createDirectiveFile = createDirectiveFile;
exports.createModuleFile = createModuleFile;
