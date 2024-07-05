module.exports = {
    get: {
        tags: ['Matière'],
        description: 'Récupérer toutes les matières',
        operationId: 'getAllMatieres',
        security: [{ "BearerAuth": [] }],
        responses: {
            200: {
                description: 'Matières récupérées avec succès',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    matiereId: {
                                        type: 'integer',
                                        description: "ID de la matière",
                                    },
                                    nom: {
                                        type: 'string',
                                        description: "Nom de la matière",
                                    },
                                    description: {
                                        type: 'string',
                                        description: "Description de la matière",
                                    },
                                },
                                required: ['matiereId', 'nom', 'description'],
                            },
                        },
                    },
                },
            },
            404: {
                description: 'Aucune matière trouvée',
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
