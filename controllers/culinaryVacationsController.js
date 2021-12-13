/* eslint-disable linebreak-style */

"use strict";
const culinary_vacations = require("../models/vacation"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user"),
  //   vacation_count = async () => {
  //     return culinary_vacations.find({})
  //       .then(culinary_vacations => {console.log(culinary_vacations)})
  //       .catch(error => {
  //         throw error;
  //       });
  //   },
  //   vacation_count=culinary_vacations.getAllData(),
  getCourseParams = body => {
    return {
      title: body.title,
      heroImage: body.heroImage,
      description: body.description,
      cuisine: body.cuisine,
      cost: body.cost,
      maxTravelers: body.maxTravelers,
      destination: body.destination,
      departureLocation: body.departureLocation,
      departureDate: body.departureDate,
      returnDate: body.returnDate,

    };
  };

module.exports = {
  index: (req, res, next) => {
    culinary_vacations.find()
      .then(culinary_vacations => {
        //req.flash("success", `Currently there are ${vacation_count} available`);  
        res.locals.culinary_vacations = culinary_vacations;
        //console.log(vacation_count);
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("culinary_vacations/index");
  },

  new: (req, res) => {
    res.render("culinary_vacations/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    console.log(courseParams);
    culinary_vacations.create(courseParams)
      .then(culinary_vacation => {
        res.locals.redirect = "/culinary_vacations";
        res.locals.culinary_vacation = culinary_vacation;
        next();
      })
      .catch(error => {
        console.log(`Error saving culinary vacation: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    culinary_vacations.findById(courseId)
      .then(culinary_vacations => {
        res.locals.culinary_vacations = culinary_vacations;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("culinary_vacations/show");
  },

  edit: (req, res, next) => {
    let culinaryVacationId = req.params.id;
    culinary_vacations.findById(culinaryVacationId)
      .then(culinary_vacation => {
        res.render("culinary_vacations/edit", {
          culinary_vacation: culinary_vacation
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let culinaryVacationId = req.params.id,
      culinary_vacationsParams = getCourseParams(req.body);

    culinary_vacations.findByIdAndUpdate(culinaryVacationId, {
      $set: culinary_vacationsParams
    })
      .then(culinary_vacations => {
        res.locals.redirect = `/culinary_vacations/${culinaryVacationId}`;
        res.locals.culinary_vacations = culinary_vacations;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let culinaryVacationId = req.params.id;
    culinary_vacations.findByIdAndRemove(culinaryVacationId)
      .then(() => {
        res.locals.redirect = "/culinary_vacations";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterUservacations: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedvacations = res.locals.vacations.map(vacations => {
        let userJoined = currentUser.vacations.some(userVacations => {
          return userVacations.equals(vacations._id);
        });
        return Object.assign(vacations.toObject(), { joined: userJoined });
      });
      res.locals.vacations = mappedvacations;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let vacationsId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          vacations: vacationsId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  }
};
