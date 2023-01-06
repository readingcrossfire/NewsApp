
//#region Define Object

interface IAssignObjectValue {
    Object: {
        [T: string]: any
    };
    Property: string;
    Value: string | [] | object
}

//#endregion


export const HasProperty = (object = {}, propertyName = "") => {
    if (typeof (object) == "object" && !Array.isArray(object)) {
        if (propertyName in object) {
            return true;
        }
        else {
            return false
        }
    }
    else {
        return false;
    }
}


export const AssignObjectValue = (obj: IAssignObjectValue) => {
    let objClone = obj;
    const isHave = HasProperty(objClone.Object, objClone.Property);
    if (isHave) {

        objClone.Object[objClone.Property] = objClone.Value;
        return objClone;
    }
    else{
        objClone = Object.assign({}, objClone, {[objClone.Property]: objClone.Value});
        return objClone;
    }
}