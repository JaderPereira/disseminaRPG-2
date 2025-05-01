const personagens = require('../controllers/global').personagens
let jogador


exports.index = (req, res) => {
    res.render('loginMestre', {jogador: req.params.jogador})
}

exports.controle = (req, res) => {
    res.render('mestre', {jogador: req.params.jogador})
}

exports.resetaDados = (req, res) => {
    personagens[String(req.params.jogador)].resetaDado(personagens[String(req.params.jogador)].d6, 6)
    personagens[String(req.params.jogador)].rolagensD6 = 0
    personagens[String(req.params.jogador)].resetaDado(personagens[String(req.params.jogador)].d10_1, 10)
    personagens[String(req.params.jogador)].rolagensD10_1 = 0
    personagens[String(req.params.jogador)].resetaDado(personagens[String(req.params.jogador)].d10_2, 10)
    personagens[String(req.params.jogador)].rolagensD10_2 = 0
    personagens[String(req.params.jogador)].rolagemAberta = true
    res.render('esperaRolagens', {jogador: req.params.jogador})
}

exports.rolagensEstado = (req, res) => {
    console.log(`Rolagens: ${personagens[String(req.params.jogador)].rolagensD6}`)
    res.json({ rolagens: personagens[String(req.params.jogador)].rolagensD6 })
}

exports.exibeRolgem = (req, res) => {
    console.log(personagens[String(req.params.jogador)])
    personagens[String(req.params.jogador)].rolagemAberta = false
    const acao = personagens[String(req.params.jogador)].moda(personagens[String(req.params.jogador)].d6, 6)
    const desafio1 = personagens[String(req.params.jogador)].moda(personagens[String(req.params.jogador)].d10_1, 10)
    const desafio2 = personagens[String(req.params.jogador)].moda(personagens[String(req.params.jogador)].d10_2, 10)
    const bonus = parseInt(req.body.bonus)
    let total = acao + bonus
    let resolucao = personagens[String(req.params.jogador)].resolucaoIronsworn(total, desafio1, desafio2)
    total = `${acao} + ${bonus} = ${total}`
    console.log(`Ação: ${acao}, Desafio 1: ${desafio1}, Desafio 2: ${desafio2}, Total: ${total}, Resolução: ${resolucao}`)
    res.render('resultado', {total, desafio1, desafio2, resolucao, d6, jogador: req.params.jogador})
}

exports.voltar = (req, res) => {
    res.redirect(`/mestre/${req.params.jogador}`)
}