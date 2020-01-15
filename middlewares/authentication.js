const jwt = require('jsonwebtoken');
const key = 'mysuperduperkey';
var tokens = []

const login = async (req, res) => {
    try {
        let data = req.body;
        if (data.password != "123") {
            return res.status(401).send({
                error: "Login incorrect!"
            });
        }

        let token = jwt.sign(Math.random(), key);
        tokens.push(token);
        console.log("Adding token " + token);
        res.send({
            token: token
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const logout = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        for (let i = 0; i < tokens.length(); i++) {
            if (tokens[i] == token) {
                console.log("Removing token " + token);
                tokens.splice(i, 1);
                return req.status(200).send({
                    status: "Logout successful!"
                });
            }
        }
    } catch (error) {
        return req.status(400).send({
            error: "Token not found!"
        });
    }
};

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, key);

        for (let i = 0; i < tokens.length(); i++) {
            if (tokens[i] == token) {
                next()
            }
        }
    } catch (error) {
        res.status(401).send({
            error: "Unauthorized"
        });
    }
};


module.exports = {
    login: login,
    logout: logout,
    authenticate: authenticate
};