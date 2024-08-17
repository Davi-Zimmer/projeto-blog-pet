const storage = {
    // pega o storage e ja transforma em uma lista de objetos
    get : () => JSON.parse(localStorage.getItem('petsPost')),

    //pega a lista, transforma em string e ja salva no storage
    set : ( list ) => localStorage.setItem( 'petsPost', JSON.stringify( list ))
}

function deleteElement( e, id ){
    // pega o elemento pai(tr) do elemento clicado (td)
    const targ = e.target.parentElement

    const posts = storage.get() 

    // adiciona todos os elementos do storage fora o com mesmo id
    const newPostList = posts.filter( post => post.id !== id )

    targ.remove()

    // salva a lista de objetos no storage
    storage.set( newPostList )
}

function createDom({ title, author, type, date, id }){
    const tr = document.createElement('tr')
    
    // lista de itens filhos que vão sser botadas na tabela
    const childs = [ title, author, type, date, 'Delete' ]

    // faz um loop pela lista de filhos
    childs.forEach( elm => {
        // cria o td que vai ser elemento filho do tr
        const child = document.createElement('td')

        child.innerText = elm

        tr.appendChild( child )
    })

    // pega o ultimo elemento da lista
    const lastChild = tr.childNodes.length -1
    const last = tr.childNodes[ lastChild ]
    last.style.color = 'red'

    //adiciona um evento de click, passando o evento e o id do item atual no loop
    last.addEventListener('click', (e)=> {
        deleteElement( e , id )
    })
    
    return tr

    /*
     <tr>
        <td>Meu Gato</td>   Titulo
        <td>Daniel</td>     Autor  
        <td>Gato</td>       Tipo
        <td>10/9/2024</td>  Data
        <td>Delete</td> (com o evento de escuta no click)
     </tr>
    */
}

function loaded(){

    // pega o storage ja convertido em objeto
    const posts = storage.get() 

    // faz um loop pelos posts
    posts.forEach( post => {

        // cria o html
        const newDom = createDom( post )

        // adiciona o elemento criado na lista
        document.getElementById('table').appendChild( newDom )

    })

}

document.addEventListener('DOMContentLoaded', loaded)

/*
    chamadas das funções
    loaded > createDom > deleteElement
                         storage.get()
                         storage.set()
*/