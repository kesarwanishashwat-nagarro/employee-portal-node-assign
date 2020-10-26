const openingRepository = require('../repositories/opening-repository');

module.exports = {
    /**
     * Gets all the openings.
     */
    getAllOpenings: async () => {
        return await openingRepository.getAllOpenings();
    },
    
    /**
     * Adding opening business logic.
     * @param  {} opening
     * @param  {string} createdBy User Identifier
     */
    addOpening: async (opening, createdBy) => {
        let { projectName, clientName, technologies, role, description, isOpen } = opening;
        technologies = technologies.split(',').map((tech) => tech.trim());
        return await openingRepository.addOpening({ projectName, clientName, technologies, role, description, isOpen }, createdBy);
    },

    
    /**
     * Apply to an opening based on opening Id.
     * @param  {string} openingId
     * @param  {string} userId
     */
    applyOpening: async (openingId, userId) => {
        const opening = await openingRepository.getOpeningById(openingId);
        if (opening && opening.isOpen) {
            if (opening.applications && opening.applications.length && opening.applications.indexOf(userId) >= 0) {
                return {
                    isSuccess: false,
                    msg: 'You have already applied to this opening.'
                };
            } else {
                const isApplied = await openingRepository.applyOpening(openingId, userId);
                if (isApplied) {
                    return {
                        isSuccess: true,
                        msg: 'You have successfully applied for ' + opening.projectName + '.'
                    };
                } else {
                    return {
                        isSuccess: false,
                        msg: 'Some error occured while applying, Please retry again.'
                    }
                }

            }
        }
        return {
            isSuccess: false,
            msg: 'Some error occured while applying, Please retry again.'
        }
    },
    /**
     * provides details of an opening by id for view update.
     * @param  {string} openingId
     */
    updateViewOpening: async (openingId) => {
        return await openingRepository.getOpeningById(openingId);
    },
    
    /**
     * Update an opening based on opening id.
     * @param  {string} openingId
     * @param  {string} opening
     */
    updateOpening: async (openingId, opening) => {
        opening.technologies = opening.technologies.split(',').map((tech) => tech.trim());
        opening.description = opening.description && opening.description.trim();
        return await openingRepository.updateOpening(openingId, opening);
    }
}