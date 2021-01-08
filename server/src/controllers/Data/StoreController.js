class DataStoreController {
    constructor(redisService) {
        this.redisService = redisService;
    }

    async invoke(req, res) {}
}

module.exports = DataStoreController;
