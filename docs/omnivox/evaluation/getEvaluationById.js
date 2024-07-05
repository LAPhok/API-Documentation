module.exports = {
  get: {
    summary: "Récupérer les évaluations par ID utilisateur",
    tags: ["Évaluation"],
    parameters: [
      {
        in: "path",
        name: "userId",
        required: true,
        description: "ID de l'utilisateur pour filtrer les évaluations",
        schema: {
          type: "integer",
        },
      },
      {
        in: "header",
        name: "Authorization",
        required: true,
        description: "Bearer token d'authentification",
        schema: {
          type: "string",
        },
      },
    ],
    security: [{ BearerAuth: [] }],
    responses: {
      200: {
        description: "Récupération réussie des évaluations de l'utilisateur",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Evaluation",
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "Aucune évaluation trouvée pour cet utilisateur",
      },
    },
  },
};
