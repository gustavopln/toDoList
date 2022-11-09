//Objeto principal da aplicação
const Main = {

    //Propriedade init e o valor dela é uma função
    init: function() {
        this.cacheSelectors()
        this.bindEvents()
    },

    //Responsável somente por selecionar os elementos
    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
    },

    //Responsável por adicionar os eventos
    bindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button){
            //Aqui o this pega outro contexto, pega o window
            button.onclick = self.Events.checkButton_click
        })
    },

    //Propriedades do nosso objeto
    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            //Verificar primeiro a negação da variável
            if (!isDone){
                //senão houver o return vai continuar executando
                return li.classList.add('done')
            }
            
            li.classList.remove('done')
            
        }
    }
}

Main.init()