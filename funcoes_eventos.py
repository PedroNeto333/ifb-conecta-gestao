from datetime import datetime, date

eventos = []

def criar_evento(id, nome, data, local, categoria, participado):
    novo_evento = {
        "id": id,
        "nome": nome,
        "data": data,
        "local": local,
        "categoria": categoria,
        "participado": participado,
    }
    eventos.append(novo_evento)
    return novo_evento

def buscar_nome_evento(nome, substring=False):
    nome_processado = nome.lower().strip() # Corrigido: parênteses adicionados
    if substring:
        return list(filter(lambda e: nome_processado in e["nome"].lower(), eventos))
    return list(filter(lambda e: e["nome"].lower() == nome_processado, eventos))

def deletar_evento(id_evento):
    for i, ev in enumerate(eventos):
        if ev.get("id") == id_evento:
            return eventos.pop(i)
    return None

def validar_data(data_str, formato="%d/%m/%Y"):
    if not isinstance(data_str, str):
        return False
    # Tenta validar com barras ou apenas números
    for f in [formato, "%d%m%Y"]:
        try:
            datetime.strptime(data_str, f)
            return True
        except ValueError:
            continue
    return False