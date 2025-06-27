export const getUser = async (userName) => {
    const response = await fetch('/data.json');
    const data = await response.json();
    const user = data.users.filter(user=> user.userName === userName);
    return user;
}

export const getRefferals = async (refCode) => {
    const response = await fetch('/data.json');
    const data = await response.json();
    const refferals = data.users.filter(user=> user.reffFor === refCode);
    return refferals;
}

export const getBidInfo = async (userId, bidId) => {

}

export const setBid = async (user, bidInfo) => {

}
