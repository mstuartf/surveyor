const SQL = require("sequelize");

export const createStore = (intialise?: boolean) => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "anonUsername", "password", {
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
    },
    minValues: SQL.INTEGER,
    maxValues: SQL.INTEGER,
    valueType: SQL.STRING
  });

  const possibleValues = db.define("possibleValue", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    label: {
      type: SQL.STRING,
      allowNull: false
    },
    value: {
      type: SQL.STRING,
      allowNull: false
    },
    questionId: {
      type: SQL.INTEGER,
      allowNull: false
    }
  });

  const anonUsers = db.define("anonUser", {
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
    anonUserId: {
      type: SQL.INTEGER,
      allowNull: false
    },
    value: {
      type: SQL.STRING,
      allowNull: true
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
                possibleValues.create({
                  questionId: question.id,
                  label: "Bright Green",
                  value: "green"
                })
              )
              .then(possibleValue => {
                console.log("possibleValue", possibleValue.toJSON());
              });
          });
      });
  }

  return { surveys, questions, anonUsers, answers, possibleValues };
};
