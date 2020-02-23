const SQL = require("sequelize");

export const createStore = (intialise?: boolean) => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "sessionname", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
    operatorsAliases,
    logging: false
  });

  const surveys = db.define("survey", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: {
      type: SQL.STRING,
      allowNull: false
    }
  });

  const questions = db.define("question", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    text: {
      type: SQL.STRING,
      allowNull: false
    },
    surveyId: {
      type: SQL.INTEGER,
      allowNull: false
    }
  });

  const sessions = db.define("session", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    surveyId: SQL.INTEGER
  });

  const answers = db.define("answer", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    questionId: {
      type: SQL.INTEGER,
      allowNull: false
    },
    sessionId: {
      type: SQL.INTEGER,
      allowNull: false
    },
    value: {
      type: SQL.STRING,
      allowNull: false
    }
  });

  if (intialise) {
    db.sync()
      .then(() =>
        surveys.create({
          name: "My Colour Survey"
        })
      )
      .then(survey => {
        console.log("survey", survey.toJSON());
        db.sync()
          .then(() =>
            questions.create({
              text: "What's your favourite colour?",
              surveyId: survey.id
            })
          )
          .then(question => {
            console.log("question", question.toJSON());
            db.sync()
              .then(() =>
                sessions.create({
                  surveyId: survey.id
                })
              )
              .then(session => {
                console.log("session", session.toJSON());
                db.sync()
                  .then(() =>
                    answers.create({
                      sessionId: session.id,
                      questionId: question.id,
                      value: "Green"
                    })
                  )
                  .then(val => {
                    console.log("answer", val.toJSON());
                  });
              });
          });
      });
  }

  return { surveys, questions, sessions, answers };
};
