from flask import Flask, render_template, request, jsonify
import funcoes_eventos as funcoes

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/eventos', methods=['POST'])
def adicionar():
    dados = request.json
    if not funcoes.validar_data(dados['data']):
        return jsonify({"erro": "Data inválida"}), 400
    
    novo = funcoes.criar_evento(
        len(funcoes.eventos) + 1, 
        dados['nome'], dados['data'], 
        dados['local'], dados['categoria'], False
    )
    return jsonify(novo), 201

@app.route('/api/eventos', methods=['GET'])
def listar():
    return jsonify(funcoes.eventos)

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/api/relatorio', methods=['GET'])
def obter_relatorio():
    from funcoes_eventos import eventos
    total = len(eventos)
    
    # Contagem por categoria
    contagem = {}
    for ev in eventos:
        cat = ev['categoria']
        contagem[cat] = contagem.get(cat, 0) + 1
        
    return jsonify({
        "total": total,
        "por_categoria": contagem
    })
