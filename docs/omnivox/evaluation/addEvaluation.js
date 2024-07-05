module.exports = {
    post: {
        tags: ['Évaluation'],
        description: 'Ajouter une nouvelle évaluation',
        operationId: 'addEvaluation',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            userId: {
                                type: 'integer',
                                description: "ID de l'utilisateur",
                            },
                            matiereId: {
                                type: 'integer',
                                description: "ID de la matière",
                            },
                            note: {
                                type: 'number',
                                description: "Note de l'évaluation (doit être comprise entre 0 et 100)",
                            },
                            token: {
                                type: 'string',
                                description: "JWT token d'authentification",
                            },
                        },
                        required: ['userId', 'matiereId', 'note', 'token'],
                    },
                },
            },
        },
        security: [{ "BearerAuth": [] }],
        responses: {
            200: {
                description: 'Requête traitée avec succès',
            },
            201: {
                description: 'Évaluation ajoutée avec succès',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                evaluationId: {
                                    type: 'integer',
                                    description: "ID de l'évaluation",
                                },
                                userId: {
                                    type: 'integer',
                                    description: "ID de l'utilisateur",
                                },
                                matiereId: {
                                    type: 'integer',
                                    description: "ID de la matière",
                                },
                                note: {
                                    type: 'number',
                                    description: "Note de l'évaluation",
                                },
                            },
                            required: ['evaluationId', 'userId', 'matiereId', 'note'],
                        },
                    },
                },
            },
            400: {
                description: 'Les données sont invalides',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                    },
                },
            },
            401: {
                description: 'Unauthorized',
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
