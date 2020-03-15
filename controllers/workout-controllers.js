var path = require("path");
// Import the models to use its database functions.
var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.post("/api/workouts", function (req, res) {
        db.Workout.create(req.body)
            .then(result => {
                res.json(result);
            })
    })

    app.get("/api/workouts", function (req, res) {
        db.Workout.find()
            .then(result => {
                res.json(result);
            })
    })

    app.put("/api/workouts/:id", function (req, res) {
        let workoutData = {
            "type": req.body.type,
            "name": req.body.name,
            "duration": req.body.duration,
            "weight": req.body.weight,
            "reps": req.body.reps,
            "sets": req.body.sets,
            "distance": req.body.distance
    };
        console.log(workoutData);
        db.Workout.findOneAndUpdate({ _id: req.params.id },
            { $push: { exercises: workoutData } }
        ).then(result => {
            res.json(result);
        })
    })

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find().limit(7)
            .then(result => {
                res.json(result);
            })
    })
}