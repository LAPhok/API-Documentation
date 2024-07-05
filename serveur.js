const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for serving static files (images)
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Database setup
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS Users (userId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT, password TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS Evaluation (evaluationId INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, matiereId INTEGER, note REAL, dateEvaluation DATE, FOREIGN KEY (userId) REFERENCES Users(userId), FOREIGN KEY (matiereId) REFERENCES Matiere(id))');
  db.run('CREATE TABLE IF NOT EXISTS Matiere (matiereId INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT)');
});

// Controllers
const { saveEvaluation, getAllEvaluations, getUserEvaluationByID, updateEvaluation, deleteEvaluation } = require('./controllers/evaluationController');
const { addMatiere, getAllMatieres, getMatiereByID, updateMatiere, deleteMatiere } = require('./controllers/matiereController');
const { processCSV, getSingleImage, uploadFile, uploadMultipleFiles, handleMulterError } = require('./controllers/multerController');
const { registerUser, loginUser } = require('./controllers/userController');

// Middlewares
const { userValidation, userValidationError } = require('./middleware/validation/userValidation');
const { evaluationValidation, evaluationValidationError } = require('./middleware/validation/evaluationValidation');
const { matiereValidation, matiereValidationError } = require('./middleware/validation/matiereValidation');
const authentication = require('./middleware/auth');

// OpenAPI
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

// Routes without authentication
app.post('/register', userValidation, userValidationError, registerUser);
app.post('/login', userValidation, userValidationError, loginUser);

// Routes with authentication
app.post('/addEvaluation', authentication, evaluationValidation, evaluationValidationError, saveEvaluation);
app.get('/getallevaluations', authentication, getAllEvaluations);
app.get('/getevaluation/:userId', authentication, getUserEvaluationByID);
app.put('/updateevaluation/:id', authentication, evaluationValidation, evaluationValidationError, updateEvaluation);
app.delete('/deleteevaluation/:id', authentication, deleteEvaluation);

app.post('/addMatiere', authentication, matiereValidation, matiereValidationError, addMatiere);
app.get('/getallmatieres', authentication, getAllMatieres);
app.get('/getmatiere/:id', authentication, getMatiereByID);
app.put('/updatematiere/:id', authentication, matiereValidation, matiereValidationError, updateMatiere);
app.delete('/deletematiere/:id', authentication, deleteMatiere);

// Routes multer
app.post('/uploadfile', uploadFile);
app.post('/uploadmultiplefiles', uploadMultipleFiles);
app.post("/processCSV", processCSV);

app.get('/getFile/:imageName', getSingleImage);

// Middleware for handling Multer errors
app.use(handleMulterError);

// Serveur en écoute sur le port 3000
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});
