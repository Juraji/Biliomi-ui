const FS = require("fs");

const TEMPLATE_FILE_SUFFIX = ".template.pug";
const COMPONENT_FILE_SUFFIX = ".component.ts";
const DIRECTIVE_FILE_SUFFIX = ".directive.ts";
const MODULE_FILE_SUFFIX = ".module.ts";

const getRelativePathToSharedModule = (componentPath) => {
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
};

exports.titleCaseToDashedLowercase = (moduleNameTC) => {
    return moduleNameTC.replace(/([A-Z]+[a-z]+)/g, "$1-").slice(0, -1).toLowerCase();
};


exports.createTemplateFile = (moduleDirPath, moduleNameTC) => {
    const templateFilePath = moduleDirPath + "/" + moduleNameTC + TEMPLATE_FILE_SUFFIX;
    const templateContents = "| Template for " + moduleNameTC;

    FS.writeFileSync(templateFilePath, templateContents);
};

exports.createComponentFile = (moduleDirPath, moduleNameTC, dashedModuleName) => {
    const componentFilePath = moduleDirPath + "/" + moduleNameTC + COMPONENT_FILE_SUFFIX;
    const componentFileContents = "import {Component, OnInit} from \"@angular/core\";\n" +
        "\n" +
        "@Component({\n" +
        "  selector: \"" + dashedModuleName + "\",\n" +
        "  templateUrl: require(\"./" + moduleNameTC + TEMPLATE_FILE_SUFFIX + "\")\n" +
        "})\n" +
        "exports.class " + moduleNameTC + "Component implements OnInit {\n" +
        "\n" +
        "  constructor() {\n" +
        "  }\n" +
        "\n" +
        "  public ngOnInit() {\n" +
        "  }\n" +
        "}\n";

    FS.writeFileSync(componentFilePath, componentFileContents);
};

exports.createDirectiveFile = (moduleDirPath, moduleNameTC) => {
    const directiveFilePath = moduleDirPath + "/" + moduleNameTC + DIRECTIVE_FILE_SUFFIX;
    const camelCaseName = moduleNameTC.substr(0, 1).toLowerCase() + moduleNameTC.substr(1);
    const directiveFileContents = "import {Directive} from \"@angular/core\";\n" +
        "\n" +
        "@Directive({selector: \"[" + camelCaseName + "]\"})\n" +
        "exports.class " + moduleNameTC + "Directive {\n" +
        "\n" +
        "  constructor() {\n" +
        "  }\n" +
        "}\n";

    FS.writeFileSync(directiveFilePath, directiveFileContents);
};

exports.createModuleFile = (moduleDirPath, moduleNameTC) => {
    const sharedDir = getRelativePathToSharedModule(moduleDirPath);
    const moduleFilePath = moduleDirPath + "/" + moduleNameTC + MODULE_FILE_SUFFIX;
    const moduleFileContents = "import {NgModule} from \"@angular/core\";\n" +
        "import {SharedModule} from \"" + sharedDir + "/Shared.module\";\n" +
        "import {RouterModule, Routes} from \"@angular/router\";\n" +
        "import {" + moduleNameTC + "Component} from \"./" + moduleNameTC + ".component\";\n" +
        "\n" +
        "const ROUTES: Routes = [\n" +
        "  {\n" +
        "    path: \"\",\n" +
        "    component: " + moduleNameTC + "Component\n" +
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
        "exports.class " + moduleNameTC + "Module {\n" +
        "}\n";

    FS.writeFileSync(moduleFilePath, moduleFileContents);
};