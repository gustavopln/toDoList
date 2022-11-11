/*
* Objeto principal da aplicação
*/
const Main = {

    /*
    * Propriedade init e o valor dela é uma função
    */
    init: function() {
        this.cacheSelectors()
        this.bindEvents()
    },

    //Responsável somente por selecionar os elementos
    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    /*
    * Responsável por adicionar os eventos
    */
    bindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button){
            //Aqui o this pega outro contexto, pega o window, por isso deve pegar o this através da const self para pegar no contexto geral do main
            button.onclick = self.Events.checkButton_click
        })

        //bind = ligar, passar o this do objeto para o evento
        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
    },

    /*
    * Propriedades do nosso objeto
    */
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
        },

        //dentro de uma função de evento o this sempre vai ser o elemento e não o objeto
        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            if (key === 'Enter'){
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                //para adicionar novamente os eventos
                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click: function(e){
            //pegar o elemento pai do button que no caso é a li
            const li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }
}

Main.init()