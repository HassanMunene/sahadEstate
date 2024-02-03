export const testUser = (req, res) => {
    res.json({msg: 'Hello there mate we are testing'});
}

export const updateUserInfo = (req, res, next) => {
    res.json({msg: 'Yooo we wanna update'});
}