const opening = require('../shared/db-models/openingModel');

module.exports = {
    /**
     * Adds an opening in DB.
     * @param  {} opening
     * @param  {string} createdBy
     */
    addOpening: async ({ projectName, clientName, technologies, role, description, isOpen }, createdBy) => {
        try {
            await opening({ projectName, clientName, technologies, role, description, isOpen, createdBy, applications: [] }).save();
            return true;
        } catch (err) {
            return false;
        }
    },

    /**
     * Retrieves opening based on opening id.
     * @param  {string} openingId
     */
    getOpeningById: async (openingId) => {
        try {
            return await opening.findById(openingId)
        } catch (error) {
            return false
        }
    },

    /**
     * saves the applcation to an opening.
     * @param  {string} openingId
     * @param  {string} userId
     */
    applyOpening: async (openingId, userId) => {
        try {
            await opening.updateOne({ _id: openingId }, { $push: { "applications": userId } })
            return true;
        }
        catch (err) {
            return false;
        }
    },

    /**
     * updates an opening based on id.
     * @param  {string} openingId
     * @param  {} openingObj
     */
    updateOpening: async (openingId, openingObj) => {
        try {
            await opening.updateOne({ _id: openingId }, { $set: openingObj })
            return true;
        }
        catch (err) {
            return false;
        }
    }
}