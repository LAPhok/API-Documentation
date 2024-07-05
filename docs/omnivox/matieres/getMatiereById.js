module.exports = {
    get: {
        tags: ['Matière'],
        description: 'Récupérer une matière par son ID',
        operationId: 'getMatiereById',
        security: [{ "BearerAuth": [] }],
        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'ID de la matière à récupérer',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64',
                },
            },
        ],
        responses: {
            200: {
                description: 'Matière récupérée avec succès',
                content: {
                    'application/json': {
                        schema: {
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
