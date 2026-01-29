FROM python:3.12-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do frontend
COPY . .

# Porta onde o frontend será servido
EXPOSE 5500

# Servidor HTTP simples do Python
CMD ["python", "-m", "http.server", "5500"]