

export const getComponentName = (WrappedComponent) => {
    return (
        WrappedComponent.displayName
            || WrappedComponent.name
            || "WrappedComponent");

};


export const getDisplayName = (wrapper, WrappedComponent) => {
    return `${wrapper}(${getComponentName(WrappedComponent)})`;
};


export default {getDisplayName, getComponentName};
