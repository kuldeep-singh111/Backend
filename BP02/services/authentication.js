const JWT = require('jsonwebtoken');

const secret = "$kuldeep@1234";


function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

function validationToken(token) {
    const payload = JWT.verify(token, secret)
}