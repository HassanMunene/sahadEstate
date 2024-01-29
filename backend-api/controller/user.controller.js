const testUser = (req, res) => {
    res.json({msg: 'Hello there mate we are testing'});
}

const signUpUser = (req, res) => {
    res.json({msg: 'Signing user up'});
}
export default testUser;