const nameList =
{

};

globalThis.rename = (name) => {
    if (typeof name !== "string")
        return;

    if (nameList.hasOwnProperty(name)) {
        let order = String(++nameList[name]);
        let _name = name + "_" + order;

        return _name;
    }

    nameList[name] = 1;
    let _name = name + "_1";

    return _name;
}

Array.prototype.flatAll = function () {
    let array = this;

    while (array.some(item => Array.isArray(item)))
        array = [].concat(...array);

    return array;
}
