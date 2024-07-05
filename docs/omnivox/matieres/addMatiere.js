module.exports = {
    post: {
        tags: ['Matière'],
        description: `Ajouter une nouvelle matière`,
        operationId: 'addMatiere',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            nom: {
                                type: 'string',
                                description: "Nom de la matière",
                            },
                            description: {
                                type: 'string',
                                description: "Description de la matière",
                            },
                            token: {
                                type: 'string',
                                description: "JWT token d'authentification",
                            },
                        },
                        required: ['nom', 'description', 'token'], // Include 'token' as required
                    },
                },
            },
        },
        security: [{ "BearerAuth": [] }],
        responses: {
            201: {
                description: 'Matière ajoutée avec succès',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    description: "Message de succès",
                                },
                            },
                            required: ['message'],
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
            401: {
                description: 'Non autorisé',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                    },
                },
            },
            500: {
                description: 'Erreur interne du serveur',
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
