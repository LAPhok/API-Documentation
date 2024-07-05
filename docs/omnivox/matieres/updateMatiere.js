module.exports = {
    put: {
        tags: ['Matière'],
        description: 'Mettre à jour une matière par son ID',
        operationId: 'updateMatiereById',
        security: [{ "BearerAuth": [] }],
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'ID de la matière à mettre à jour',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64',
                },
            },
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            nom: {
                                type: 'string',
                                description: "Nouveau nom de la matière",
                            },
                            description: {
                                type: 'string',
                                description: "Nouvelle description de la matière",
                            },
                        },
                        required: ['nom', 'description'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Matière mise à jour avec succès',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                matiereId: {
                                    type: 'integer',
                                    description: "ID de la matière mise à jour",
                                },
                                nom: {
                                    type: 'string',
                                    description: "Nom mis à jour de la matière",
                                },
                                description: {
                                    type: 'string',
                                    description: "Description mise à jour de la matière",
                                },
                            },
                            required: ['matiereId', 'nom', 'description'],
                        },
                    },
                },
            },
            404: {
                description: 'Matière non trouvée',
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
