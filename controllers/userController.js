const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

const TOKEN_SECRET_KEY = 'WEB_4D2_00003';
const TOKEN_EXPIRY_TIME = 3600;

// Créer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
        db.run(sql, [username, email, hashedPassword], function (err) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de créer un nouvel utilisateur.' });
            }
            res.status(201).json({ message: 'Utilisateur créé avec succès.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
};

// Connecter un utilisateur
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const sql = 'SELECT * FROM Users WHERE username = ?';
        db.get(sql, [username], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur.' });
            }
            if (!row) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            const passwordMatch = await bcrypt.compare(password, row.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Mot de passe incorrect.' });
            }
            const token = jwt.sign({ userId: row.userId }, TOKEN_SECRET_KEY, { expiresIn: TOKEN_EXPIRY_TIME });
            res.status(200).json({ token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur.' });
    }
};
