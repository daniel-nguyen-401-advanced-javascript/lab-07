'use strict';

// in between our JS code and our Mongoose generated model
// simplifies our CRUD operations so that devs don't
// have to know about MongoDB specifics (.save, .find)

// connecting model to fruits and vegetables (prod, cat)

class Model {
    constructor(schema) {
        this.schema = schema;
    }

    async create(record) {
            let createResult = new this.schema(record);
            let result = await createResult.save();
            return result;
    }

    async read(_id) {
        // verify that id is a valid id
        // findOne with that id

        let record = await this.schema.findOne({ _id });
        return record;
    }

    async readByQuery(query) {
        let results = await this.schema.find(query);
        return results;
    }

    async update(_id, record) {
        await this.schema.findOneAndUpdate({_id}, record);
        let updateResult = await this.read(_id);
        return updateResult;
    }

    async delete(_id) {
        let delResult = await this.schema.deleteOne({_id});
        if (delResult.deletedCount === 0) throw 'err';
        return _id;
    }
}

module.exports = Model;