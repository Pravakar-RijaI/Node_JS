const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        maxlength: [40, "A tour must have less than 40 characters"],
        minlength: [10, "A tour must have more than 10 characters"]
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: Number,
    difficulty: {
        type: String,
        required: [true, "A tour must have diffculty level"],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty is either: easy, medium, difficult"
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1"],
        max: [5, "Rating must be below 5"]
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true,

    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message: "Price Discount({VALUE}) must be less than Price"
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a summary"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

tourSchema.virtual("durationWeeks").get(function () {
    return this.duration / 7;
})

/* tourSchme.pre("save", function (next) {
    console.log(this);//model obj(can be used to insert a new property before saving to database like slugs)
    next();
})

tourSchema.post("save", function (doc, next) {
    console.log(doc);//doc after saving or creating
    next();
})

tourSchema.pre(/^find/, function (next) {
    console.log(this);//query before appyling secrest tour can be implemented and a query can be added beforehand that no superTours be visble
    next();
})

tourSchema.post(/^find/, function (docs, next) {
    console.log(docs);//returns result of query, can be used to calculate time taken to execute query
    next();
})

tourSchema.pre("aggregate", function (next) {
    console.log(this.pipeline())//points to aggregate object
    //this.pipeline.unshift({})//add a phase at top of pipeline
    next();
}) */

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;