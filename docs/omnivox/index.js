// Import des modules des routes pour les utilisateurs
const register = require('./users/register');
const login = require('./users/login');

// Import des modules des routes pour les évaluations
const addEvaluation = require('./evaluation/addEvaluation');
const getEvaluation = require('./evaluation/getEvaluation');
const getEvaluationById = require('./evaluation/getEvaluationById');
const updateEvaluation = require('./evaluation/updateEvaluation');
const deleteEvaluation = require('./evaluation/deleteEvaluation');

// Import des modules des routes pour les matières
const addMatiere = require('./matieres/addMatiere');
const getAllMatieres = require('./matieres/getAllMatieres');
const getMatiereById = require('./matieres/getMatiereById');
const updateMatiere = require('./matieres/updateMatiere');
const deleteMatiere = require('./matieres/deleteMatiere');

// Exportation des chemins
module.exports = {
    paths: {
        // Routes pour les utilisateurs
        '/register': register,
        '/login': login,

        // Routes pour les évaluations
        '/addEvaluation': addEvaluation,
        '/getAllEvaluations': getEvaluation,
        '/getEvaluation/{userId}': getEvaluationById,
        '/updateEvaluation/{id}': updateEvaluation,
        '/deleteEvaluation/{id}': deleteEvaluation,

        // Routes pour les matières
        '/addMatiere': addMatiere,
        '/getAllMatieres': getAllMatieres,
        '/getMatiere/{id}': getMatiereById,
        '/updateMatiere/{id}': updateMatiere,
        '/deleteMatiere/{id}': deleteMatiere,
    }
};
