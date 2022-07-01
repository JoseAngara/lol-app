async function dynamicImport(path) {
    let promise = await import(path);
    let module;
    promise.then(mod => module = mod.default);
    return module;
}

export {dynamicImport};