module.exports = {
    put: {
      summary: "Mettre à jour une évaluation existante",
      tags: ["Évaluation"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID de l'évaluation à mettre à jour",
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "integer",
                  description: "ID de l'utilisateur",
                },
                matiereId: {
                  type: "integer",
                  description: "ID de la matière",
                },
                note: {
                  type: "number",
                  description: "Note de l'évaluation (doit être comprise entre 0 et 100)",
                },
                token: {
                  type: "string",
                  description: "JWT token d'authentification",
                },
              },
              required: ["userId", "matiereId", "note", "token"],
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Évaluation mise à jour avec succès",
        },
        400: {
          description: "Les données sont invalides",
        },
        401: {
          description: "Unauthorized",
        },
        404: {
          description: "L'évaluation n'a pas été trouvée",
        },
      },
    },
  };
  