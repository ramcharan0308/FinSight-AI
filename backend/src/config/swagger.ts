export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FinSight AI API Documentation',
    version: '1.0.0',
    description: 'Production-grade RESTful API documentation for FinSight AI - AI-Powered Finance & Expense Intelligence Platform',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'Primary v1 Gateway',
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Provide your access token as authorization header Bearer <token>',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string', nullable: true },
          role: { type: 'string', enum: ['USER', 'ADMIN'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          categoryId: { type: 'string', format: 'uuid' },
          amount: { type: 'number' },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
          description: { type: 'string', nullable: true },
          date: { type: 'string', format: 'date-time' },
        },
      },
      Budget: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          categoryId: { type: 'string', format: 'uuid' },
          amount: { type: 'number' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user account',
        tags: ['Authentication'],
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        accessToken: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login user session credentials',
        tags: ['Authentication'],
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Credentials validated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        accessToken: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/transactions': {
      get: {
        summary: 'Retrieve user transaction records with filters',
        tags: ['Transactions'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'dateFrom', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'dateTo', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'type', in: 'query', schema: { type: 'string', enum: ['INCOME', 'EXPENSE'] } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 25 } },
        ],
        responses: {
          200: {
            description: 'Successful fetch',
          },
        },
      },
      post: {
        summary: 'Create a transaction ledger item',
        tags: ['Transactions'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['categoryId', 'amount', 'type', 'date'],
                properties: {
                  categoryId: { type: 'string', format: 'uuid' },
                  amount: { type: 'number' },
                  type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                  description: { type: 'string' },
                  date: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Transaction ledger created',
          },
        },
      },
    },
    '/budgets': {
      get: {
        summary: 'Retrieve user budget constraints',
        tags: ['Budgets'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Successful fetch',
          },
        },
      },
      post: {
        summary: 'Set a category budget limit',
        tags: ['Budgets'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['categoryId', 'amount', 'startDate', 'endDate'],
                properties: {
                  categoryId: { type: 'string', format: 'uuid' },
                  amount: { type: 'number' },
                  startDate: { type: 'string', format: 'date-time' },
                  endDate: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Budget limit configured successfully',
          },
        },
      },
    },
    '/analytics/monthly': {
      get: {
        summary: 'Retrieve month-by-month spending summaries',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Monthly summary data retrieved successfully',
          },
        },
      },
    },
    '/analytics/categories': {
      get: {
        summary: 'Retrieve category-wise spending summaries',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Category summary data retrieved successfully',
          },
        },
      },
    },
    '/analytics/trends': {
      get: {
        summary: 'Retrieve transaction trends',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Trends data retrieved successfully',
          },
        },
      },
    },
    '/ai/summary': {
      post: {
        summary: 'Generate monthly AI insights and summary reports',
        tags: ['Artificial Intelligence'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['month', 'year'],
                properties: {
                  month: { type: 'integer', minimum: 1, maximum: 12 },
                  year: { type: 'integer', minimum: 2000, maximum: 2100 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'AI report generated successfully',
          },
        },
      },
    },
    '/ai/chat': {
      post: {
        summary: 'Send message to conversational AI consultant',
        tags: ['Artificial Intelligence'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['message'],
                properties: {
                  message: { type: 'string', minLength: 1 },
                  conversationHistory: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        role: { type: 'string', enum: ['user', 'assistant'] },
                        content: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'AI advice computed successfully',
          },
        },
      },
    },
  },
};

export const getSwaggerUIHtml = (): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FinSight AI - API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" charset="UTF-8"></script>
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              spec: ${JSON.stringify(swaggerSpec)},
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
              plugins: [SwaggerUIBundle.plugins.DownloadUrl],
              layout: 'StandaloneLayout',
            });
          };
        </script>
      </body>
    </html>
  `;
};
