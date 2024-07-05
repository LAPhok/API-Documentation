const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Enregistrer une nouvelle évaluation
exports.saveEvaluation = async (req, res) => {
    try {
        const { userId, matiereId, note } = req.body;
        const dateEvaluation = new Date().toISOString();
        const sql = 'INSERT INTO Evaluation (userId, matiereId, note, dateEvaluation) VALUES (?, ?, ?, ?)';
        db.run(sql, [userId, matiereId, note, dateEvaluation], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de créer une nouvelle évaluation.' });
            }
            res.status(201).json({ message: 'Évaluation enregistrée avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'évaluation.' });
    }
};

// Récupérer toutes les évaluations
exports.getAllEvaluations = (req, res) => {
    const sql = 'SELECT * FROM Evaluation';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des évaluations.' });
        }
        res.status(200).json(rows);
    });
};

// Récupérer les évaluations par utilisateur
exports.getUserEvaluationByID = (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM Evaluation WHERE userId = ?';
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des évaluations de l\'utilisateur.' });
        }
        res.status(200).json(rows);
    });
};

// Mettre à jour une évaluation
exports.updateEvaluation = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const { userId, matiereId, note } = req.body;
        const sql = 'UPDATE Evaluation SET userId = ?, matiereId = ?, note = ? WHERE evaluationId = ?';
        db.run(sql, [userId, matiereId, note, evaluationId], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de mettre à jour l\'évaluation.' });
            }
            res.status(200).json({ message: 'Évaluation mise à jour avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'évaluation.' });
    }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
    try {
        const evaluationId = req.params.id;
        const sql = 'DELETE FROM Evaluation WHERE evaluationId = ?';
        db.run(sql, [evaluationId], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de supprimer l\'évaluation.' });
            }
            res.status(200).json({ message: 'Évaluation supprimée avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'évaluation.' });
    }
};
