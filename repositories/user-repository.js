const user = require('../shared/db-models/userModel');

module.exports = {
    /**
     * Retrieves user based on user id.
     * @param  {string} userId
     */
    getUserById: async (userId) => {
        return await user.findById(userId)
    },
    
    /**Retrieves user based on email.
     * @param  {string} email
     */
    getUserByEmail: async (email) => {
        return await user.findOne({ email: email });
    },
    /**Adds a user.
     * @param  {} userObj
     */
    addUser: async (userObj) => {
        return await user(userObj).save();
    }
}