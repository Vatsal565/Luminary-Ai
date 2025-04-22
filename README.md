# Luminary AI

Luminary AI is an AI-as-a-service platform aimed at empowering small and mid-sized businesses with AI-driven solutions. The project includes a frontend built with Next.js and a backend powered by FastAPI.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

The frontend should now be running on `http://localhost:3000`.

### Backend (AI Services) Setup

1. Navigate to the backend directory (assuming it's named `ml`):
   ```sh
   cd ml
   ```
2. (Optional) Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. Install required dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Add your Groq API Key:
   - Go to [https://console.groq.com/keys](https://console.groq.com/keys)
   - Log in or sign up
   - Generate an API Key
5. Setup `/ml/.env` by creating a `.env` file and adding:
   ```
   PINECONE_API_KEY=
   OPENAI_API_KEY=

   HUGGINGFACEHUB_API_TOKEN=

   GROQ_API_KEY=

   REPLICATE_API_TOKEN=
   ```
6. Start the FastAPI server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

The backend should now be running on `https://luminary-ai-backend.onrender.com`.

## Features
- **Competitor Analysis & SWOT Insights**
- **AI-powered Branding (Name, Logo, Tagline Generation)**
- **Domain-specific Chatbots**
- **SEO Optimization for Digital Growth**
- **Pretrained Models & Custom AI Solutions**

## Contributing
Feel free to fork this repository and create pull requests to contribute!

## License
This project is licensed under the MIT License.

