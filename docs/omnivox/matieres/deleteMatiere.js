module.exports = {
    delete: {
        tags: ['Matière'],
        description: `Supprimer une matière par son ID`,
        operationId: 'deleteMatiereById',
        parameters: [
            {
                name: 'matiereId',
                in: 'path',
                description: `ID de la matière à supprimer`,
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64',
                },
            },
        ],
        security: [{ "BearerAuth": [] }],
        responses: {
            200: {
                description: 'Matière supprimée avec succès',
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
