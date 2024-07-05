module.exports = {
    post: {
        tags: ["Utilisateur"],
        description: 'Connectez-vous en tant qu\'utilisateur',
        operationId: 'loginUser',
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
                            password: {
                                type: 'string',
                                description: "Mot de passe de l'utilisateur",
                            },
                        },
                        required: ['username', 'password'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Connexion réussie',
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
