module.exports = {
  post: {
      tags: ["Utilisateur"],
      description: "Création d'un nouvel utilisateur",
      operationId: "registerUser",
      requestBody: {
          content: {
              'application/json': {
                  schema: {
                      type: 'object',
                      properties: {
                          username: {
                              type: 'string',
                              description: "Nom d'utilisateur",
                          },
                          email: {
                              type: 'string',
                              format: 'email',
                              description: "Adresse email de l'utilisateur",
                          },
                          password: {
                              type: 'string',
                              description: "Mot de passe de l'utilisateur",
                          },
                      },
                      required: ['username', 'email', 'password'],
                  },
              },
          },
      },
      responses: {
          201: {
              description: 'Utilisateur créé avec succès',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/User',
                      },
                  },
              },
          },
          400: {
              description: 'Données invalides',
              content: {
                  'application/json': {
                      schema: {
                          $ref: '#/components/schemas/Error',
                      },
                  },
              },
          },
      },
  },
};
