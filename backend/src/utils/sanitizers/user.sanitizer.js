module.exports = (user) => {
    const plainUser = user.get ? user.get({ plain: true }) : { ...user };
    delete plainUser.password;
    return plainUser;
};