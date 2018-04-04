//EXECUÇÃO:
//1- Em uma janela CMD mongod --dbpath "~"
//2- Em outra janela CMD mongo

{
    "nome": "Matheus Narito",
    "data_nascimento": new Date(1994, 03, 19),
    "curso": {
        "nome": "Engenharia Eletrônica"
    },
    "notas": [10.0, 9.0, 9.5],
    "habilidades": [{
        "nome": "ingles",
        "nível": "avançado"
                }, {
        "nome": "streetdance",
        "nivel": "intermediário"
                                }]
}

{
    "nome": "Mathias",
    "data_nascimento": new Date(1994, 03, 19),
    "curso": {
        "nome": "Engenhari Eletrônica"
    },
    "notas": [10.0, 4.5, 7]
}

{
    "nome": "Leticia Meissner",
    "data_nascimento": new Date(1996, 10, 20),
    "curso": {
        "nome": "Design de Produto"
    },
    "notas": [5.0, 6.0, 7.0],
    "habilidades": [{
        "nome": "ingles",
        "nível": "avançado"
                }]
}

{
    nome: "Caio Bogoni",
    data_nascimento: new Date(1994, 01, 21),
    curso: {
        nome: "Psicologia"
    },
    notas: [1.0, 2.0, 3.0],
    habilidades: [{
        nome: "ingles",
        nível: "Basico"
                }]
}

{
    nome: "Diogo Lucchesi",
    data_nascimento: new Date(1991, 05, 16),
    curso: {
        nome: "Engenharia de Produção"
    },
    notas: [1.0, 5.0, 10.0],
    habilidades: [{
        nome: "espanhol",
        nível: "avançado"
                }]
}

//X - NOME DA PASTA ONDE O BANCO ESTÁ INICIADO / Y- NOME DA COLEÇÃO

//Criar uma coleção
X.createCollection("Y")

//Inserir objeto na coleção
X.Y.insert({
    objeto: "no padrão JS"
})

//Remover objetos da coleção, baseado em um de seus atributos
X.Y.remove({
    "_id": ObjectId("~")
})

//Encontrar todos os objetos de uma coleção
X.Y.find().pretty() //última parte opcional para legibilidade

//Encontrar objetos de uma coleção, baseado em um de seus atributos
X.Y.find({
    nome: "Matheus Narito"
}).pretty() //última parte opcional para legibilidade

//Encontrar objetos de uma coleção, baseado em um de seus atributos, agora aninhados
X.Y.find({
    "habilidades.nome": "ingles"
}).pretty() //última parte opcional para legibilidade


//Encontrar objetos de uma coleção, baseado mais de um atributo
X.Y.find({
    nome: "Matheus Narito",
    "habilidades.nome": "ingles"
}).pretty() //última parte opcional para legibilidade

//Operador Lógico OR
X.Y.find({
    $or: [{
        "curso.nome": "Engenharia Eletrônica"
}, {
        "curso.nome": "Design de Produto"
}]
}).pretty() //última parte opcional para legibilidade


//Operador Lógico IN
X.Y.find({
    "curso.nome": {
        $in: ["Engenharia Eletrônica",
            "Design de Produto"]
    }
}).pretty() //última parte opcional para legibilidade

//Operador Lógico AND
X.Y.find({
    $or: [{
        "curso.nome": "Engenharia Eletrônica"
}, {
        "curso.nome": "Design de Produto"
}],
    nome: "Matheus Narito"
}).pretty() //última parte opcional para legibilidade

//Atualizar o primeiro objeto existente, dado um atributo (REESCREVE TODO O OBJETO)
X.Y.update({
    "curso.nome": "Engenhari Eletrônica"
}, {
    "nome": "Mathias",
    "data_nascimento": new Date(1994, 03, 19),
    "curso": {
        "nome": "Engenharia Eletrônica"
    },
    "notas": [10.0, 4.5, 7]
})

//Atualizar o primeiro objeto existente, dado um atributo (REESCREVE SOMENTE UM CAMPO)
X.Y.update({
    "curso.nome": "Engenhari Eletrônica"
}, {
    $set: {
        "curso.nome": "Engenharia Eletrônica"
    }
})

//Atualizar TODOS os objetos existentes, que tenha um dado atributo (REESCREVE SOMENTE UM CAMPO)
X.Y.update({
    "curso.nome": "Engenharia Eletrônica"
}, {
    $set: {
        "curso.nome": "engenharia eletrônica"
    }
}, {
    multi: true
})

//OBS. operadores de update podem ser encontrados no site.

//Inserir dado em um array
X.Y.update({
    "_id": ObjectId("59f545f9cea96683f74125ae")
}, {
    $push: {
        notas: 8
    }
})

//Inserir DADOS em um array
X.Y.update({
    "_id": ObjectId("59f545f9cea96683f74125ae")
}, {
    $push: {
        notas: {
            $each: [7, 6.5]
        }
    }
})

//Operador MAIOR QUE, traz todos que atendem

X.Y.find({
    notas: {
        $gt: 8
    }
})

//Operador MAIOR QUE, traz um que atende

X.Y.findOne({
    notas: {
        $gt: 8
    }
})

//Ordenando e exibindo de maneira crescente os nomes

X.Y.find().sort({
    "nome": 1
})

//Ordenando e exibindo de maneira decrescente os nomes

X.Y.find().sort({
    "nome": -1
})

//Ordenando de maneira crescente e exibindo apenas os três primeiros nomes

X.Y.find().sort({
    "nome": 1
}).limit(3)

X.Y.update({
    nome: "Matheus Narito"
}, {
    $set: {
        localizacao: {
            endereco: "Rua Madre Maria dos Anjos, 1060",
            cidade: "Curitiba",
            coordinates: [-25.449397, -49.277036],
            type: "Point"
        }
    }
})

//IMPORTAÇÃO
//1- Acessar diretório em outra janela CMD
//2- mongoimport -c alunos --jsonArray < alunos.json
// OU mongoimport -c Y --jsonArray < ~.json

//Definindo o atributo localização como uma esfera 2d (S/ altura)

X.Y.createIndex({
    localizacao: "2dsphere"
})

//Calculando os três primeiros usuários mais próximos de maneira crescente em distancia
//Ignoramos o local onde o usuário mora, caso ele esteja cadastrado.

db.alunos.aggregate([
    {
        $geoNear: {
            near: {
                coordinates: [-23.5640265, -46.6527128],
                type: "Point"
            },
            distanceField: "distrancia.calculada",
            spherical: true,
            num: 4
        }
    }, {
        $skip: 1
    }
])
