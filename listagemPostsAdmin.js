const storage = {
    get : () => JSON.parse(localStorage.getItem('petsPost')),
    set : ( value ) => localStorage.setItem( 'petsPost', JSON.stringify( value ))
}

function deleteElement( e, id ){
    const targ = e.target.parentElement
    const posts = storage.get()

    const newPostList = posts.filter( post => post.id !== id )

    targ.remove()
    storage.set( newPostList )

}

function createDom({ title, author, type, date, id }){
    const tr = document.createElement('tr')
    
    const childs = [ title, author, type, date, 'Delete' ]

    childs.forEach( elm => {
        const child = document.createElement('td')
        child.innerText = elm

        tr.appendChild( child )
    })

    const lastChild = tr.childNodes.length -1
    const last = tr.childNodes[ lastChild ]

    last.style.color = 'red'

    last.addEventListener('click', (e)=> {
        deleteElement( e , id )
    })
    
    return tr

}

function loaded(){

    const posts = storage.get()
    
    posts.forEach( post => {

        const newDom = createDom( post )

        document.getElementById('table').appendChild( newDom )

    })

    
}








document.addEventListener('DOMContentLoaded', loaded)