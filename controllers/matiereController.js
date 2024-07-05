const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Ajouter une nouvelle matière
exports.addMatiere = async (req, res) => {
    try {
        const { nom, description } = req.body;
        const sql = 'INSERT INTO Matiere (nom, description) VALUES (?, ?)';
        db.run(sql, [nom, description], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible d\'ajouter une nouvelle matière.' });
            }
            res.status(201).json({ message: 'Matière ajoutée avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la matière.' });
    }
};

// Récupérer toutes les matières
exports.getAllMatieres = (req, res) => {
    const sql = 'SELECT * FROM Matiere';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération des matières.' });
        }
        res.status(200).json(rows);
    });
};

// Récupérer une matière par son ID
exports.getMatiereByID = (req, res) => {
    const matiereId = req.params.id;
    const sql = 'SELECT * FROM Matiere WHERE matiereId = ?';
    db.get(sql, [matiereId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la récupération de la matière.' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Matière non trouvée.' });
        }
        res.status(200).json(row);
    });
};

// Mettre à jour une matière
exports.updateMatiere = async (req, res) => {
    try {
        const matiereId = req.params.id;
        const { nom, description } = req.body;
        const sql = 'UPDATE Matiere SET nom = ?, description = ? WHERE matiereId = ?';
        db.run(sql, [nom, description, matiereId], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de mettre à jour la matière.' });
            }
            res.status(200).json({ message: 'Matière mise à jour avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la matière.' });
    }
};

// Supprimer une matière
exports.deleteMatiere = async (req, res) => {
    try {
        const matiereId = req.params.id;
        const sql = 'DELETE FROM Matiere WHERE matiereId = ?';
        db.run(sql, [matiereId], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de supprimer la matière.' });
            }
            res.status(200).json({ message: 'Matière supprimée avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la matière.' });
    }
};
