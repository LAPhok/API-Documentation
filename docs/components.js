module.exports = {
  components: {
    schemas: {
      // id model
      id: {
        type: "integer", // data type
        description: "An ID", // description
        example: "1", // example of an ID
      },
      // User model
      User: {
        type: "object", // data type
        properties: {
          userId: {
            $ref: "#/components/schemas/id", // reference to id model
          },
          username: {
            type: "string", // data type
            description: "User's username", // description
            example: "Enloja", // example of a username
          },
          password: {
            type: "string", // data type
            description: "User's password", // description
            example: "*****", // example of a password
          },
          email: {
            type: "string", // data type
            description: "User's email", // description
            example: "example@example.com", // example of an email
          },
        },
      },
      // User input model
      UserInput: {
        type: "object", // data type
        properties: {
          username: {
            type: "string", // data type
            description: "User's username", // description
            example: "Enloja", // example of a username
          },
          password: {
            type: "string", // data type
            description: "User's password", // description
            example: "*****", // example of a password
          },
          email: {
            type: "string", // data type
            description: "User's email", // description
            example: "example@example.com", // example of an email
          },
        },
      },
      // Evaluation input model
      EvaluationInput: {
        type: "object", // data type
        properties: {
          userId: {
            $ref: "#/components/schemas/id", // reference to id model
            description: "ID of the user", // description
          },
          matiere_id: {
            $ref: "#/components/schemas/id", // reference to id model
            description: "ID of the matiere", // description
          },
          note: {
            type: "integer", // data type
            description: "The note", // description
            example: "100", // example of a note
          },
        },
      },
      // Matiere input model
      MatiereInput: {
        type: "object", // data type
        properties: {
          nom: {
            type: "string", // data type
            description: "Nom de la matière", // description
            example: "Francais", // example of a name
          },
          description: {
            type: "string", // data type
            description: "Description de la matière", // description
            example: "Une matière très importante", // example of a description
          },
        },
      },
      // Error model
      Error: {
        type: "object", // data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // description
            example: "User Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code", // description
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
  },
};
