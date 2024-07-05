module.exports = {
    delete: {
      summary: "Supprimer une évaluation",
      tags: ["Évaluation"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID de l'évaluation à supprimer",
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
                token: {
                  type: "string",
                  description: "JWT token d'authentification",
                },
              },
              required: ["token"],
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Évaluation supprimée avec succès",
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
  