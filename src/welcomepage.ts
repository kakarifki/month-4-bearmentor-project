export function WelcomePage() {
    return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Indonesian Culture REST API</title>
          <meta name="description" content="Web API about Indonesian Culture" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div class="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
              <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">Welcome to Indonesian Culture REST API</h1>
              <p class="text-lg text-gray-700 mb-6 text-center">
                This API provides access to a rich dataset of Indonesian cultural information, including provinces, ethnic groups, cultural artifacts, regional songs, and traditional cuisine.
              </p>
              <p class="text-lg text-gray-700 mb-6">
                The OpenAPI Specification for this API offers a detailed description of the available endpoints and data structures. It can be accessed at: <code class="bg-gray-200 rounded px-2 py-1">/doc</code>.
              </p>
              <p class="text-lg text-gray-700 mb-6">
                For an interactive experience, you can use Swagger UI to explore and test the API directly. Access it at: <code class="bg-gray-200 rounded px-2 py-1">/api</code>.
              </p>
              <p class="text-lg text-gray-700 mb-4">You can also directly access:</p>
              <ul class="list-disc list-inside text-lg text-gray-700 mb-6">
                <li><a href="/doc" target="_blank" class="text-blue-500 hover:underline">OpenAPI Specification (JSON)</a></li>
                <li><a href="/api" target="_blank" class="text-blue-500 hover:underline">Swagger UI</a></li>
              </ul>
              <p class="text-sm text-gray-500 text-center">
                This API is for educational purposes and is not intended for production use. Data accuracy is not guaranteed.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  