class APIFeature {
    constructor(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
    }
    filter() {
        let queryObject = { ...this.queryObj };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObject[el]);
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(lt|gt|lte|gte)\b/g, match => `$${match}`);
        queryObject = JSON.parse(queryString);
        this.query = this.query.find(queryObject);
        return this;
    }

    sort() {
        if (this.queryObj.sort) {
            const sortBy = this.queryObj.sort.split(',').join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitField() {
        if (this.queryObj.fields) {
            const fieldsProp = this.queryObj.fields.split(',').join(' ');
            this.query = this.query.select(fieldsProp);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = Number(this.queryObj.page) || 1;
        const limit = Number(this.queryObj.limit) || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
};

module.exports = APIFeature;