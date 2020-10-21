const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user-repository');

module.exports = {
    
    /**Adds a user.
     * @param  {} user
     */
    async registerUser(user) {
        const { email, name, password, role } = user;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return await userRepository.addUser({ email, name, password: hash, role });

    }
}