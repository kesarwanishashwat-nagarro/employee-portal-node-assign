const user = require('../shared/db-models/userModel');

module.exports = {
    /**
     * Retrieves user based on user id.
     * @param  {string} userId
     */
    getUserById: async (userId) => {
        try {
            return await user.findById(userId)
        } catch (error) {
            return false
        }
    },
    
    /**Retrieves user based on email.
     * @param  {string} email
     */
    getUserByEmail: async (email) => {
        try {
            return await user.findOne({ email: email });
        } catch (error) {
            return null;
        }
    },
    /**Adds a user.
     * @param  {} userObj
     */
    addUser: async (userObj) => {
        try {
            await user(userObj).save();
            return true;
        } catch (error) {
            return false;
        }
    }
}