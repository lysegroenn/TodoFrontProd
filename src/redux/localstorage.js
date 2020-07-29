export const loadUser = () => {
    try {
        const serializedUser = localStorage.getItem(`TODO_USER`)
        if (serializedUser === null) {
            return undefined
        }
        return JSON.parse(serializedUser);
    } catch (e) {
        return undefined
    }
}

export const setUser = (user) => {
    try {
        const serializedUser = JSON.stringify(user)
        localStorage.setItem(`TODO_USER`, serializedUser)
    } catch (e) {
        return {error: e}
    }
}